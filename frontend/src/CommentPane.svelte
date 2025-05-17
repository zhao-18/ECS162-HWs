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

        console.log(data.articleId, commentContent); // Post to backend with article id and such
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

<div id="commentPane">
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
            <Comment id="1" parent="root" username="trebor" locale="USA" date="May 15" content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." recommend={22} replyNum={14} />
            <Comment id="2" parent="root" username="trebor" locale="USA" date="May 15" content="YEHEHAHHAHA" recommend={22} replyNum={14} />
            <Comment id="3" parent="root" username="trebor" locale="USA" date="May 15" content="YEHEHAHHAHA" recommend={22} replyNum={14} />
            <Comment id="4" parent="root" username="trebor" locale="USA" date="May 15" content="YEHEHAHHAHA" recommend={22} replyNum={14} />
            <Comment id="5" parent="root" username="trebor" locale="USA" date="May 15" content="YEHEHAHHAHA" recommend={22} replyNum={14} />
            <Comment id="6" parent="root" username="trebor" locale="USA" date="May 15" content="YEHEHAHHAHA" recommend={22} replyNum={14} />
            <Comment id="7" parent="root" username="trebor" locale="USA" date="May 15" content="YEHEHAHHAHA" recommend={22} replyNum={14} />
            <Comment id="8" parent="root" username="trebor" locale="USA" date="May 15" content="YEHEHAHHAHA" recommend={22} replyNum={14} />
        </div>
    </div>
</div>