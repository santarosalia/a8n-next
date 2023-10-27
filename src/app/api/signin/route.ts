import { getAccessToken, getRefreshToken } from "@/app/lib/jwt";
import prisma from "@/app/lib/prisma";
import * as bcrypt from 'bcrypt';
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    const body = await req.json();
    const user = await prisma.user.findFirst({
        where : {
            email : body.email,
        }
    });

    
    if (user && await bcrypt.compare(body.password, user.password!)) {
        const {password, ...userWithoutPass } = user;
        const accessToken = getAccessToken(userWithoutPass);
        const refreshToken = getRefreshToken(userWithoutPass);

        const result = {
            ...userWithoutPass,
            accessToken,
            refreshToken
        }
        
        const res = new NextResponse(JSON.stringify(result));
        
        res.cookies.set('refreshToken', refreshToken, {
            maxAge : 30 * 24 * 60 * 60 * 1000
        });
        // res.headers.set('Set-Cookie', 'refreshToken=a');
        // response.cookies.set('refreshToken', refreshToken, {
        //     httpOnly : true,
        //     maxAge : 30 * 24 * 60 * 60 * 1000
        // })
        // return response ;
        return res;
    } else return new Response(JSON.stringify(null));
}