<script lang="ts">
  import { onMount } from 'svelte';

  // To be removed once backend is complete
  import nyt_response from './assets/NYTAPI_output.json' with { type: 'json' };

  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";
  import {addFeaturedEditorial, addEditorial} from "./lib/addEditorialArticle";
  import {addFeaturedNews, addHeadLineCenterLine, addHeadLineNoLine, addHeadLineWithLine} from "./lib/AddNewsArticle";

  // DOM elements to add news in
  let headlines : HTMLElement;
  let editorials : HTMLElement;

  onMount(async () => {
    await load_articles();
  });

  async function load_articles(): Promise<void> {
    // TODO call backend
    const data = await fetch('/api/news');
    if (!data.ok) {
      console.error("Response was not ok: " + data);
      return;
    }
    const nyt_response = (await data.json()).response.docs;

    let is_first_news = true;
    let is_first_editorial = true;
    let hold_article = null;

    // Add item to headlines and editorials
    for (let article in nyt_response) {
      // If type of material is news, it goes to headline.
      // Everything else goes to ediorials
      if (nyt_response[article].type_of_material === "News") {
        // Add to headline
        if (is_first_news) {
          is_first_news = false;
          addFeaturedNews(headlines, nyt_response[article]);
        } else {
          // Alternate between one with line and one without line
          if (parseInt(article) % 5 === 0) {
            addHeadLineNoLine(headlines, nyt_response[article]);
          } else if (parseInt(article) % 5 === 1) {
            // Hold onto article so that we can display two things in one with line
            hold_article = article;
          } else if (parseInt(article) % 5 === 2) {
            // If the hold article is null here, then add as one with no line
            // But if not, then add as one with line
            if (hold_article === null) {
              addHeadLineNoLine(headlines, nyt_response[article]);
            } else {
              addHeadLineWithLine(headlines, nyt_response[article], nyt_response[hold_article]);
              hold_article = null;
            }
          } else if (parseInt(article) % 5 === 3) {
            // Hold onto article so that we can display two things in one with line in the center
            hold_article = article;
          } else {
            // If the hold article is null here, then add as one with no line
            // But if not, then add as one with line
            if (hold_article === null) {
              addHeadLineNoLine(headlines, nyt_response[article]);
            } else {
              addHeadLineCenterLine(headlines, nyt_response[article], nyt_response[hold_article]);
              hold_article = null;
            }
          }
        }

      } else {
        // Add the articles to editorial
        if (is_first_editorial) {
          is_first_editorial = false;
          addFeaturedEditorial(editorials, nyt_response[article]);
        } else {
          addEditorial(editorials, nyt_response[article]);
        }
      }
    }

    // If hold article is not null here, we missed one article.
    // Display as one with no line
    if (hold_article !== null) {
      addHeadLineNoLine(headlines, nyt_response[hold_article]);
    }
  }
</script>

<!-- Separated header for cleaner main -->
<Header />

<main>
  <section id="news">
    <!--        News, on left two column-->
    <div id="headlines" bind:this={headlines}>
    </div>
    <!--            News end-->

    <!--            Divider between news and editorial-->
    <div id="news-divider"><div class="vline-med"></div></div>

    <!--            Editorial, on right column-->
    <div id="editorials" bind:this={editorials}>
      <div class="vspace"></div>
    </div>
    <!--            Editorial end-->
  </section>
  <div class="vspace"></div>
</main>

<!-- Separated footer for cleaner main -->
<Footer />

<!-- import online resource (for search logo and chevron logo) -->
<style>
  @import "https://www.w3schools.com/w3css/5/w3.css";
  @import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
</style>