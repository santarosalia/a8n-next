import { verifyJwt } from "@/app/lib/jwt";
import { Post } from "@/interface/Interface";
import { JwtPayload } from "jsonwebtoken";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextRequest, NextResponse } from "next/server";

/**
 * @client
 */
export const getAccessToken = async () => {
    const res = await fetch(`/api/auth/accesstoken`, {
        method : 'GET'
    });
    if (!res.ok) throw res;
    const result: RequestCookie = await res.json();
    return result;
}

/**
 * @client
 */
export const deleteAccessToken = async () => {
    await fetch('/api/auth/accesstoken', {
        method : 'DELETE'
    });
}

/**
 * @client
 */
export const deleteRefreshToken = async () => {
    await fetch('/api/auth/refreshtoken', {
        method : 'DELETE'
    });
}

/**
 * @client
 * @param category 
 * @param page 
 * @returns 
 */
export const getPosts = async (category:string, page: number) => {
    const res = await fetch(`/api/board/${category}/?page=${page}`, {
        method : 'GET'
    });
    const result: { count: number, posts: Post[] } = await res.json();
    return result;
}

/**
 * @server
 * @param req 
 */
export const verifyAuth = async (req: NextRequest) => {
    const accessToken = req.cookies.get('LunaticMonster');
    const refreshToken = req.cookies.get('SantaRosalia');
    const verifiedAccessToken = verifyJwt(accessToken?.value!);
    if (verifiedAccessToken) {
        return true;
    } else {
        const verifiedRefreshToken = verifyJwt(refreshToken?.value!);
        if (verifiedRefreshToken) {
            
        } else {

        }
    }
}



// return new NextResponse(JSON.stringify({
//     error : 'No Authorization'
// }), {
//     status : 401
// });