<script lang="ts">
    import Comment from "./lib/Comment.svelte";

    let {visibility} = $props();
</script>

<div id="commentPane">
    <input type="checkbox" id="invokeCommentPane" bind:checked={visibility.state}/>
    <div id="overlay" onclick={() => visibility.state = !visibility.state}></div>
    <div id="comments">
        <div class="vspace"></div>
        <h1 id="comment-title">Comments</h1>
        <form>
            <input id="comment-field" type="text" placeholder="Share your thoughts.">
        </form>
        <p id="comment-prompt">The Times needs your voice. We welcome your on-topic commentary, criticism and expertise. <a href="https://help.nytimes.com/hc/en-us/articles/115014792387-The-Comments-Section">Comments are moderated for civility.</a></p>
        <div class="hline-light-vspace"></div>
        <Comment username="trebor" locale="USA" date="May 15" content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." recommend={22} replyNum={14} />
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