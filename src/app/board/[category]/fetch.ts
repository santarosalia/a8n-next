import { Post } from "@/interface/Interface";

export const getPosts = async (category:string, page: number) => {
    const res = await fetch(`/api/board/${category}/?page=${page}`, {
        method : 'GET'
    });
    const result: { count: number, posts: Post[] } = await res.json();
    return result;
}