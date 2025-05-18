<script lang="ts">
    import type {CommentInterface} from "./lib/CommentInterface";
    import Comment from "./lib/Comment.svelte";
    import {mount} from "svelte"; // To dynamically render comments and replies
    import type {User} from "./lib/User";

    interface CommentWithReply extends CommentInterface {
        reply: CommentWithReply[];
    }

    // Define what this component takes as prop
    interface CommentProps {
        visibility: {
            state: boolean,
        };
        data: {
            articleId: string;
            comments: CommentInterface[];
        }
        updateCommentsHandler: (articleId: string) => void;
        userInfo: User;
    }

    let {visibility = $bindable(), data, updateCommentsHandler, userInfo} : CommentProps = $props();

    // Change visibility of the command pane
    function changeVisibility() {
        visibility.state = !visibility.state;
    }

    // Handle posting comment to the backend
    async function postComment(e: SubmitEvent) {
        e.preventDefault();
        const userInput: HTMLInputElement | null = <HTMLInputElement>document.getElementById("comment-field");
        const commentContent = userInput?.value;
        if (!commentContent) return; // Reject null/empty comments

        try {
            const res = await fetch("/api/comments", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    article_id: data.articleId,
                    parent_id: "root",
                    text: commentContent,
                })
            });
            if (!res.ok) {
                console.error("NetworkError" + res);
                return;
            }
        } catch (error) {
            console.error(error);
            return;
        }
        userInput.value = "";
        updateCommentsHandler(data.articleId);
    }

    // Create nested relationship of parent comment and reply comment
    function createRelationship(flatComments: CommentInterface[]) : CommentWithReply[] {
        const comments: CommentWithReply[] = flatComments.map((c: CommentInterface) => {
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
                    comment.parent = "root"; // If parent comment is not found, the comment will be root
                }
            }
        })

        return comments.filter(comment => comment.parent === "root");
    }

    // Remove all of the existing comments and add the current comments
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

    // Helper function to recursively traverse replies and add them
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

    // Helper function to add comment component to the parent element using mount
    function addComment(parent: HTMLElement, comment: CommentWithReply) : HTMLElement {
        const commentContainer = document.createElement("div");
        commentContainer.classList.add("comment-container");
        mount(Comment, {
            target: commentContainer,
            props: {
                props: comment,
                updateCommentsHandler,
                userInfo
            }
        });
        parent.appendChild(commentContainer);
        return commentContainer;
    }

    // Re-render all comments if anything in comment array changes
    $effect(() => {
        const comments: CommentWithReply[] = createRelationship(data.comments);
        // Count number of reply
        comments.forEach(comment => comment.replyNum = comment.reply.length);
        replaceComments(comments);
    });
</script>

<div id="comment-pane">
<!--    Checkbox to control the visibility of the command pane-->
<!--    Used this instead of if block from svelte to animate-->
    <input type="checkbox" id="invokeCommentPane" bind:checked={visibility.state}/>

<!--    Overlay for the main area to focus on comment pane-->
    <div id="overlay" onclick={changeVisibility} onkeydown={_ => {}} role="button" tabindex="0"></div>

<!--    Comment pane content-->
    <div id="comments">
        <div class="vspace"></div>

        <div id="comment-heading">
            <h1 id="comment-title">Comments</h1>
            <button onclick={changeVisibility} tabindex="0">&#x2715;</button>
        </div>

<!--        Comment input field-->
        <form onsubmit={e => postComment(e)}>
            <input id="comment-field" type="text" placeholder="Share your thoughts.">
        </form>
<!--        Prompt and space to separate-->
        <p id="comment-prompt">The Times needs your voice. We welcome your on-topic commentary, criticism and expertise. <a href="https://help.nytimes.com/hc/en-us/articles/115014792387-The-Comments-Section">Comments are moderated for civility.</a></p>
        <div class="hline-light-vspace"></div>

        <div id="comment-container"></div>
    </div>

</div>