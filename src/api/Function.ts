import { deleteAccessToken, getAccessToken, getRefreshToken, refreshAuth } from "@/api/Api";
import { decodeJwt, verifyJwt } from "@/app/lib/jwt";
import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const authorization = async () => {
    const accessToken = await getAccessToken();
    if (accessToken) {
        const user = JSON.parse(JSON.stringify(decodeJwt(accessToken?.value!)));
        return user;
    } else {
        const refreshToken = await getRefreshToken();
        if (refreshToken) {
           const accessToken = await refreshAuth();
           const user = JSON.parse(JSON.stringify(decodeJwt(accessToken?.value!)));
           return user;
        }
    }
    await deleteAccessToken();
    return null;
}

export const crxAuthorization = async (req: NextRequest) => {
    const refreshToken = req.cookies.get('SantaRosalia');
    const isVerified = verifyJwt(refreshToken?.value!);
    if (!isVerified) throw new NextResponse(JSON.stringify({error : 'No Auth'}), {status : 401});
    const result = await prisma.refreshToken.findFirst({
        where : {
            token : refreshToken?.value
        }
    });
    if (result === null) throw new NextResponse(JSON.stringify({error : 'No Auth'}), {status : 401});
    const decoded = decodeJwt(refreshToken?.value!);
    const { userId }: { userId: string } = JSON.parse(JSON.stringify(decoded));
    return userId;
}