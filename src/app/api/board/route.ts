import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    // const verify = await verifyAuth(req);
    // console.log(verify)
    const body = await req.json();
    const userId = body.userId;
    const title = body.title;
    const content = body.content;
    const category = body.category;
    const hashtag = '';
    await prisma.post.create({
        data : {
            userId : userId,
            content : content,
            category : category,
            hashtag : hashtag,
            title : title,
        }
    });
    
    return new NextResponse();
}