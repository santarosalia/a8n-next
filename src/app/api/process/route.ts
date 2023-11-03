import prisma from "@/app/lib/prisma";
import { getMaxProcessCount } from "./func";
import { NextRequest, NextResponse } from "next/server";
import { crxAuthorization } from "@/api/Function";

export const POST = async (req: NextRequest) => {
    const userId = await crxAuthorization(req);
    const body = await req.json();
    const id = body.id;

    const process = await prisma.process.findUnique({
        where : {
            id : id,
            userId : userId,
        }
    });
    return new NextResponse(JSON.stringify(process));
}
export const PUT = async (req: NextRequest) => {
    const userId = await crxAuthorization(req);
    const body: {
        name: string,
        data: string,
        userId: string
    } = await req.json();
    const name = body.name;
    const data = body.data;

    const user = await prisma.user.findUnique({
        where : {
            id : userId
        }
    });
    const findProcess = await prisma.process.findFirst({
        where : {
            name : name,
            userId : userId
        }
    });
    if (findProcess) {
        await prisma.process.update({
            where : {
                id : findProcess.id
            },
            data : {
                name : name,
                data : data,
            }
        })
    } else {

        const maxProcessCount = getMaxProcessCount(user?.level!);
        const currentProcessCount = await prisma.process.count({
            where : {
                userId : userId
            }
        });
        const isFull = maxProcessCount <= currentProcessCount;
        if (isFull) {
            return new NextResponse(JSON.stringify({
                error : 'process limit'
            }),{
                status : 400
            });
        } else {
            await prisma.process.create({
                data : {
                    name : name,
                    data : data,
                    userId : userId
                }
            });
        }
    }
    
    return new NextResponse(JSON.stringify(true));
}
export const DELETE = async (req: NextRequest) => {
    const userId = await crxAuthorization(req);
    const body: {
        selected: string[],
        userId: string
    } = await req.json();
    const {selected} = body;
    
    selected.forEach(async processId => {
        await prisma.process.delete({
            where : {
                id : processId,
                userId : userId
            }
        });
    });
    return new NextResponse();
}