import { verifyJwt } from "@/app/lib/jwt";
import prisma from "@/app/lib/prisma";

export const PUT = async (req: Request) => {
    const accessToken = req.headers.get('authorization');
    if (!accessToken || !verifyJwt(accessToken)) {
        return new Response(JSON.stringify({
            error : 'No Authorization'
        }),{
            status : 401
        });
    }
    const body = await req.json();
    const userId = 'clmjfhd1f0000r38j78hxbnsd';
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
    
    return new Response(JSON.stringify({
        status : 200
    }));
}