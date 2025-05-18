/*
 * Contains helper functions to add editorial articles
 */


import {addArticleLength, addLine, addTextElement, addImage, addCommentButton} from "./Utils";
import type {NYTArticle} from "./NYTArticle";

export {addEditorial, addFeaturedEditorial}

function addFeaturedEditorial(editorials: HTMLDivElement, article: NYTArticle, toggleCommend: ((ev: MouseEvent, articleId: string) => void)) : void {
    const container = document.createElement("a");
    container.href = article.web_url;
    editorials.appendChild(container);

    if (article.multimedia?.default?.url) {
        addImage(
            container,
            article.multimedia.default.url,
            article.multimedia.caption,
            article.multimedia.credit
        );
    }

    const headline = addTextElement(container, "h2", article.headline.main);
    headline.id = 'featured';

    addTextElement(container, "p", article.abstract);
    addCommentButton(container,  (event: MouseEvent) => toggleCommend(event, article._id));
}

function addEditorial(editorials: HTMLDivElement, article: NYTArticle, toggleCommend: ((ev: MouseEvent, articleId: string) => void)) : void {
    addLine(editorials, "hline-light-vspace");

    const container = document.createElement("a");
    container.href = article.web_url;
    editorials.appendChild(container);

    if (article.multimedia?.default?.url) {
        addImage(
            container,
            article.multimedia.default.url,
            article.multimedia.caption,
            article.multimedia.credit
        );
    }

    addTextElement(container, "p", article.byline.original);
    addTextElement(container, "h2", article.headline.main);

    if (article.word_count) {
        addArticleLength(container, article.word_count);
    }
    addCommentButton(container,  (event: MouseEvent) => toggleCommend(event, article._id));
}