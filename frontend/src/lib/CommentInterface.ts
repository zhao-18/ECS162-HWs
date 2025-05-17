export interface comment {
    id: string;
    username: string;
    locale: string;
    date: string;
    content: string;
    recommend: number;
    replyNum: number;
    articleId: string;
    parent: string; // root if no parent. ID of parent comment if reply
}