import { NextRequest, NextResponse } from "next/server"

export const middleware = (req: NextRequest) => {
    const {pathname} = req.nextUrl;
    const { cookies } = req;
    switch (pathname) {
        case '/board/write' : {
            const session = cookies.get('next-auth.session-token');
            if (!session) {
                return NextResponse.redirect(new URL('/', process.env.NEXTAUTH_URL));
            }
        }
    }
}

export const config = {
    matcher : ['/:path*']
}