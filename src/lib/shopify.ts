
const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  vendor: string;
  productType: string;
  featuredImage: {
    url: string;
    altText: string;
  };
  images: {
    edges: {
      node: {
        url: string;
        altText: string;
      }
    }[]
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  options: {
    id: string;
    name: string;
    values: string[];
  }[];
  variants: {
    edges: {
      node: {
        id: string;
        title: string;
        availableForSale: boolean;
        selectedOptions: {
          name: string;
          value: string;
        }[];
        price: {
          amount: string;
          currencyCode: string;
        };
        compareAtPrice?: {
          amount: string;
          currencyCode: string;
        };
      };
    }[];
  };
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalTaxAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  lines: {
    edges: {
      node: {
        id: string;
        quantity: number;
        cost: {
          totalAmount: {
            amount: string;
            currencyCode: string;
          };
        };
        merchandise: {
          id: string;
          title: string;
          image?: {
            url: string;
            altText: string;
          };
          price: {
            amount: string;
            currencyCode: string;
          };
          product: {
            title: string;
            handle: string;
            featuredImage: {
              url: string;
              altText: string;
            };
          };
        };
      };
    }[];
  };
  totalQuantity: number;
};

export type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  orders: {
    edges: {
      node: {
        id: string;
        orderNumber: number;
        processedAt: string;
        totalPrice: {
          amount: string;
          currencyCode: string;
        };
        financialStatus: string;
      }
    }[]
  };
};

// ... (previous helper functions: shopifyFetch, getProducts, getProduct, Cart functions)

export async function shopifyFetch<T>({
  query,
  variables,
  cache = 'force-cache',
}: {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
}): Promise<{ status: number; body: T } | never> {
  try {
    const result = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken!,
      },
      body: JSON.stringify({ query, variables }),
      cache,
      next: { tags: ['shopify'] }
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body,
    };
  } catch (e) {
    console.error("Shopify Fetch Error:", e);
    throw {
      error: e instanceof Error ? e.toString() : e,
      query,
    };
  }
}

