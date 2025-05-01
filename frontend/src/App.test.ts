import { test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import App from './App.svelte';
import Header from './Header.svelte';
/*
In order to understand how to write the tests, first we looked at the lab slides, then we had to do some reading from svelte testing documentation and npm documentation. We also read up on documentation in NYT's response fields to help make tests on articles.
Here are the links of the documentation that we used. The tests were succesfully ran on our machines. Check test_proof for screenshots on the passing tests.
https://docs.npmjs.com/downloading-and-installing-node-js-and-npm - Node and npm documentation 
https://svelte.dev/docs/svelte/testing - Svelte testing documentation
https://svelte.dev/tutorial/svelte/welcome-to-svelte - Intro Svelte code documentation
https://canvas.ucdavis.edu/courses/993295/files/folder/Lab%20Materials/week%205? - Week 5 Lab Slides
https://developer.nytimes.com/docs/articlesearch-product/1/overview#response-fields - NYT's API Response Fields
*/

// The code down below is to return a fake API key and return a fake article so that we do not need to get the backend. 
// The fake article has components such as the word_count, multimedia from real different articles however the headline and abstract are fake and tested in the code. 
vi.stubGlobal("fetch", vi.fn((url) => {
    if (url === "/api/key") {
        return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                apiKey: "fake-key"
            }),
        });
    }
    if (url === "/api/news") {
        return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                response: {
                    docs: [
                        {
                            abstract: "Fake article about UC Davis and Sacramento",
                            headline: {main: "UC Davis and Sacramento Club"},
                            word_count: "500",
                            byline: {original: "By Navjeet Hundal"},
                            multimedia: {
                                default: {
                                    "url": "https://static01.nyt.com/images/2023/05/04/multimedia/04nat-davis-arrest-01-bktg/04nat-davis-arrest-01-bktg-articleLarge.jpg",
                                    "height": 399,
                                    "width": 600
                                },
                            },
                        },
                    ],
                },
            }),
        });
    }
    return
}));

// This test is from the week 5 lab slides, where we were told to copy this code into our App.test.ts. 
test('App', async () => {
    render(App);
})

// This test is to test out if today's date is displayed in the Header and in the right format. It searchs the text to find the formatted date on the page.
test('todays date', () => {
    render(Header);
    const expectedDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
    });

    const date = screen.getAllByText(expectedDate);
    expect(date.length).toBeGreaterThan(0);
});

// This test is to test out if fake articles can be displayed in the UI. We utilize the fake article created above. 
// The way the code works is that we render the app, then we wait until the fake article headline appears in the DOM. 
// Then we check that it exists. Then we find the article’s abstract using a regular expression match. Then we check if that exists as well.
test('fake content', async () => {
    render(App);
    const headline = await screen.findByText("UC Davis and Sacramento Club")
    expect(headline).not.toBeNull();
    const abstract = screen.getByText(/Fake article about UC Davis and Sacramento/);
    expect(abstract).not.toBeNull();
});