import { NextRequest, NextResponse } from "next/server"
import { getAccessToken, verifyAuth } from "./api/Api";
import { verifyJwtByJose } from "./app/lib/jwt";

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
        }
        
        // case '/account/overview' : 
        case '/board/write' : {
            const verify = await verifyJwtByJose(accessToken?.value!);
            if (verify === null) {
                
            }
            // if (!session) return NextResponse.redirect(new URL('/', req.url));
        }
    }
}

export const config = {
    matcher : ['/:path*']
}