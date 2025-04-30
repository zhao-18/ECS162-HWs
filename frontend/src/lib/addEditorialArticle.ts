export {addEditorial, addFeaturedEditorial}

function addFeaturedEditorial(editorials: HTMLElement, article) : void {
    const container = document.createElement("div");
    editorials.appendChild(container);

    if (article.multimedia?.default?.url) {
        const image = document.createElement("img");
        image.src = article.multimedia.default.url;
        image.alt = article.multimedia.caption;
        container.appendChild(image);

        const credit = document.createElement("p");
        credit.textContent = article.multimedia.credit;
        credit.classList.add("citation");
        container.appendChild(credit);
    }

    const headline = document.createElement("h2");
    headline.id = 'featured';
    headline.textContent = article.headline.main;
    container.appendChild(headline);

    const abstract = document.createElement("p");
    abstract.textContent = article.abstract;
    container.appendChild(abstract);
}

function addEditorial(editorials: HTMLElement, article) : void {
    const divider = document.createElement('div');
    divider.classList.add('hline-light-vspace');
    editorials.appendChild(divider);

    const container = document.createElement("div");
    editorials.appendChild(container);

    if (article.multimedia?.default?.url) {
        const image = document.createElement("img");
        image.src = article.multimedia.default.url;
        image.alt = article.multimedia.caption;
        container.appendChild(image);

        const credit = document.createElement("p");
        credit.textContent = article.multimedia.credit;
        credit.classList.add("citation");
        container.appendChild(credit);
    }

    const author = document.createElement("p");
    author.textContent = article.byline.original;
    container.appendChild(author);

    const headline = document.createElement("h2");
    headline.textContent = article.headline.main;
    container.appendChild(headline);

    if (article.word_count) {
        const length = document.createElement("p");
        const wc = parseInt(article.word_count);
        length.textContent = `${Math.round(wc / 250)} MIN READ`; // Average reading speed is 250 wpm
        length.classList.add("article-length");
        container.appendChild(length);
    }
}