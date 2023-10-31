import { verifyJwt } from '@/app/lib/jwt';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const GET = async () => {
    const cookie = cookies();
    const refreshToken = cookie.get('SantaRosalia');
    return new NextResponse(JSON.stringify(refreshToken));
}

export const DELETE = async () => {
    const cookie = cookies();
    cookie.delete('SantaRosalia');
    return new NextResponse();
}