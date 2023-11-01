import { NextRequest, NextResponse } from "next/server"
const url = process.env.NEXTAUTH_URL;
export const middleware = async (req: NextRequest) => {
    const accessToken = req.cookies.get('LunaticMonster');
    const refreshToken = req.cookies.get('SantaRosalia');
    // if (!session) return NextResponse.redirect(new URL('/', req.url));
    
    
    const {pathname} = req.nextUrl;
    switch (pathname) {
        case '/' : {
            
            // const verify = await verifyAuth(req);
            // console.log(verify)
            break;
        }
        case '/signin' : {
            if (accessToken) return NextResponse.redirect(new URL('/', req.url));
            return NextResponse.next();
        }
        
        // case '/account/overview' : 
        case '/board/write' : {
            break;
            // if (!session) return NextResponse.redirect(new URL('/', req.url));
        }
    }
}

export const config = {
    matcher : ['/:path*']
}