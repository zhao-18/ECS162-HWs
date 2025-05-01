export interface NYTArticle {
    web_url: string;
    multimedia: {
        default: {
            url: string;
        }
        caption: string;
        credit: string;
    }
    abstract: string;
    headline: {
        main: string;
    }
    word_count: number;
    byline: {
        original: string;
    }
}