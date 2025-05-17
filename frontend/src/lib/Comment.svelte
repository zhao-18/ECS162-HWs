<script lang="ts">
    let {props, updateCommentsHandler} = $props();
    let replyText: string = $state("");

    let replyFieldVisible = $state(false);
    function toggleReplyField() {
        replyFieldVisible = !replyFieldVisible;
    }

    async function postReply(e: SubmitEvent) {
        e.preventDefault();
        if (!replyText) return; // Reject null/empty comments

        try {
            const res = await fetch("/api/comments", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    article_id: props.articleId,
                    parent_id: props.id,
                    text: replyText,
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
        replyText = "";
        toggleReplyField();
        updateCommentsHandler(props.articleId);
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
        <button id="recommend">Recommend</button>
        <button id="share">Share</button>
        <button id="moderate">Delete</button>
    </div>
    <span id="num-reply">{props.replyNum} REPLIES</span>
    {#if replyFieldVisible}
        <form onsubmit={e => postReply(e)}>
            <input id="reply-field" type="text" placeholder="Respond to the comment." bind:value={replyText}>
        </form>
    {/if}
</div>