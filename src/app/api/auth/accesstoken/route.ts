import { verifyJwt } from '@/app/lib/jwt';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const GET = async () => {
    const cookie = cookies();
    const accessToken = cookie.get('LunaticMonster');
    if (accessToken === undefined) return new NextResponse(JSON.stringify({}), {status : 404});
    const isVerified = verifyJwt(accessToken.value);
    if (!isVerified) return new NextResponse(JSON.stringify({error : 'Token Expired'}), {status : 401});
    return new NextResponse(JSON.stringify(accessToken));
}

export const DELETE = async () => {
    const cookie = cookies();
    cookie.delete('LunaticMonster');
    return new NextResponse();
}