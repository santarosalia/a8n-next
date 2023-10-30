import { NextRequest, NextResponse } from "next/server"

const secret = process.env.SECRET_KEY;
export const middleware = async (req: NextRequest) => {
    const accessToken = req.cookies.get('LunaticMonster');
    const refreshToken = req.cookies.get('SantaRosalia');
    
    // if (!session) return NextResponse.redirect(new URL('/', req.url));
    // const {pathname} = req.nextUrl;
    // switch (pathname) {
    //     case '/account/overview' : 
    //     case '/board/write' : {
    //         const session = await getToken({req, secret, raw : true});
    //         if (!session) return NextResponse.redirect(new URL('/', req.url));
    //     }
    // }
}

export const config = {
    matcher : ['/account/:path*','/board/write']
}