<!-- This component displays comments with style and contains logic to reply to it -->
<!-- It takes elements specified in CommentInterface and callback function to update comment pane -->

<script lang="ts">

    let {props, updateCommentsHandler, userInfo} = $props();

    // States:
    //  - text that will be the reply of this comment
    //  - boolean to control reply input field visibility
    let replyText: string = $state("");
    let replyFieldVisible = $state(false);

    function toggleReplyField() {
        replyFieldVisible = !replyFieldVisible;
    }

    // handle things related to submitting comment
    async function postReply(e: SubmitEvent) {
        e.preventDefault(); // Prevent refresh
        if (!replyText) return; // Reject null/empty comments

        // Post the comment to the backend
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

        // If successful, remove typed reply and refresh the comment section
        replyText = "";
        toggleReplyField();
        updateCommentsHandler(props.articleId);
    }

    async function moderate() {
        if (userInfo.moderator) {
            try {
                await fetch("/api/comments/" + props.id + "/moderater", {
                    method: "POST",
                })
            } catch (error) {
                console.error(error);
                return;
            }
            updateCommentsHandler(props.articleId);
        }
    }

    async function redactContent() {
        // Do not moderate already moderated comment
        if (props.content === "COMMENT REMOVED BY MODERATOR!") return;

        // Get click location
        const redact_range = document.getSelection()?.getRangeAt(0);
        if (!redact_range) return;

        let redact_text = "";
        // Get words that was clicked on

        // If startOffset and endOffset is different, we will censor the selection
        if (redact_range.startOffset !== redact_range.endOffset) {
            redact_text = props.content.substring(redact_range.startOffset, redact_range.endOffset);
        } else {
            // Count spaces before the index. The result will be the offset for the word that contain index
            let word_offset = 0;
            for (let i = 0; i < redact_range.startOffset; i++) {
                if (props.content.charAt(i) == " ") {
                    word_offset++;
                }
            }
            // Get the word
            redact_text = props.content.split(" ")[word_offset];
        }

        if (redact_text && userInfo.moderator) {
            try {
                await fetch("/api/comments/" + props.id + "/moderater", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        redact_text: redact_text
                    })
                })
            } catch (error) {
                console.error(error);
                return;
            }
            updateCommentsHandler(props.articleId);
        }
    }
</script>

<div id="comment">
    <span id="username">{props.username}</span>

    <div id="metadata">
        <span id="locale">{props.locale}</span>
        <div class="vline-light"></div>
        <span id="comment-date">{props.date}</span>
    </div>

    {#if userInfo.moderator}
        <p id="content" onclick={redactContent}>{props.content}</p>
    {:else}
        <p id="content">{props.content}</p>
    {/if}


    <div id="social">
        <button id="reply" onclick={toggleReplyField}>Reply</button>
        <button id="recommend">Recommend</button>
        <button id="share">Share</button>

<!--        Only show this element if the user is moderator-->
        {#if userInfo.moderator}
            <button id="moderate" onclick={moderate}>Delete</button>
        {/if}
    </div>

    <span id="num-reply">{props.replyNum} REPLIES</span>

<!--    Show this element only when reply field is set to be visible-->
    {#if replyFieldVisible}
        <form onsubmit={e => postReply(e)}>
            <input id="reply-field" type="text" placeholder="Respond to the comment." bind:value={replyText}>
        </form>
    {/if}
</div>