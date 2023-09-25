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
    return new Response(JSON.stringify(res));
}

