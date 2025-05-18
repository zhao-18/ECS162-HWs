/*
 * Contains helper functions to add news articles
 */

import {addArticleLength, addLine, addTextElement, addImage, addCommentButton} from "./Utils";
import type {NYTArticle} from "./NYTArticle";

export {addFeaturedNews, addHeadLineCenterLine, addHeadLineNoLine, addHeadLineWithLine}

function addFeaturedNews(headlines: HTMLDivElement, article: NYTArticle, toggleCommend: ((ev: MouseEvent, articleId: string) => void), subarticle: NYTArticle | null = null) : void {
    // Create parent container and specify the type of diplay
    const container = document.createElement("div");
    container.classList.add("news-head-no-line");
    headlines.appendChild(container);

    // ---------- LEFT SECTION BEGIN ----------
    const left = document.createElement("a");
    left.classList.add("left");
    left.href = article.web_url;
    container.appendChild(left);

    // Add headline, abstract, and how long the article is
    addTextElement(left, "h2", article.headline.main);
    addTextElement(left, "p", article.abstract);
    addArticleLength(left, article.word_count);

    // If sub-article exist then add them below
    if (subarticle !== null) {
        addLine(left, "hline-light-vspace");
        addTextElement(left, "h2", subarticle.headline.main);
        addTextElement(left, "p", subarticle.abstract);
        addArticleLength(left, subarticle.word_count);
    }

    addCommentButton(left, (event: MouseEvent) => toggleCommend(event, article._id));
    // ---------- LEFT SECTION END ----------


    // ---------- RIGHT SECTION BEGIN ----------
    const right = document.createElement("a");
    right.classList.add("right");
    right.href = article.web_url;
    container.appendChild(right);

    // Just image
    const img_container = document.createElement("div");
    right.appendChild(img_container);
    addImage(
        img_container,
        article.multimedia.default.url,
        article.multimedia.caption,
        article.multimedia.credit
    );
    // ---------- RIGHT SECTION END ----------
}

function addHeadLineNoLine(headlines: HTMLDivElement, article: NYTArticle, toggleCommend: ((ev: MouseEvent, articleId: string) => void)) : void {
    // Divider from previous article
    addLine(headlines, "hline-vspace");

    // Parent container to specify the display type
    const container = document.createElement("a");
    container.classList.add("news-head-no-line");
    container.href = article.web_url;
    headlines.appendChild(container);

    // ---------- LEFT SECTION BEGIN ----------
    const left = document.createElement("div");
    left.classList.add("left");
    container.appendChild(left);

    addTextElement(left, "h3", article.headline.main);
    addTextElement(left, "p", article.abstract);
    addArticleLength(left, article.word_count);
    addCommentButton(left,  (event: MouseEvent) => toggleCommend(event, article._id));
    // ---------- LEFT SECTION END ----------


    // ---------- RIGHT SECTION BEGIN ----------
    const right = document.createElement("div");
    right.classList.add("right");
    container.appendChild(right);

    const img_container = document.createElement("div");
    right.appendChild(img_container);
    addImage(
        img_container,
        article.multimedia.default.url,
        article.multimedia.caption,
        article.multimedia.credit
    );
    // ---------- RIGHT SECTION END ----------
}

function addHeadLineWithLine(headlines: HTMLDivElement, article_left: NYTArticle, article_right: NYTArticle, toggleCommend: ((ev: MouseEvent, articleId: string) => void), subarticles_left: NYTArticle[] = []) : void {
    // Divider from the previous article
    addLine(headlines, "hline-vspace");

    // Parent container and specify the display type
    const container = document.createElement("div");
    container.classList.add("news-head-line");
    headlines.appendChild(container);

    // ---------- LEFT SECTION BEGIN ----------
    const left = document.createElement("a");
    left.classList.add("left");
    left.href = article_left.web_url;
    container.appendChild(left);

    addTextElement(left, "h3", article_left.headline.main);
    addTextElement(left, "p", article_left.abstract);
    addArticleLength(left, article_left.word_count);
    addCommentButton(left,  (event: MouseEvent) => toggleCommend(event, article_left._id));

    // If there are any sub-articles, add to the left side
    if (Array.isArray(subarticles_left)) {
        for (let i = 0; i < subarticles_left.length; i++) {
            addLine(left, "hline-light-vspace");
            addTextElement(left, "h3", subarticles_left[i].headline.main);
            addArticleLength(left, subarticles_left[i].word_count);
        }
    }
    // ---------- LEFT SECTION END ----------

    // Divider between left and right
    addLine(container, "vline-med");

    // ---------- RIGHT SECTION BEGIN ----------
    const right = document.createElement("a");
    right.classList.add("right");
    right.href = article_right.web_url;
    container.appendChild(right);

    const img_container = document.createElement("div");
    right.appendChild(img_container);
    addImage(
        img_container,
        article_right.multimedia.default.url,
        article_right.multimedia.caption,
        article_right.multimedia.credit
    );

    addTextElement(right, "h3", article_right.headline.main);
    addTextElement(right, "p", article_right.abstract);
    addArticleLength(right, article_right.word_count);
    addCommentButton(right,  (event: MouseEvent) => toggleCommend(event, article_right._id));
    // ---------- RIGHT SECTION END ----------

}

function addHeadLineCenterLine(headlines: HTMLDivElement, article_left: NYTArticle, article_right: NYTArticle, toggleCommend: ((ev: MouseEvent, articleId: string) => void)) : void {
    // Divider from the previous article
    addLine(headlines, "hline-light-vspace");

    // Parent container and specify the display type
    const container = document.createElement("div");
    container.classList.add("news-equal");
    headlines.appendChild(container);

    // ---------- LEFT SECTION BEGIN ----------
    const left = document.createElement("a");
    left.classList.add("left");
    left.href = article_left.web_url;
    container.appendChild(left);

    const img_container_left = document.createElement("div");
    img_container_left.classList.add("equal-img");
    left.appendChild(img_container_left);
    addImage(
        img_container_left,
        article_left.multimedia.default.url,
        article_left.multimedia.caption,
        article_left.multimedia.credit
    );

    const headline_container_left = document.createElement("div");
    left.appendChild(headline_container_left);

    addTextElement(headline_container_left, "h3", article_left.headline.main)
    addArticleLength(headline_container_left, article_left.word_count);
    addCommentButton(headline_container_left,  (event: MouseEvent) => toggleCommend(event, article_left._id));
    // ---------- LEFT SECTION END ----------

    addLine(container, "hline-light-vspace"); // Visible when viewed on small screen
    addLine(container, "vline-med"); // Visible when viewed on larger screen

    // ---------- RIGHT SECTION BEGIN ----------
    const right = document.createElement("a");
    right.classList.add("right");
    right.href = article_right.web_url;
    container.appendChild(right);

    const img_container_right = document.createElement("div");
    img_container_right.classList.add("equal-img");
    right.appendChild(img_container_right);
    addImage(
        img_container_right,
        article_right.multimedia.default.url,
        article_right.multimedia.caption,
        article_right.multimedia.credit
    );

    const headline_container_right = document.createElement("div");
    right.appendChild(headline_container_right);

    addTextElement(headline_container_right, "h3", article_right.headline.main);
    addArticleLength(headline_container_right, article_right.word_count);
    addCommentButton(headline_container_right,  (event: MouseEvent) => toggleCommend(event, article_right._id));
    // ---------- RIGHT SECTION END ----------
}