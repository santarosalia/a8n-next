import { signJwtAccessToken, verifyJwt } from "@/app/lib/jwt";
import prisma from "@/app/lib/prisma";
import * as bcrypt from 'bcrypt';

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

    const processes = await prisma.process.findMany({
        where : {
            userId : id,
        },
        include : {
            user : {
                select : {
                    email: true,
                    name: true
                }
            }
        }
    });
    return new Response(JSON.stringify(processes));
}