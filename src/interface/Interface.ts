import { ReactNode } from "react";

export interface Post {
    index: number,
    id: string
    title: string,
    content: string,
    user: {
        id: string,
        name: string
    },
    createdAt: string,
    updatedAt: string,
    category: string,
    hashtag: string,
    readCount: number,
    commentCount: number,
    recommend: number
}

export enum Category {
    ALL,
    NOTICE,
    SHARE,
}

export interface Plan {
    title: string,
    subtitle: string,
    access: string[],
    buttonText: string,
    price?: string,
    href: string,
    img: string,
    children?: ReactNode
}