import pytest
from app import app as create_app

# In order to understand how to write the tests, first we looked at the lab slides, then we had to do some reading from pytest documentation and flask documentation. We also read up on documentation in NYT's response fields to help make tests on articles.
# Here are the links of the documentation that we used. 
# https://docs.pytest.org/en/stable/example/simple.html - Pytest documentation
# https://flask.palletsprojects.com/en/latest/testing/#the-test-client - Flask documentation
# https://canvas.ucdavis.edu/courses/993295/files/folder/Lab%20Materials/week%205? - Week 5 Lab Slides
# https://developer.nytimes.com/docs/articlesearch-product/1/overview#response-fields - NYT's API Response Fields

# This is the test client.
@pytest.fixture
def client():
    create_app.config["TESTING"] = True
    with create_app.test_client() as client:
        yield client

# The code down below is to test the API key. Specifically it is to make sure that the API key is returned.
# How the code works is that response sends a get request to the /api/key route. Then the server replies with code 200 which means everything is going ok.
# Next, we convert the JSON response into Python and check if the "data" has the apiKey in it. After we have found the apiKey we check to see that it is a string. 
# Finally, we make sure that the key is real by checking its length, if greater than 25 we deem the key to be real. We chose 25 for the length as the key we used for this project was roughly 30 characters long so a key must be somewhat similar length.
def test_api_key(client):
    response = client.get("/api/key")
    assert response.status_code == 200
    data = response.get_json()
    assert "apiKey" in data
    assert isinstance(data["apiKey"], str)
    assert len(data["apiKey"]) > 25

# The code down below is to test /api/news route and structure and content. Specifically it is to check if it returns articles and that the article contains either "UC Davis" or "Sacramento".
# How the code works is that response sends a get request to the /api/news route. Then the server replies with code 200 which means everything is going ok.
# Next, we convert the JSON response into Python. According to the NYT API Response Field, the docs is the list of article results so we end up checking that. 
# Finally, if there are articles which there should be then we go through each article to check if there is "UC Davis" or "Sacramento" in the article.
def test_news_content(client):
    response = client.get("/api/news")
    assert response.status_code == 200
    data = response.get_json()
    assert "response" in data
    assert "docs" in data["response"]
    articles = data["response"]["docs"]
    assert isinstance(articles,list)
    
    if not articles:
        pytest.skip("Zero articles returned")
        
    for content in articles:
        abstract = (content.get("abstract")).lower()
        if "uc davis" in abstract or "sacramento" in abstract:
            return 
    assert False, "No UC Davis or Sacramento in the articles"
        
        
    

