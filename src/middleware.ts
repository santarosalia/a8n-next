import { NextRequest, NextResponse } from "next/server"

export const middleware = (req: NextRequest) => {
    const {pathname} = req.nextUrl;
    switch (pathname) {
        case '/board/write' : {
        }
    }
}

export const config = {
    matcher : ['/:path*']
}