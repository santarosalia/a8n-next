import { NextRequest, NextResponse } from "next/server"
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
            return NextResponse.next();
        }
        
        // case '/account/overview' : 
        case '/board/write' : {
            const d = await fetch(`${url}/api/auth/refreshtoken`, {
                method : 'POST'
            });
            // console.log(await d.json())
            const verify = await verifyJwtByJose(accessToken?.value!);
            if (verify) {
                return NextResponse.next();
            } else {
                const verify = await verifyJwtByJose(refreshToken?.value!);
                if (verify) {
                    await fetch('/api/auth/refreshtoken', {
                        method : 'POST'
                    });
                } else {

                }
            }
            break;
            // if (!session) return NextResponse.redirect(new URL('/', req.url));
        }
    }
}

export const config = {
    matcher : ['/:path*']
}