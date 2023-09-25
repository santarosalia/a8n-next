import prisma from "@/app/lib/prisma";
import { CATEGORY } from "@/constants/Constants";
import { Category } from "@/interface/Interface";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest, {params} : {params: {category: string}} ) => {
    const page = req.nextUrl.searchParams.get('page');
    const categoryName = params.category;
    const cat = Object.entries(CATEGORY).find(entry => {
        const [key, value] = entry;
        return value === categoryName;
    });
    const [category] = cat as [string, string];
    let posts;
    let count: number;
    switch (Number(category)) {
        case Category.ALL : {
            count = await prisma.post.count();
            posts = await prisma.post.findMany({
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
            break;
        }
        default : {
            count = await prisma.post.count({
                where : {
                    category : Number(category)
                }
            });
            posts = await prisma.post.findMany({
                where : {
                    category : Number(category)
                },
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
        }
    }
    
    
    const res = {
        count : Math.ceil(count/10),
        posts : posts
    }
    return new Response(JSON.stringify(res))
}