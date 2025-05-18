// This file contains what comment should have in the frontend side.

export interface CommentInterface {
    id: string;
    username: string;
    locale: string;
    date: string;
    content: string;
    replyNum: number;
    articleId: string;
    parent: string; // root if no parent. ID of parent comment if reply
}