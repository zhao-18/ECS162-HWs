<script lang="ts">
    import type { comment } from "./CommentInterface";
    let props: comment = $props();
</script>

<div id="comment">
    <span id="username">{props.username}</span>
    <div id="metadata">
        <span id="locale">{props.locale}</span>
        <div class="vline-light"></div>
        <span id="date">{props.date}</span>
    </div>
    <p id="content">{props.content}</p>
    <div id="social">
        <button id="reply">Reply</button>
        <button id="recommend"><span>{props.recommend}</span> Recommend</button>
        <button id="share">Share</button>
    </div>
    <span id="num-reply">{props.replyNum} REPLIES</span>
</div>