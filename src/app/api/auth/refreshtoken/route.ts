import { signJwt, verifyJwt } from '@/app/lib/jwt';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export const GET = async () => {
    const cookie = cookies();
    const refreshToken = cookie.get('SantaRosalia');
    if (refreshToken === undefined) return new NextResponse(JSON.stringify({}), {status : 404});
    const result = await prisma.refreshToken.findFirst({
        where : {
            token : refreshToken.value
        },
        include : {
            user : true
        }
    });
    const isVerified = verifyJwt(refreshToken.value);
    const isEqual = refreshToken.value === result?.token;
    if (!isVerified) return new NextResponse(JSON.stringify({error : 'Token Expired'}), {status : 401});
    else if (!isEqual) return new NextResponse(JSON.stringify({error : 'No Auth'}), {status : 401});
    else if (isVerified && isEqual) return new NextResponse(JSON.stringify(refreshToken));
}

export const PUT = async () => {
    const cookie = cookies();
    const refreshToken = cookie.get('SantaRosalia');
    if (refreshToken === undefined) return new NextResponse(JSON.stringify({}), {status : 404});
    const result = await prisma.refreshToken.findFirst({
        where : {
            token : refreshToken.value
        },
        include : {
            user : true
        }
    });
    const user = result?.user!;
    const {password, ...userWithoutPass } = user;
    const {id} = userWithoutPass;

    const newAccessToken = signJwt(userWithoutPass, {expiresIn : '1h'});
    const newRefreshToken = signJwt({userId : id}, {expiresIn : '30d'});
    
    await prisma.refreshToken.update({
        where : {
            userId : id
        },
        data : {
            token : newRefreshToken,
        }
    });

    const res = new NextResponse(JSON.stringify({
        name : 'LunaticMonster',
        value : newAccessToken
    }));
    
    res.cookies.set('SantaRosalia', newRefreshToken, {
        maxAge : 30 * 24 * 60 * 60,
        httpOnly : true,
        sameSite : 'lax'
    });
    res.cookies.set('LunaticMonster', newAccessToken, {
        maxAge : 60 * 60,
        httpOnly : true,
        sameSite : 'lax'
    });
    return res;
}