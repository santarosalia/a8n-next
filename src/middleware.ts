import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt";

const secret = process.env.SECRET_KEY;
export const middleware = async (req: NextRequest) => {
    const {pathname} = req.nextUrl;
    switch (pathname) {
        case '/board/write' : {
            const session = await getToken({req, secret, raw : true});
            if (!session) return NextResponse.redirect(new URL('/', req.url));
        }
    }
}

export const config = {
    matcher : ['/:path*']
}