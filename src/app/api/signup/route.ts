import prisma from "@/app/lib/prisma";
import * as bcrypt from 'bcrypt';

export const POST = async (req: Request) => {
    const body = await req.json();
    const findUser = await prisma.user.findUnique({
        where : {
            email : body.email
        }
    });
    if (findUser) {
        return new Response(JSON.stringify({
            error : 'Conflict'
        }),{
            status : 409
        });
    } else {
        const user = await prisma.user.create({
            data : {
                email : body.email,
                name : body.name,
                password : await bcrypt.hash(body.password, 10)
            },
        });
        const {password, ...result } = user;
        return new Response(JSON.stringify(result));
    }
    
    
}
