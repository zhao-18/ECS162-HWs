export {addFeaturedNews, addHeadLineCenterLine, addHeadLineNoLine, addHeadLineWithLine}

function addFeaturedNews(headlines: HTMLDivElement, article, subarticle = null) : void {
    const container = document.createElement("div");
    container.classList.add("news-head-no-line");
    headlines.appendChild(container);

    const left = document.createElement("div");
    left.classList.add("left");

    addTextElement(left, "h2", article.headline.main);
    addTextElement(left, "p", article.abstract);
    addArticleLength(left, article.word_count);

    if (subarticle !== null) {
        addLine(left, "hline-light-vspace");
        addTextElement(left, "h2", subarticle.headline.main);
        addTextElement(left, "p", subarticle.abstract);
        addArticleLength(left, subarticle.word_count);
    }

    const right = document.createElement("div");
    right.classList.add("right");

    const img_container = document.createElement("div");
    right.appendChild(img_container);

    addImage(
        img_container,
        article.multimedia.default.url,
        article.multimedia.caption,
        article.multimedia.credit
    );

    container.appendChild(left);
    container.appendChild(right);
}

function addHeadLineNoLine(headlines: HTMLDivElement, article) : void {
    addLine(headlines, "hline-vspace");

    const container = document.createElement("div");
    container.classList.add("news-head-no-line");
    headlines.appendChild(container);

    const left = document.createElement("div");
    left.classList.add("left");

    addTextElement(left, "h3", article.headline.main);
    addTextElement(left, "p", article.abstract);
    addArticleLength(left, article.word_count);

    const right = document.createElement("div");
    right.classList.add("right");

    const img_container = document.createElement("div");
    right.appendChild(img_container);

    addImage(
        img_container,
        article.multimedia.default.url,
        article.multimedia.caption,
        article.multimedia.credit
    );

    container.appendChild(left);
    container.appendChild(right);
}

function addHeadLineWithLine(headlines: HTMLDivElement, article_left, article_right, subarticles_left = []) : void {
    addLine(headlines, "hline-vspace");

    const container = document.createElement("div");
    container.classList.add("news-head-line");
    headlines.appendChild(container);

    const left = document.createElement("div");
    left.classList.add("left");

    addTextElement(left, "h3", article_left.headline.main);
    addTextElement(left, "p", article_left.abstract);
    addArticleLength(left, article_left.word_count);

    const right = document.createElement("div");
    right.classList.add("right");

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

    container.appendChild(left);
    addLine(container, "vline-med");
    container.appendChild(right);

    if (Array.isArray(subarticles_left)) {
        for (let i = 0; i < subarticles_left.length; i++) {
            addLine(left, "hline-light-vspace");
            addTextElement(left, "h3", subarticles_left[i].headline.main);
            addArticleLength(left, subarticles_left[i].word_count);
        }
    }
}

function addHeadLineCenterLine(headlines: HTMLDivElement, article_left, article_right) : void {
    addLine(headlines, "hline-light-vspace");

    const container = document.createElement("div");
    container.classList.add("news-equal");
    headlines.appendChild(container);

    const left = document.createElement("div");
    left.classList.add("left");

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

    const right = document.createElement("div");
    right.classList.add("right");

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

    container.appendChild(left);
    addLine(container, "hline-light-vspace");
    addLine(container, "vline-med");
    container.appendChild(right);
}

function addArticleLength(parent: HTMLDivElement, wordCount: string): void {
    const length = document.createElement("p");
    parent.appendChild(length);

    const wc = parseInt(wordCount);
    length.textContent = `${Math.round(wc / 250)} MIN READ`; // Average reading speed is 250 wpm
    length.classList.add("article-length");
}

function addLine(parent: HTMLDivElement, lineType: string) {
    const line = document.createElement("div");
    line.classList.add(lineType);
    parent.appendChild(line);
}

function addImage(parent: HTMLDivElement, src: string, alt: string, citation: string): void {
    const image = document.createElement("img");
    image.src = src;
    image.alt = alt;
    parent.appendChild(image);

    const credit = document.createElement("p");
    credit.textContent = citation;
    credit.classList.add("citation");
    parent.appendChild(credit);
}

function addTextElement(parent: HTMLDivElement, elementType: string, text: string): void {
    const textElement = document.createElement(elementType);
    textElement.textContent = text;
    parent.appendChild(textElement);
}