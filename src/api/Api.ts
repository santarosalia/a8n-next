import { Post } from "@/interface/Interface";
import { JwtPayload } from "jsonwebtoken";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const getAccessToken = async () => {
    try {
        const res = await fetch(`/api/auth/accesstoken`, {
            method : 'GET'
        });
        const result: RequestCookie = await res.json();
        return result;
    } catch {
        return null;
    }
}

export const signIn = async (inputs: {
    email: string,
    password: string
}) => {
    const res = await fetch(`/api/signin`, {
        method : 'POST',
        body : JSON.stringify(inputs)
    });
    const accessToken: string | null = await res.json();
    return accessToken;
}

export const getRefreshToken = async () => {
    try {
        const res = await fetch(`/api/auth/refreshtoken`, {
            method : 'GET'
        });
        const result: RequestCookie = await res.json();
        return result;
    } catch {
        return null;
    }
}

export const deleteAccessToken = async () => {
    await fetch('/api/auth/accesstoken', {
        method : 'DELETE'
    });
}

export const getPosts = async (category:string, page: number) => {
    const res = await fetch(`/api/board/${category}/?page=${page}`, {
        method : 'GET'
    });
    const result: { count: number, posts: Post[] } = await res.json();
    return result;
}