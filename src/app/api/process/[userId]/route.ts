import { verifyJwt } from "@/app/lib/jwt";
import prisma from "@/app/lib/prisma";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest, { params }: {
    params: {
        userId: string
    }
}) => {
    // const accessToken = req.headers.get('authorization');
    // if (!accessToken || !verifyJwt(accessToken)) {
    //     return new Response(JSON.stringify({
    //         error : 'No Authorization'
    //     }),{
    //         status : 401
    //     });
    // }

    const process = await prisma.process.findMany({
        where : {
            userId : params.userId,
        },
        select : {
            id : true,
            name : true
        }
    });
    return new Response(JSON.stringify(process));
}