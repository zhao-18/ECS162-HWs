<script lang="ts">
    import Comment from "./lib/Comment.svelte";

    let {visibility} = $props();
</script>

<div id="commentPane">
    <input type="checkbox" id="invokeCommentPane" bind:checked={visibility.state}/>
    <div id="overlay" onclick={() => visibility.state = !visibility.state}></div>
    <div id="comments">
        <Comment username="trebor" locale="USA" date="May 15" content="YEHEHAHHAHA" recommend={22} replyNum={14} />
        <Comment username="trebor" locale="USA" date="May 15" content="YEHEHAHHAHA" recommend={22} replyNum={14} />
        <Comment username="trebor" locale="USA" date="May 15" content="YEHEHAHHAHA" recommend={22} replyNum={14} />
        <Comment username="trebor" locale="USA" date="May 15" content="YEHEHAHHAHA" recommend={22} replyNum={14} />
        <Comment username="trebor" locale="USA" date="May 15" content="YEHEHAHHAHA" recommend={22} replyNum={14} />
        <Comment username="trebor" locale="USA" date="May 15" content="YEHEHAHHAHA" recommend={22} replyNum={14} />
        <Comment username="trebor" locale="USA" date="May 15" content="YEHEHAHHAHA" recommend={22} replyNum={14} />
        <Comment username="trebor" locale="USA" date="May 15" content="YEHEHAHHAHA" recommend={22} replyNum={14} />
        <Comment username="trebor" locale="USA" date="May 15" content="YEHEHAHHAHA" recommend={22} replyNum={14} />
    </div>
</div>