export async function getProducts({
  sortKey = 'RELEVANCE',
  reverse = false,
  query: searchQuery = ''
}: {
  sortKey?: 'TITLE' | 'PRICE' | 'CREATED_AT' | 'RELEVANCE' | 'BEST_SELLING';
  reverse?: boolean;
  query?: string;
} = {}): Promise<Product[]> {
  const query = `
    query Products($sortKey: ProductSortKeys, $reverse: Boolean, $query: String) {
      products(first: 20, sortKey: $sortKey, reverse: $reverse, query: $query) {
        edges {
          node {
            id
            handle
            title
            description
            title
            description
            vendor
            productType
            featuredImage {
              url
              altText
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            options {
              id
              name
              values
            }
            variants(first: 20) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  selectedOptions {
                    name
                    value
                  }
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch<{
    data: {
      products: {
        edges: {
          node: Product;
        }[];
      };
    };
  }>({
    query,
    variables: {
      sortKey,
      reverse,
      query: searchQuery
    }
  });

  return response.body.data.products.edges.map((edge) => edge.node);
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  const query = `
      query Product($handle: String!) {
        product(handle: $handle) {
          id
          handle
          title
          description
          descriptionHtml
          featuredImage {
            url
            altText
          }
          images(first: 5) {
            edges {
                node {
                    url
                    altText
                }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                availableForSale
                price {
                    amount
                    currencyCode
                }
                compareAtPrice {
                    amount
                    currencyCode
                }
              }
            }
          }
        }
      }
    `;

  const response = await shopifyFetch<{
    data: {
      product: Product;
    };
  }>({
    query,
    variables: { handle }
  });

  return response.body.data.product;
}

export async function createCart(): Promise<Cart> {
  const query = `
      mutation cartCreate {
        cartCreate {
          cart {
            id
            checkoutUrl
          }
        }
      }
    `;

  const response = await shopifyFetch<{
    data: {
      cartCreate: {
        cart: Cart;
      };
    };
  }>({ query, cache: 'no-store' });

  return response.body.data.cartCreate.cart;
}

export async function addToCart(cartId: string, lines: { merchandiseId: string; quantity: number }[]): Promise<Cart> {
  const query = `
      mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            id
            checkoutUrl
            cost {
              subtotalAmount {
                amount
                currencyCode
              }
              totalAmount {
                amount
                currencyCode
              }
              totalTaxAmount {
                amount
                currencyCode
              }
            }
            lines(first: 100) {
              edges {
                node {
                  id
                  quantity
                  cost {
                    totalAmount {
                      amount
                      currencyCode
                    }
                  }
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      image {
                        url
                        altText
                      }
                      price {
                        amount
                        currencyCode
                      }
                      product {
                        title
                        handle
                        featuredImage {
                          url
                          altText
                        }
                      }
                    }
                  }
                }
              }
            }
            totalQuantity
          }
        }
      }
    `;

  const response = await shopifyFetch<{
    data: {
      cartLinesAdd: {
        cart: Cart;
      };
    };
  }>({
    query,
    variables: {
      cartId,
      lines,
    },
    cache: 'no-store'
  });

  return response.body.data.cartLinesAdd.cart;
}

export async function getCart(cartId: string): Promise<Cart | undefined> {
  const query = `
      query getCart($cartId: ID!) {
        cart(id: $cartId) {
          id
          checkoutUrl
          cost {
            subtotalAmount {
              amount
              currencyCode
            }
            totalAmount {
              amount
              currencyCode
            }
            totalTaxAmount {
              amount
              currencyCode
            }
          }
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                cost {
                  totalAmount {
                    amount
                    currencyCode
                  }
                }
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    image {
                      url
                      altText
                    }
                    price {
                      amount
                      currencyCode
                    }
                    product {
                      title
                      handle
                      featuredImage {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
          totalQuantity
        }
      }
    `;

  const response = await shopifyFetch<{
    data: {
      cart: Cart;
    };
  }>({
    query,
    variables: { cartId },
    cache: 'no-store'
  });

  return response.body.data.cart;
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  const query = `
      mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart {
            id
            checkoutUrl
            cost {
                subtotalAmount {
                  amount
                  currencyCode
                }
                totalAmount {
                  amount
                  currencyCode
                }
                totalTaxAmount {
                    amount
                    currencyCode
                }
            }
            lines(first: 100) {
              edges {
                node {
                  id
                  quantity
                  cost {
                    totalAmount {
                      amount
                      currencyCode
                    }
                  }
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      image {
                        url
                        altText
                      }
                      price {
                        amount
                        currencyCode
                      }
                      product {
                        title
                        handle
                        featuredImage {
                          url
                          altText
                        }
                      }
                    }
                  }
                }
              }
            }
            totalQuantity
          }
        }
      }
    `;

  const response = await shopifyFetch<{
    data: {
      cartLinesRemove: {
        cart: Cart;
      };
    };
  }>({
    query,
    variables: {
      cartId,
      lineIds,
    },
    cache: 'no-store'
  });

  return response.body.data.cartLinesRemove.cart;
}

export async function createCustomerAccessToken(email: string, password: string): Promise<string | null> {
  const query = `
      mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
        customerAccessTokenCreate(input: $input) {
          customerAccessToken {
            accessToken
            expiresAt
          }
          customerUserErrors {
            code
            field
            message
          }
        }
      }
    `;

  const response = await shopifyFetch<{
    data: {
      customerAccessTokenCreate: {
        customerAccessToken: {
          accessToken: string;
          expiresAt: string;
        } | null;
        customerUserErrors: {
          code: string;
          field: string;
          message: string;
        }[];
      };
    };
  }>({
    query,
    variables: {
      input: {
        email,
        password,
      },
    },
    cache: 'no-store'
  });

  if (response.body.data.customerAccessTokenCreate.customerUserErrors.length > 0) {
    console.error("Login Error:", response.body.data.customerAccessTokenCreate.customerUserErrors);
    return null; // Simplified error handling
  }

  return response.body.data.customerAccessTokenCreate.customerAccessToken?.accessToken || null;
}

export async function getCustomer(accessToken: string): Promise<Customer | undefined> {
  const query = `
      query customer {
        customer(customerAccessToken: "${accessToken}") {
          id
          firstName
          lastName
          email
          orders(first: 10) {
            edges {
              node {
                id
                orderNumber
                processedAt
                totalPrice {
                  amount
                  currencyCode
                }
                financialStatus
              }
            }
          }
        }
      }
    `;

  const response = await shopifyFetch<{
    data: {
      customer: Customer;
    };
  }>({
    query,
    cache: 'no-store'
  });

  return response.body.data.customer;
}

export async function createCustomer(email: string, password: string, firstName: string, lastName: string): Promise<{ success: boolean; errors?: any[] }> {
  const query = `
      mutation customerCreate($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
          customer {
            id
            email
          }
          customerUserErrors {
            code
            field
            message
          }
        }
      }
    `;

  const response = await shopifyFetch<{
    data: {
      customerCreate: {
        customer: {
          id: string;
          email: string;
        } | null;
        customerUserErrors: {
          code: string;
          field: string;
          message: string;
        }[];
      };
    };
  }>({
    query,
    variables: {
      input: {
        email,
        password,
        firstName,
        lastName
      },
    },
    cache: 'no-store'
  });

  if (response.body.data.customerCreate.customerUserErrors.length > 0) {
    return { success: false, errors: response.body.data.customerCreate.customerUserErrors };
  }

  return { success: true };
}

export async function updateCustomer(accessToken: string, customer: { firstName?: string; lastName?: string; email?: string; password?: string }): Promise<{ success: boolean; errors?: any[] }> {
  const query = `
      mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
        customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
          customer {
            id
            firstName
            lastName
            email
          }
          customerUserErrors {
            code
            field
            message
          }
        }
      }
    `;

  const response = await shopifyFetch<{
    data: {
      customerUpdate: {
        customer: {
          id: string;
          firstName: string;
          lastName: string;
          email: string;
        } | null;
        customerUserErrors: {
          code: string;
          field: string;
          message: string;
        }[];
      };
    };
  }>({
    query,
    variables: {
      customerAccessToken: accessToken,
      customer
    },
    cache: 'no-store'
  });

  if (response.body.data.customerUpdate.customerUserErrors.length > 0) {
    return { success: false, errors: response.body.data.customerUpdate.customerUserErrors };
  }

  return { success: true };
}

export async function updateCartLines(cartId: string, lines: { id: string; merchandiseId: string; quantity: number }[]): Promise<Cart> {
  const query = `
      mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart {
            id
            checkoutUrl
            cost {
              subtotalAmount {
                amount
                currencyCode
              }
              totalAmount {
                amount
                currencyCode
              }
              totalTaxAmount {
                amount
                currencyCode
              }
            }
            lines(first: 100) {
              edges {
                node {
                  id
                  quantity
                  cost {
                    totalAmount {
                      amount
                      currencyCode
                    }
                  }
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      image {
                        url
                        altText
                      }
                      price {
                        amount
                        currencyCode
                      }
                      product {
                        title
                        handle
                        featuredImage {
                          url
                          altText
                        }
                      }
                    }
                  }
                }
              }
            }
            totalQuantity
          }
        }
      }
    `;

  const response = await shopifyFetch<{
    data: {
      cartLinesUpdate: {
        cart: Cart;
      };
    };
  }>({
    query,
    variables: {
      cartId,
      lines,
    },
    cache: 'no-store'
  });

  return response.body.data.cartLinesUpdate.cart;
}
