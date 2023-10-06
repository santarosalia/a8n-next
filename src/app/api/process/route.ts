import { signJwtAccessToken, verifyJwt } from "@/app/lib/jwt";
import prisma from "@/app/lib/prisma";

export const GET = async (req: Request) => {
    const accessToken = req.headers.get('authorization');
    if (!accessToken || !verifyJwt(accessToken)) {
        return new Response(JSON.stringify({
            error : 'No Authorization'
        }),{
            status : 401
        });
    }
    const body = await req.json();
    const userId = body.userId;

    const process = await prisma.process.findMany({
        where : {
            userId : userId,
        }
    });
    return new Response(JSON.stringify(process));
}
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