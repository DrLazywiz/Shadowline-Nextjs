
'use server';

import { createCart, addToCart, removeFromCart, getCart, createCustomerAccessToken, getCustomer, createCustomer, updateCustomer, updateCartLines } from '@/lib/shopify';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function createCartAction() {
    return await createCart();
}

export async function addToCartAction(cartId: string, lines: { merchandiseId: string; quantity: number }[]) {
    return await addToCart(cartId, lines);
}


export async function updateCartAction(cartId: string, lines: { id: string; merchandiseId: string; quantity: number }[]) {
    return await updateCartLines(cartId, lines);
}

export async function removeFromCartAction(cartId: string, lineIds: string[]) {
    return await removeFromCart(cartId, lineIds);
}

export async function getCartAction(cartId: string) {
    return await getCart(cartId);
}

export async function loginAction(prevState: any, formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
        return { message: 'Please enter both email and password.' };
    }

    const accessToken = await createCustomerAccessToken(email, password);

    if (accessToken) {
        const cookieStore = await cookies();
        cookieStore.set('customerAccessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: '/',
        });
        redirect('/');
    } else {
        return { message: 'Access Denied. Invalid credentials.' };
    }
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete('customerAccessToken');
    redirect('/login');
}

export async function getCustomerAction() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('customerAccessToken')?.value;

    if (!accessToken) return null;

    return await getCustomer(accessToken);
}

export async function registerAction(prevState: any, formData: FormData) {
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password || !firstName || !lastName) {
        return { message: 'All fields are required.' };
    }

    const result = await createCustomer(email, password, firstName, lastName);

    if (result.success) {
        return { message: 'Access Granted. Proceed to Identification.', success: true };
    } else {
        return { message: result.errors?.[0]?.message || 'Registration Failed.' };
    }
}

export async function updateCustomerAction(prevState: any, formData: FormData) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('customerAccessToken')?.value;

    if (!accessToken) {
        return { message: 'Unauthorized', success: false };
    }

    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const updateData: any = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (email) updateData.email = email;
    if (password) updateData.password = password;

    if (Object.keys(updateData).length === 0) {
        return { message: 'No changes detected.', success: false };
    }

    const result = await updateCustomer(accessToken, updateData);

    if (result.success) {
        return { message: 'Profile Updated Successfully.', success: true };
    } else {
        return { message: result.errors?.[0]?.message || 'Update Failed.', success: false };
    }
}
