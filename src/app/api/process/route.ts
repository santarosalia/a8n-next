import { signJwtAccessToken, verifyJwt } from "@/app/lib/jwt";
import prisma from "@/app/lib/prisma";

export const POST = async (req: Request) => {
    const accessToken = req.headers.get('authorization');
    if (!accessToken || !verifyJwt(accessToken)) {
        return new Response(JSON.stringify({
            error : 'No Authorization'
        }),{
            status : 401
        });
    }
    const body = await req.json();
    const id = body.id;
    const userId = body.userId;

    const process = await prisma.process.findUnique({
        where : {
            id : id,
            userId : userId,
        }
    });
    return new Response(JSON.stringify(process));
}
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
    console.log(body)
    const name = body.name;
    const data = body.data;
    const userId = body.userId;

    const process = await prisma.process.create({
        data : {
            name : name,
            data : data,
            userId : userId
        }
    });
    return new Response(JSON.stringify(process));
}