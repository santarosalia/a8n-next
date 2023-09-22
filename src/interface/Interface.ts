export interface Board {
    index: number,
    id: string
    title: string,
    profile: {
        id: string,
        name: string
    },
    createdAt: Date,
    updatedAt: Date,
    category: string,
    hashtag: string[],
    readCount: number,
    commentCount: number,
    recommend: number
}

export enum Category {
    ALL,
    ANNOUNCEMNET,
    PROCESS,
}