<script lang="ts">
  import { onMount } from 'svelte';
  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";
  import {addFeaturedEditorial, addEditorial} from "./lib/AddEditorialArticle";
  import {addFeaturedNews, addHeadLineCenterLine, addHeadLineNoLine, addHeadLineWithLine} from "./lib/AddNewsArticle";
  import type {NYTArticle} from "./lib/NYTArticle";
  import CommentPane from "./CommentPane.svelte";

  let commentSectionVisibility = $state({state: false});
  let commentProps = $state({
    articleId: "",
    comments: []
  });

  function updateComments(articleId: string) {
    fetch('/api/comments?article_id=' + articleId)
            .then(res => res.json())
            .then(data => data.map(
                    comment => {
                      return {
                        id: comment._id,
                        articleId: comment.article_id,
                        parent: comment.parent_id,
                        locale: "USA",
                        date: comment.created_at,
                        content: comment.text,
                        username: comment.user,
                        replyNum: 0,
                      }
                    })
            )
            .then(data => {
              commentProps.comments = data;
            })
            .catch(err => console.log(err));
  }

  function toggleCommandPanel(ev: MouseEvent, articleId: string) {
    // Get comments from the backend and populate commentList here
    commentProps.articleId = articleId;
    updateComments(articleId);
    commentSectionVisibility.state = !commentSectionVisibility.state;
    ev.preventDefault();
  }

  // DOM elements to add news in
  let headlines : HTMLDivElement;
  let editorials : HTMLDivElement;

  onMount(async () => {
    await load_articles();
  });

  async function load_articles(): Promise<void> {
    const data = await fetch('/api/news');
    if (!data.ok) {
      console.error("Response was not ok: " + data);
      return;
    }
    const nyt_response: NYTArticle[] = (await data.json()).response.docs;

    let is_first_news = true;
    let is_first_editorial = true;
    let hold_article: string = "";

    // Add item to headlines and editorials
    for (let article in nyt_response) {
      // If type of material is news, it goes to headline.
      // Everything else goes to editorials
      if (nyt_response[article].type_of_material === "News") {
        // Add to headline
        if (is_first_news) {
          is_first_news = false;
          addFeaturedNews(headlines, nyt_response[article], toggleCommandPanel);
        } else {
          // Alternate between one with line and one without line
          if (parseInt(article) % 6 === 0) {
            addHeadLineNoLine(headlines, nyt_response[article], toggleCommandPanel);
          } else if (parseInt(article) % 6 === 1) {
            // Hold onto article so that we can display two things in one with line
            hold_article = article;
          } else if (parseInt(article) % 6 === 2) {
            // If the hold article is null here, then add as one with no line
            // But if not, then add as one with line
            if (hold_article === "") {
              addHeadLineNoLine(headlines, nyt_response[article], toggleCommandPanel);
            } else {
              addHeadLineWithLine(headlines, nyt_response[article], nyt_response[hold_article], toggleCommandPanel);
              hold_article = "";
            }
          } else if (parseInt(article) % 6 === 3) {
            // Hold onto article so that we can display two things in one with line in the center
            hold_article = article;
          } else if (parseInt(article) % 6 === 4) {
            // If the hold article is empty here, then add as one with no line
            // But if not, then add as one with line
            if (hold_article === "") {
              addHeadLineNoLine(headlines, nyt_response[article], toggleCommandPanel);
            } else {
              addHeadLineCenterLine(headlines, nyt_response[article], nyt_response[hold_article], toggleCommandPanel);
              hold_article = "";
            }
          } else {
            // Add the articles to editorial
            if (is_first_editorial) {
              is_first_editorial = false;
              addFeaturedEditorial(editorials, nyt_response[article], toggleCommandPanel);
            } else {
              addEditorial(editorials, nyt_response[article], toggleCommandPanel);
            }
          }
        }

      } else {
        // Add the articles to editorial
        if (is_first_editorial) {
          is_first_editorial = false;
          addFeaturedEditorial(editorials, nyt_response[article], toggleCommandPanel);
        } else {
          addEditorial(editorials, nyt_response[article], toggleCommandPanel);
        }
      }
    }

    // If hold article is not empty here, we missed one article.
    // Display as one with no line
    if (hold_article !== "") {
      addHeadLineNoLine(headlines, nyt_response[hold_article], toggleCommandPanel);
    }
  }
</script>

<!-- Separated header for cleaner main -->
<Header />

<CommentPane bind:visibility={commentSectionVisibility} data={commentProps} updateCommentsHandler={updateComments} />

<main>
  <section id="news">
    <!--        News, on left two column-->
    <div id="headlines" bind:this={headlines}></div>
    <!--            News end-->

    <!--            Divider between news and editorial-->
    <div id="news-divider"><div class="vline-med"></div></div>

    <!--            Editorial, on right column-->
    <div id="editorials" bind:this={editorials}><div class="vspace"></div></div>
    <!--            Editorial end-->
  </section>
  <div class="vspace"></div>
</main>

<!-- Separated footer for cleaner main -->
<Footer />

