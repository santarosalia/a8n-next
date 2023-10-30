import { cookies } from 'next/headers';
import { decodeJwt } from '@/app/lib/jwt';
import { NextResponse } from 'next/server';

export const GET = async () => {
    const cookie = cookies();
    const accessToken = cookie.get('LunaticMonster');
    const decodedAccessToken = JSON.stringify(decodeJwt(accessToken?.value!));
    return new NextResponse(decodedAccessToken);
}
