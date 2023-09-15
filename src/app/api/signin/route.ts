import { signJwtAccessToken } from "@/app/lib/jwt";
import prisma from "@/app/lib/prisma";
import * as bcrypt from 'bcrypt';

export const POST = async (req: Request) => {
    const body = await req.json();
    const user = await prisma.user.findFirst({
        where : {
            email : body.email,
        }
    });

    if (user && await bcrypt.compare(body.password, user.password ?? '')) {
        const {password, ...userWithoutPass } = user;

        const accessToken = signJwtAccessToken(userWithoutPass);
        const result = {
            ...userWithoutPass,
            accessToken
        }
        return new Response(JSON.stringify(result));
    } else return new Response(JSON.stringify(null));
}