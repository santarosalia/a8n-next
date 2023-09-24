import prisma from "@/app/lib/prisma"
import { NextRequest } from "next/server"

export const GET = async (req: NextRequest,  { params }: {
	params: { page: string }}) => {
    const { page } = params;
    const count = await prisma.post.count();

    const posts = await prisma.post.findMany({
        orderBy : {
            createdAt : "desc"
        },
        skip : (Number(page)-1) * 10,
        take : 10,
        include :{
            user : {
                select : {
                    name : true
                }
            }
        }
    });
    
    const res = {
        count : Math.ceil(count/10),
        posts : posts
    }
    return new Response(JSON.stringify(res))
}

