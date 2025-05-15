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
    comment.textContent = "Comment";
    comment.onclick = toggle;
    parent.appendChild(comment);
}