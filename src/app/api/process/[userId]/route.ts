import { crxAuthorization } from "@/api/Function";
import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: {
    params: {
        userId: string
    }
}) => {
    await crxAuthorization(req);
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