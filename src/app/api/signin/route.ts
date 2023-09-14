import prisma from "@/app/lib/prisma";
import * as bcrypt from 'bcrypt';

export const POST = async (req: Request) => {
    
    const body = await req.json();
    console.log(body.email);
    console.log(body.password);
    const user = await prisma.user.create({
        data : {
            email : body.email,
            password : await bcrypt.hash(body.password, 10)
        },
    });
    const {password, ...result } = user;
    return new Response(JSON.stringify(result));
}