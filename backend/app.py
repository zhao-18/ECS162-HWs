from flask import Flask, jsonify, send_from_directory, request
import os
from flask_cors import CORS
import requests

app = Flask(__name__, static_folder="static", template_folder="templates")
CORS(app)

@app.route("/api/key")
def get_key():
    return jsonify({"apiKey": os.getenv("NYT_API_KEY")})

# We created this so that the frontend never sees our NYT_API_KEY. In theory if sucessful, the code should give the NYT JSON back to the browser.  
# The code fetches Davis/Sacramento articles that are from latest to oldest.
# In order to understand Flask better, we read up on the Flask documentation. https://flask.palletsprojects.com/en/stable/ 
 
@app.route("/api/news")
def get_news():
    query = request.args.get("q", '"UC Davis" "Sacramento"')
    url = "https://api.nytimes.com/svc/search/v2/articlesearch.json"
    params = {"q": query, "api-key": os.getenv("NYT_API_KEY")}
    responce = requests.get(url, params=params)
    responce.raise_for_status()
    return jsonify(responce.json())

@app.route("/")
@app.route("/<path:path>")
def serve_frontend(path=""):
    if path != "" and os.path.exists(f"static/{path}"):
        return send_from_directory("static", path)
    return send_from_directory("templates", "index.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 8000)))