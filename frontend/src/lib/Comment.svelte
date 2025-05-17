<script lang="ts">
    import type { comment } from "./CommentInterface";
    let props: comment = $props();
    let replyText: string = $state("");

    let replyFieldVisible = $state(false);
    function toggleReplyField() {
        replyFieldVisible = !replyFieldVisible;
    }

    function postReply(e: SubmitEvent) {
        e.preventDefault();
        if (!replyText) return; // Reject null/empty comments

        let now = new Date();
        console.log({
            id: "create on backend?",
            username: "get on backend",
            locale: "USA",
            date: `${now.getMonth() + 1}/${now.getDate()}`,
            content: replyText,
            recommend: 0,
            replyNum: 0,
            articleId: props.articleId,
            parent: props.id,
        }); // Post to backend

        replyText = "";
        toggleReplyField();
    }

    function recommend() {
        console.log({
            ...props,
            recommend: props.recommend + 1,
        }); // Post to backend
    }
</script>

<div id="comment">
    <span id="username">{props.username}</span>
    <div id="metadata">
        <span id="locale">{props.locale}</span>
        <div class="vline-light"></div>
        <span id="comment-date">{props.date}</span>
    </div>
    <p id="content">{props.content}</p>
    <div id="social">
        <button id="reply" onclick={toggleReplyField}>Reply</button>
        <button id="recommend" onclick={recommend}><span>{props.recommend}</span> Recommend</button>
        <button id="share">Share</button>
    </div>
    <span id="num-reply">{props.replyNum} REPLIES</span>
    {#if replyFieldVisible}
        <form onsubmit={e => postReply(e)}>
            <input id="reply-field" type="text" placeholder="Respond to the comment." bind:value={replyText}>
        </form>
    {/if}
</div>