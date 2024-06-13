import { UserType } from "../user/UserType";

export type PostType = {
    id: number;
    title: string;
    author?: UserType;
    content?: string
}

export type CreatePostType = {
    title?: string;
    authorId?: number;
    content?: string
}