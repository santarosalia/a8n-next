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

    const res = new Response();
    res.headers.set('Set-Cookie', 'refreshToken=a');
    console.log(res)
    
    if (user && await bcrypt.compare(body.password, user.password!)) {
        const {password, ...userWithoutPass } = user;

        const accessToken = getAccessToken(userWithoutPass);

        const refreshToken = getRefreshToken(userWithoutPass);
        const result = {
            ...userWithoutPass,
            accessToken
        }
        // response.cookies.set('refreshToken', refreshToken, {
        //     httpOnly : true,
        //     maxAge : 30 * 24 * 60 * 60 * 1000
        // })
        // return response ;
        return new Response(JSON.stringify(result));
    } else return new Response(JSON.stringify(null));
}