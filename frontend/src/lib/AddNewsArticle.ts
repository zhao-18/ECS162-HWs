export {addFeaturedNews, addHeadLineCenterLine, addHeadLineNoLine, addHeadLineWithLine}

function addFeaturedNews(headlines: HTMLElement, article, subarticle = null) : void {
    const featured_headline = document.createElement("h1");
    featured_headline.classList.add('breaking');
    featured_headline.textContent = article.headline.main;
    headlines.appendChild(featured_headline);

    const container = document.createElement("div");
    container.classList.add("news-head-no-line");
    headlines.appendChild(container);

    const left = document.createElement("div");
    left.classList.add("left");

    const headline = document.createElement("h2");
    headline.textContent = article.headline.main;
    left.appendChild(headline);

    const abstract = document.createElement("p");
    abstract.textContent = article.abstract;
    left.appendChild(abstract);

    const length = document.createElement("p");
    const wc = parseInt(article.word_count);
    length.textContent = `${Math.round(wc / 250)} MIN READ`; // Average reading speed is 250 wpm
    length.classList.add("article-length");
    left.appendChild(length);

    if (subarticle !== null) {
        const divider = document.createElement("div");
        divider.classList.add("hline-light-vspace");
        left.appendChild(divider);

        const headline = document.createElement("h2");
        headline.textContent = subarticle.headline.main;
        left.appendChild(headline);

        const abstract = document.createElement("p");
        abstract.textContent = subarticle.abstract;
        left.appendChild(abstract);

        const length = document.createElement("p");
        const wc = parseInt(subarticle.word_count);
        length.textContent = `${Math.round(wc / 250)} MIN READ`; // Average reading speed is 250 wpm
        length.classList.add("article-length");
        left.appendChild(length);
    }

    const right = document.createElement("div");
    right.classList.add("right");

    const img_container = document.createElement("div");
    right.appendChild(img_container);

    const image = document.createElement("img");
    image.src = article.multimedia.default.url;
    image.alt = article.multimedia.caption;
    img_container.appendChild(image);

    const credit = document.createElement("p");
    credit.textContent = article.multimedia.credit;
    credit.classList.add("citation");
    img_container.appendChild(credit);

    container.appendChild(left);
    container.appendChild(right);
}

function addHeadLineNoLine(headlines: HTMLElement, article) : void {
    const divider = document.createElement("div");
    divider.classList.add("hline-vspace");
    headlines.appendChild(divider);

    const container = document.createElement("div");
    container.classList.add("news-head-no-line");
    headlines.appendChild(container);

    const left = document.createElement("div");
    left.classList.add("left");

    const headline = document.createElement("h3");
    headline.textContent = article.headline.main;
    left.appendChild(headline);

    const abstract = document.createElement("p");
    abstract.textContent = article.abstract;
    left.appendChild(abstract);

    const length = document.createElement("p");
    const wc = parseInt(article.word_count);
    length.textContent = `${Math.round(wc / 250)} MIN READ`; // Average reading speed is 250 wpm
    length.classList.add("article-length");
    left.appendChild(length);

    const right = document.createElement("div");
    right.classList.add("right");

    const img_container = document.createElement("div");

    const image = document.createElement("img");
    image.src = article.multimedia.default.url;
    image.alt = article.multimedia.caption;
    img_container.appendChild(image);

    const credit = document.createElement("p");
    credit.textContent = article.multimedia.credit;
    credit.classList.add("citation");
    img_container.appendChild(credit);

    right.appendChild(img_container);

    container.appendChild(left);
    container.appendChild(right);
}

