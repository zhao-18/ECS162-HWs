<script lang="ts">
    import type {comment} from "./lib/CommentInterface";
    import Comment from "./lib/Comment.svelte";
    import {mount} from "svelte";

    interface CommentWithReply extends comment {
        reply: CommentWithReply[];
    }

    interface CommentProps {
        visibility: {
            state: boolean,
        };
        data: {
            articleId: string;
            comments: comment[];
        }
    }

    let {visibility = $bindable(), data} : CommentProps = $props();

    function changeVisibility() {
        visibility.state = !visibility.state;
    }

    function postComment(e: SubmitEvent) {
        e.preventDefault();
        const userInput: HTMLInputElement | null = <HTMLInputElement>document.getElementById("comment-field");
        const commentContent = userInput?.value;
        if (!commentContent) return; // Reject null/empty comments
        let now = new Date();

        console.log({
            id: "create on backend?",
            username: "get on backend",
            locale: "USA",
            date: `${now.getMonth() + 1}/${now.getDate()}`,
            content: commentContent,
            recommend: 0,
            replyNum: 0,
            articleId: data.articleId,
            parent: "root",
        }); // Post to backend

        userInput.value = "";
    }

    function createRelationship(flatComments: comment[]) : CommentWithReply[] {
        const comments: CommentWithReply[] = flatComments.map((c: comment) => {
            return {
                ...c,
                reply: []
            }
        })

        comments.forEach(comment => {
            if (comment.parent !== "root") {
                const parent = comments.find(c => c.id === comment.parent);
                if (parent !== null && parent !== undefined) {
                    parent.reply.push(comment);
                } else {
                    comment.parent = "root";
                }
            }
        })

        return comments.filter(comment => comment.parent === "root");
    }

    function replaceComments(comments: CommentWithReply[]) {
        const container = document.getElementById("comment-container");
        if (!container) return;
        container.replaceChildren();
        for (const [_, comment] of comments.entries()) {
            const commentElement = addComment(container, comment);
            if (comment.reply.length > 0) {
                addReplies(commentElement, comment.reply);
            }
        }
    }

    function addReplies(parent: HTMLElement, replies: CommentWithReply[]) {
        const container = document.createElement("div");
        container.classList.add("reply-container");
        parent.appendChild(container);

        const line = document.createElement("div");
        line.classList.add("vline-med");
        container.appendChild(line);

        const replyArea = document.createElement("div");
        replyArea.classList.add("reply-area");
        container.appendChild(replyArea);

        for (const [_, comment] of replies.entries()) {
            const commentElement = addComment(replyArea, comment);
            if (comment.reply.length > 0) {
                addReplies(commentElement, comment.reply);
            }
        }
    }

    function addComment(parent: HTMLElement, comment: CommentWithReply) : HTMLElement {
        const commentContainer = document.createElement("div");
        commentContainer.classList.add("comment-container");
        mount(Comment, {
            target: commentContainer,
            props: comment
        });
        parent.appendChild(commentContainer);
        return commentContainer;
    }

    $effect(() => {
        const comments: CommentWithReply[] = createRelationship(data.comments);
        replaceComments(comments);
    });
</script>

<div id="comment-pane">
    <input type="checkbox" id="invokeCommentPane" bind:checked={visibility.state}/>
    <div id="overlay" onclick={changeVisibility} onkeydown={_ => {}} role="button" tabindex="0"></div>
    <div id="comments">
        <div class="vspace"></div>
        <div id="comment-heading">
            <h1 id="comment-title">Comments</h1>
            <button onclick={changeVisibility} tabindex="0">&#x2715;</button>
        </div>
        <form onsubmit={e => postComment(e)}>
            <input id="comment-field" type="text" placeholder="Share your thoughts.">
        </form>
        <p id="comment-prompt">The Times needs your voice. We welcome your on-topic commentary, criticism and expertise. <a href="https://help.nytimes.com/hc/en-us/articles/115014792387-The-Comments-Section">Comments are moderated for civility.</a></p>
        <div class="hline-light-vspace"></div>
        <div id="comment-container">
        </div>
    </div>
</div>