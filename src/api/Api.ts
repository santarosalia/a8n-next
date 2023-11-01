import { Post } from "@/interface/Interface";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

/**
 * @client
 */
export const getAccessToken = async () => {
    const res = await fetch(`/api/auth/accesstoken`, {
        method : 'GET'
    });
    if (!res.ok) return null;
    const result: RequestCookie = await res.json();
    
    return result;
}

export const getRefreshToken = async () => {
    const res = await fetch(`/api/auth/refreshtoken`, {
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