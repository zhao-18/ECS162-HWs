<script lang="ts">
  import { onMount } from 'svelte';

  // To be removed once backend is complete
  import img_carmel from './assets/36-hours-Carmel.webp';
  import img_direwolf from './assets/DIREWOLF.webp';
  import img_jews_danger from './assets/jews-danger.webp';
  import img_DHS from './assets/DHS.webp';
  import img_stock_inauguration from './assets/stock-inauguration.webp';
  import img_trump_stock from './assets/trump-tariffs-stock-market.png';
  import img_uk_ev from './assets/uk-electric-cars.webp';

  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";

  // Get API key
  let apiKey: string = '';

  onMount(async () => {
    try {
      const res = await fetch('/api/key');
      const data = await res.json();
      apiKey = data.apiKey;
    } catch (error) {
      console.error('Failed to fetch API key:', error);
    }
  });
</script>

<!-- Separated header for cleaner main -->
<Header />

<main>
  <section id="news">
    <!--        News, on left two column-->
    <div id="headlines">

      <!--                News 1 begin-->
      <!--                Large headline-->
      <h1 id="breaking">Wild Swings on Wall St. as Nations Urge Trump to Ease Tariffs</h1>
      <div class="news-head-no-line">

        <div class="left">
          <h2>Trump, in Escalation, Threatens China With New Tariffs</h2>
          <p>A top White House adviser indicates that offers from trading partners won’t convince Trump to retreat. How a false report on a 90-day pause on tariffs made markets swing wildly.</p>
          <div class="hline-light-vspace"></div>
          <h3>Global Leaders Rush to Woo Trump, Hoping to Sway Him on Tariffs</h3>
          <p>Dozens of foreign governments were trying to appeal to President Trump to have steep tariffs rolled back, but he has indicated negotiations could be difficult.</p>
          <p class="article-length">7 MIN READ</p>
        </div>

        <div class="right">
          <div>
            <img src={img_trump_stock} alt="S&P 500 Today +9.52% April 2 April 3 April 4 April 7 April 8 April 9 4,800 5,000 5,200 5,400 5,600 Data delayed at least 15 minutes• Source: Factset• By The New York Times">
            <p class="citation">Source: Factset • By The New York Times</p>
          </div>
        </div>

      </div>
      <!--                News 1 end-->

      <div class="hline-light-vspace"></div>

      <!--                News 2 begin-->
      <div class="news-equal">

        <div class="left">
          <div>
            <h3>Stocks Whipsaw With S&P 500 on the Precipice of a Bear Market</h3>
            <p class="article-length">5 MIN READ</p>
          </div>
        </div>

        <div class="vline-med"></div>
        <div class="hline-light-vspace"></div>

        <div class="right">
          <h3>No Big Stick: Many Tariff Targets Avoid Hitting Back</h3>
        </div>

      </div>
      <!--                News 2 end-->

      <div class="hline-light-vspace"></div>

      <!--                News 3 begin-->
      <div class="news-equal">

        <div class="left">
          <div>
            <img src={img_stock_inauguration} alt="S&P 500 Since Inauguration Day">
            <p class="citation">The New York Times</p>
          </div>
          <div>
            <h3>What Is a Bear Market? Are We in One?</h3>
            <p class="article-length">3 MIN READ</p>
          </div>
        </div>

        <div class="vline-med"></div>
        <div class="hline-light-vspace"></div>

        <div class="right">
          <div>
            <img src={img_uk_ev} alt="An aerial view of cars parked outside.">
            <p class="citation">Dan Kitwood/Getty Images</p>
          </div>
          <div>
            <h3>Britain Eases Rules on Electric Vehicles as Auto Tariffs Hit</h3>
            <p class="article-length">2 MIN READ</p>
          </div>
        </div>

      </div>
      <!--                News 3 end-->

      <div class="hline-vspace"></div>

      <!--                News 4 begin-->
      <div class="news-head-line">

        <div class="left">
          <h3>Supreme Court Temporarily Blocks Order to Return Wrongly Deported Migrant</h3>
          <p>Chief Justice John Roberts issued an “administrative stay” to give the court time to consider the matter. The justices are expected to act in the coming days.</p>
          <p class="article-length">4 MIN READ</p>
          <div class="hline-light-vspace"></div>
          <h3>Trump Administration Aims to Spend $45 Billion to Expand Immigrant Detention</h3>
          <p class="article-length">5 MIN READ</p>
          <div class="hline-light-vspace"></div>
          <h3>2 Border Officers Charged With Taking Bribes to Allow Undocumented Migrants</h3>
          <p class="article-length">2 MIN READ</p>
        </div>

        <div class="vline-med"></div>

        <div class="right">
          <div>
            <img src={img_DHS} alt="A military vehicle on a street in Colorado with ICE agents and onlookers nearby.">
            <p class="citation">Chet Strange from New York Times</p>
          </div>
          <h3>When It Comes to D.E.I. and ICE, Trump Is Using Federal Grants as Leverage</h3>
          <p>The Department of Homeland Security is reviewing billions of dollars in grants to make sure cities and states are complying with President Trump’s priorities.</p>
          <p class="article-length">5 MIN READ</p>
        </div>

      </div>
      <!--                News 4 end-->

      <div class="hline-vspace"></div>

      <!--                News 5 begin-->
      <div class="news-head-no-line">

        <div class="left">
          <h3>Scientists Revive the Dire Wolf, or Something Close</h3>
          <p>Dire wolves, made famous by “Game of Thrones,” went extinct some 13,000 years ago. Now, researchers have bred gray-wolf pups that carry genes of their ancient cousins.</p>
          <p class="article-length">7 MIN READ</p>
        </div>

        <div class="right">
          <div>
            <img src={img_direwolf} alt="A large white-furred wolf holds a stick in its mouth as snow falls.">
            <p class="citation">Colossal Biosciences</p>
          </div>
        </div>

      </div>
      <!--                News 5 end-->
      <div class="vspace"></div>
    </div>
    <!--            News end-->

    <!--            Divider between news and editorial-->
    <div id="news-divider"><div class="vline-med"></div></div>

    <!--            Editorial, on right column-->
    <div id="editorials">
      <div class="vspace"></div>

      <!--                Article 1 begin-->
      <img src={img_carmel} alt="View of the coastline at Point Lobos State Reserve">
      <p class="citation">Jason Henry from New York Times</p>
      <div>
        <h2 id="featured">36 Hours in Carmel, Calif.</h2>
        <p>On California's Central Coast, three storybook enclaves draw visitors with dramatic cliffs, sandy beaches, zany architectures and more.</p>
      </div>
      <!--                Article 1 end-->

      <div class="vspace"></div>
      <div class="hline"></div>

      <!--                Opinion section begin-->
      <p class="section-name">Opinion</p>
      <div class="vspace"></div>

      <!--                Article 2 begin-->
      <div>
        <p>GAIL COLLINS AND BRET STEPHENS</p>
        <h2>Trump Has Everything Under Control</h2>
        <p class="article-length">7 MIN READ</p>
      </div>
      <!--                Article 2 end
      -->
      <div class="hline-light-vspace"></div>

      <!--                Article 3 begin-->
      <div>
        <p>MICHAEL S. ROTH</p>
        <h2>The President Is Selling Jews a Dangerous Lie</h2>
        <p class="article-length">8 MIN READ</p>
      </div>
      <img src={img_jews_danger} alt="An illustration of a Star of David that is barbed and set like a bear trap. ">
      <p class="citation">Dave Bowers</p>
      <!--                Article 3 end-->

      <!--                Article 4 begin-->
      <div class="hline-light-vspace"></div>
      <div>
        <p>MARGARET RENKL</p>
        <h2>The N.E.H. Does What Republicans Always Wanted. DOGE Slashed It Anyway.</h2>
      </div>
      <!--                Article 4 end-->
      <!--                Opinion section end-->
    </div>
    <!--            Editorial end-->
  </section>
</main>

<!-- Separated footer for cleaner main -->
<Footer />

<!-- import online resource (for search logo and chevron logo) -->
<style>
  @import "https://www.w3schools.com/w3css/5/w3.css";
  @import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
</style>