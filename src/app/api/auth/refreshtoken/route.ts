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
    const isEqual = refreshToken.value === result?.token
    
    if (!isVerified) return new NextResponse(JSON.stringify({error : 'Token Expired'}), {status : 401});
    else if (isVerified && isEqual) {
        const user = result.user;
        const {password, ...userWithoutPass } = user;
        const {id} = userWithoutPass;

        const accessToken = signJwt(userWithoutPass, {expiresIn : '1h'});
        const refreshToken = signJwt({userId : id}, {expiresIn : '30d'});
       
        await prisma.refreshToken.update({
            where : {
                userId : id
            },
            data : {
                token : refreshToken,
            }
        });

        const res = new NextResponse(JSON.stringify(accessToken));
        
        res.cookies.set('SantaRosalia', refreshToken, {
            maxAge : 30 * 24 * 60 * 60 * 1000,
            httpOnly : true,
            sameSite : 'lax'
        });
        res.cookies.set('LunaticMonster', accessToken, {
            maxAge : 60 * 60 * 1000,
            httpOnly : true,
            sameSite : 'lax'
        });
        return res;
    }
    return new NextResponse(JSON.stringify(refreshToken));
}

export const POST = async (req: NextRequest) => {
    const refreshToken = req.cookies.get('SantaRosalia');
    console.log(refreshToken);
    
}

export const DELETE = async () => {
    const cookie = cookies();
    cookie.delete('SantaRosalia');
    return new NextResponse();
}