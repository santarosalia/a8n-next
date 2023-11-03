import { getRefreshToken } from "@/api/Api";
import { verifyJwt } from "@/app/lib/jwt";
import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: {
    params: {
        userId: string
    }
}) => {
    const refreshToken = req.cookies.get('SantaRosalia');
    const isVerified = verifyJwt(refreshToken?.value!);
    if (!isVerified) return new NextResponse(JSON.stringify({error : 'Token Expired'}), {status : 401});
    const process = await prisma.process.findMany({
        where : {
            userId : params.userId,
        },
        select : {
            id : true,
            name : true
        }
    });
    return new NextResponse(JSON.stringify(process));
}