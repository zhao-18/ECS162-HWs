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