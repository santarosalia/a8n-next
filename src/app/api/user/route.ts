import { verifyJwt } from "@/app/lib/jwt";
import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const refreshToken = req.cookies.get('SantaRosalia');
    const isVerified = verifyJwt(refreshToken?.value!);
    if (!isVerified) return new NextResponse(JSON.stringify({error : 'No Auth'}), {status : 401});

    const result = await prisma.refreshToken.findFirst({
        where : {
            token : refreshToken?.value
        },
        include : {
            user : true
        }
    });

    const {password, ...user} = result!.user;
    return new NextResponse(JSON.stringify(user));
}