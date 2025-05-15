export {addArticleLength, addLine, addTextElement, addImage, addCommentButton}

// Contains helper functions

// Add the xMIN READ letter
function addArticleLength(parent: HTMLElement, wordCount: number): void {
    const length = document.createElement("p");
    parent.appendChild(length);

    length.textContent = `${Math.round(wordCount / 250)} MIN READ`; // Average reading speed is 250 wpm
    length.classList.add("article-length");
}

// Add line of given type
function addLine(parent: HTMLElement, lineType: string) {
    const line = document.createElement("div");
    line.classList.add(lineType);
    parent.appendChild(line);
}

// Add image and credit
function addImage(parent: HTMLElement, src: string, alt: string, citation: string): void {
    const image = document.createElement("img");
    image.src = src;
    image.alt = alt;
    parent.appendChild(image);

    const credit = document.createElement("p");
    credit.textContent = citation;
    credit.classList.add("citation");
    parent.appendChild(credit);
}

// Add text element (e.g. h3, p, ...)
function addTextElement(parent: HTMLElement, elementType: string, text: string): HTMLElement {
    const textElement = document.createElement(elementType);
    textElement.textContent = text;
    parent.appendChild(textElement);

    return textElement
}

function addCommentButton(parent: HTMLElement, toggle: ((ev: MouseEvent) => void)): void {
    const comment = document.createElement("button");
    comment.classList.add("commentVisibility");
    comment.onclick = toggle;
    parent.appendChild(comment);

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('width', '21');
    svg.setAttribute('height', '18');
    svg.setAttribute("aria-hidden","true");
    svg.setAttribute('viewbox', '0 0 24 18');

    const path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    // Exerted from nytimes.com
    path.setAttribute("d", "m14.52 17.831-5.715-4.545H2.4a1.468 1.468 0 0 1-1.468-1.469V1.894A1.471 1.471 0 0 1 2.4.405h16.583a1.469 1.469 0 0 1 1.469 1.469v9.923a1.469 1.469 0 0 1-1.47 1.47H14.58l-.06 4.564ZM2.4 1.645a.228.228 0 0 0-.228.229v9.923a.228.228 0 0 0 .228.229h6.811l4.06 3.235v-3.235h5.652a.228.228 0 0 0 .229-.229V1.874a.228.228 0 0 0-.229-.229H2.4Z")
    svg.appendChild(path);
    comment.appendChild(svg);

    addTextElement(comment, "p", "comment");
}