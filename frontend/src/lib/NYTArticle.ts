// This file contains what an article needs to be displayed in the frontend

export interface NYTArticle {
    _id: string;
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
    type_of_material: string;
}