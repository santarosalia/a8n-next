import { decodeJwt, verifyJwt } from '@/app/lib/jwt';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

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
    const refreshToken = cookie.get('SantaRosalia');
    cookie.delete('SantaRosalia');
    const decoded : {
        userId: string,
        iat: number,
        exp: number
    } | null = JSON.parse(JSON.stringify(decodeJwt(refreshToken?.value!)));

    if (decoded === null) return new NextResponse();
    const { userId } = decoded;
    
    const count = await prisma.refreshToken.count({
        where : {
            userId : userId
        }
    });

    if (count > 0) {
        await prisma.refreshToken.delete({
            where : {
                userId : userId
            }
        });
    }
    return new NextResponse();
}