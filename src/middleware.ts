import { NextRequest, NextResponse } from "next/server"
export const middleware = async (req: NextRequest) => {
    const accessToken = req.cookies.get('LunaticMonster');
    const refreshToken = req.cookies.get('SantaRosalia');
    // if (!session) return NextResponse.redirect(new URL('/', req.url));
    
    
    const {pathname} = req.nextUrl;
    if (pathname.startsWith('/account')) {
        if (!accessToken || !refreshToken) return NextResponse.redirect(new URL('/', req.url));
    }
}

export const config = {
    matcher : ['/:path*']
}