import prisma from "@/app/lib/prisma"
import { NextRequest } from "next/server"

export const GET = async (req: NextRequest,  { params }: {
	params: { postId: string }}) => {
    const { postId } = params;
    
    const res = await prisma.post.findUnique({
        where : {
            id : postId
        }
    })
    if (res) {
        const res = await prisma.post.update({
            where : {
                id : postId
            },
            data : {
                readCount : {
                    increment : 1
                }
            }
        });
        return new Response(JSON.stringify(res));
    }
}

