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