import { crxAuthorization } from "@/api/Function";
import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: {
    params: {
        processId: string
    }
}) => {
    const userId = await crxAuthorization(req);
    const processId = params.processId;
    const process = await prisma.process.findUnique({
        where : {
            id : processId
        }
    });
    if (userId !== process?.userId) return new NextResponse(JSON.stringify({error : 'No Auth'}), {status : 401});
    return new NextResponse();
}