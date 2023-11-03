import { crxAuthorization } from "@/api/Function";
import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: {
    params: {
        userId: string
    }
}) => {
    const userId = await crxAuthorization(req);
    if (userId !== params.userId) return new NextResponse(JSON.stringify({error : 'No Auth'}), {status : 401});
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