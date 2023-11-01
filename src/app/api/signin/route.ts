import { signJwt } from "@/app/lib/jwt";
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
        const {id} = userWithoutPass;

        const accessToken = signJwt(userWithoutPass, {expiresIn : '1h'});
        const refreshToken = signJwt({userId : id}, {expiresIn : '30d'});
        const existsRefreshToken = await prisma.refreshToken.findUnique({
            where : {
                userId : id
            }
        });

        if (existsRefreshToken) {
            await prisma.refreshToken.update({
                where : {
                    userId : id
                },
                data : {
                    token : refreshToken,
                }
            });
        } else {
            await prisma.refreshToken.create({
                data : {
                    userId : id,
                    token : refreshToken,
                }
            });
        }

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
    } else return new NextResponse(JSON.stringify(null));
}