function addHeadLineWithLine(headlines: HTMLElement, article_left, article_right, subarticles_left = []) : void {
    const divider = document.createElement("div");
    divider.classList.add("hline-vspace");
    headlines.appendChild(divider);

    const container = document.createElement("div");
    container.classList.add("news-head-line");
    headlines.appendChild(container);

    const left = document.createElement("div");
    left.classList.add("left");

    const headline_left = document.createElement("h3");
    headline_left.textContent = article_left.headline.main;
    left.appendChild(headline_left);

    const abstract_left = document.createElement("p");
    abstract_left.textContent = article_left.abstract;
    left.appendChild(abstract_left);

    const length_left = document.createElement("p");
    const wc = parseInt(article_left.word_count);
    length_left.textContent = `${Math.round(wc / 250)} MIN READ`; // Average reading speed is 250 wpm
    length_left.classList.add("article-length");
    left.appendChild(length_left);

    const right = document.createElement("div");
    right.classList.add("right");

    const img_container = document.createElement("div");

    const image = document.createElement("img");
    image.src = article_right.multimedia.default.url;
    image.alt = article_right.multimedia.caption;
    img_container.appendChild(image);

    const credit = document.createElement("p");
    credit.textContent = article_right.multimedia.credit;
    credit.classList.add("citation");
    img_container.appendChild(credit);

    right.appendChild(img_container);

    const headline_right = document.createElement("h3");
    headline_right.textContent = article_right.headline.main;
    right.appendChild(headline_right);

    const abstract_right = document.createElement("p");
    abstract_right.textContent = article_right.abstract;
    right.appendChild(abstract_right);

    const length_right = document.createElement("p");
    const wc_right = parseInt(article_right.word_count);
    length_right.textContent = `${Math.round(wc_right / 250)} MIN READ`; // Average reading speed is 250 wpm
    length_right.classList.add("article-length");
    right.appendChild(length_right);

    const line = document.createElement("div");
    line.classList.add("vline-med");

    container.appendChild(left);
    container.appendChild(line);
    container.appendChild(right);

    if (Array.isArray(subarticles_left)) {
        for (let i = 0; i < subarticles_left.length; i++) {
            const divider = document.createElement("div");
            divider.classList.add("hline-light-vspace");
            left.appendChild(divider);

            const headline = document.createElement("h3");
            headline.textContent = subarticles_left[i].headline.main;
            left.appendChild(headline);

            const length = document.createElement("p");
            const wc = parseInt(subarticles_left[i].word_count);
            length.textContent = `${Math.round(wc / 250)} MIN READ`; // Average reading speed is 250 wpm
            length.classList.add("article-length");
            left.appendChild(length);
        }
    }
}

function addHeadLineCenterLine(headlines: HTMLElement, article_left, article_right) : void {
    const divider = document.createElement("div");
    divider.classList.add("hline-light-vspace");
    headlines.appendChild(divider);

    const container = document.createElement("div");
    container.classList.add("news-equal");
    headlines.appendChild(container);

    const left = document.createElement("div");
    left.classList.add("left");

    const img_container_left = document.createElement("div");
    left.appendChild(img_container_left);

    const image_left = document.createElement("img");
    image_left.src = article_left.multimedia.default.url;
    image_left.alt = article_left.multimedia.caption;
    img_container_left.appendChild(image_left);

    const credit_left = document.createElement("p");
    credit_left.textContent = article_left.multimedia.credit;
    credit_left.classList.add("citation");
    img_container_left.appendChild(credit_left);

    const headline_container_left = document.createElement("div");
    left.appendChild(headline_container_left);

    const headline_left = document.createElement("h3");
    headline_left.textContent = article_left.headline.main;
    headline_container_left.appendChild(headline_left);

    const length_left = document.createElement("p");
    const wc = parseInt(article_left.word_count);
    length_left.textContent = `${Math.round(wc / 250)} MIN READ`; // Average reading speed is 250 wpm
    length_left.classList.add("article-length");
    headline_container_left.appendChild(length_left);

    const right = document.createElement("div");
    right.classList.add("right");

    const img_container_right = document.createElement("div");
    right.appendChild(img_container_right);

    const image_right = document.createElement("img");
    image_right.src = article_right.multimedia.default.url;
    image_right.alt = article_right.multimedia.caption;
    img_container_right.appendChild(image_right);

    const credit_right = document.createElement("p");
    credit_right.textContent = article_right.multimedia.credit;
    credit_right.classList.add("citation");
    img_container_right.appendChild(credit_right);

    const headline_container_right = document.createElement("div");
    right.appendChild(headline_container_right);

    const headline_right = document.createElement("h3");
    headline_right.textContent = article_right.headline.main;
    headline_container_right.appendChild(headline_right);

    const length_right = document.createElement("p");
    const wc_right = parseInt(article_right.word_count);
    length_right.textContent = `${Math.round(wc_right / 250)} MIN READ`; // Average reading speed is 250 wpm
    length_right.classList.add("article-length");
    headline_container_right.appendChild(length_right);

    const line = document.createElement("div");
    line.classList.add("vline-med");

    const line_phone = document.createElement("div");
    line_phone.classList.add("hline-light-vspace");

    container.appendChild(left);
    container.appendChild(line);
    container.appendChild(right);
}