import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const GET = async () => {
    const cookie = cookies();
    const accessToken = cookie.get('LunaticMonster');
    if (accessToken === undefined) return new NextResponse(JSON.stringify({}), {status : 404});
    return new NextResponse(JSON.stringify(accessToken));
}

export const DELETE = async () => {
    const cookie = cookies();
    cookie.delete('LunaticMonster');
    return new NextResponse();
}