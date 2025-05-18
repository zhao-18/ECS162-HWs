from flask import Flask, jsonify, send_from_directory, request, session, redirect
import os
from flask_cors import CORS
import requests
from pymongo import MongoClient
from bson.objectid import ObjectId
from datetime import datetime, timezone

static_path = os.getenv('STATIC_PATH','static')
template_path = os.getenv('TEMPLATE_PATH','templates')
# Mongo connection
mongo_uri = os.getenv("MONGO_URI")
mongo = MongoClient(mongo_uri)
db = mongo.get_default_database()

app = Flask(__name__, static_folder="static", template_folder="templates")
CORS(app)

app.secret_key = os.getenv("FLASK_SECRET_KEY", "secret-dev-key")

# The code down below should give us the info from the user. It checks if a user is already logged in by looking for their data.
# If the user is found in the session, then it will set the user's name, email, and moderator status.
# We needed to read up on dex documentation and the links from the lab.
# Dex: https://dexidp.io/docs/ 
# MongoDB in a Flask Application: https://www.digitalocean.com/community/tutorials/how-to-use-mongodb-in-a-flask-application 
# Sending Data from a Flask app to MongoDB Database: https://www.geeksforgeeks.org/sending-data-from-a-flask-app-to-mongodb-database/ 
# Flask documentation: https://flask.palletsprojects.com/en/stable/ 

@app.before_request
def user():
    if "user" in session:
        request.user = session["user"]
    else:
        request.user = {
            "name": "Guest",
            "email": "guest@ucdavis.edu",
            "moderator": False
        }

# The code down below is a route that is called after the user logs in through Dex.
# The code should work by getting the user's name, email, and moderator status from the headers.
# Then it stores that information in the Flask session so that is is saved. Then it will go back to the homepage and showed that the user is logged in. 

@app.route("/authorize")
def authorize():
    user = {
        "name": request.headers.get("X-User-Name", "Guest"),
        "email": request.headers.get("X-User-Email", "guest@ucdavis.edu"),
        "moderator": request.headers.get("X-User-Is-Moderator", "false") == "true"
    }
    session["user"] = user
    return redirect("/http://localhost:5173/")

# The code down below is a route that is used when the user wants to logout. 
# The code works by clearing out the session data, and then going back to the homepage.

@app.route("/logout")
def logout():
    session.clear()
    return redirect("http://localhost:5173/")

# The code down below is a route that the frontend can use to help identify the user's info, email, and moderator role.

@app.route("/api/me")
def get_me():
    return jsonify(request.user)

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
    response = requests.get(url, params=params)
    response.raise_for_status()
    return jsonify(response.json())

@app.route('/')
@app.route('/<path:path>')
def serve_frontend(path=''):
    if path != '' and os.path.exists(os.path.join(static_path,path)):
        return send_from_directory(static_path, path)
    return send_from_directory(template_path, 'index.html')

@app.route('/login')
def login_frontend():
    return send_from_directory(template_path, 'login.html')

# This code will end up getting all comments for the article. 
# In order to understand MongoDB better we read up on the documentation given during lab.
# MongoDB in a Flask Application: https://www.digitalocean.com/community/tutorials/how-to-use-mongodb-in-a-flask-application 
# Sending Data from a Flask app to MongoDB Database: https://www.geeksforgeeks.org/sending-data-from-a-flask-app-to-mongodb-database/ 

@app.route("/api/comments", methods=["GET"])
def get_comments():
    article_id = request.args.get("article_id")
    comments = list(db.comments.find({"article_id": article_id}))
    for i in comments:
        i["_id"] = str(i["_id"])
    return jsonify(comments)

# This code will allow the frontend to get a saved article from the MongoDB. This will be helpful for linking comments to articles. 
# In order to understand MongoDB better we read up on the documentation given during lab.
# MongoDB in a Flask Application: https://www.digitalocean.com/community/tutorials/how-to-use-mongodb-in-a-flask-application 
# Sending Data from a Flask app to MongoDB Database: https://www.geeksforgeeks.org/sending-data-from-a-flask-app-to-mongodb-database/ 

@app.route("/api/articles/<path:article_id>", methods=["GET"])
def get_article(article_id):
    print(article_id)
    article = db.articles.find_one({"_id": article_id})
    if article:
        article["_id"] = str(article["_id"])
        return jsonify(article)
    return jsonify([])

# This code will allow a new comment or a new reply to the database. 
# The database will have the id of the article, content of the comment, email, timestamp, and moderated comment.
# In order to understand MongoDB better we read up on the documentation given during lab.
# MongoDB in a Flask Application: https://www.digitalocean.com/community/tutorials/how-to-use-mongodb-in-a-flask-application 
# Sending Data from a Flask app to MongoDB Database: https://www.geeksforgeeks.org/sending-data-from-a-flask-app-to-mongodb-database/  

@app.route("/api/comments", methods=["POST"])
def post_comment():
    data = request.get_json()
    comment = {
        "article_id": data["article_id"],
        "user": request.user["email"],
        "text": data["text"],
        "parent_id": data.get("parent_id", "root"),
        "created_at": datetime.now(timezone.utc),
        "moderated": False
    }
    result = db.comments.insert_one(comment)
    comment["_id"] = str(result.inserted_id)
    return jsonify(comment), 201

# This code will allow the moderator to delete a comment which should only be accessible by the moderators.
# The code works by checking if the current user is a moderator, then updates the comment and returns message.
# In order to understand MongoDB better we read up on the documentation given during lab.
# MongoDB in a Flask Application: https://www.digitalocean.com/community/tutorials/how-to-use-mongodb-in-a-flask-application 
# Sending Data from a Flask app to MongoDB Database: https://www.geeksforgeeks.org/sending-data-from-a-flask-app-to-mongodb-database/ 

@app.route("/api/comments/<comment_id>/moderater", methods=["POST"])
def moderater_comment(comment_id):
    if not request.user["moderator"]:
        return jsonify({"error": "Unauthorized/Not Moderator"}), 400
    
    db.comments.update_one(
        {"_id": ObjectId(comment_id)},
        {"$set": {"text": "COMMENT REMOVED BY MODERATOR!", "moderated": True}}
    )
    return jsonify({"message": "Comment deleted"}), 200

# The code will save an article to MongoDB. 
# The code works by checking if there is an article url then builds the main componenets that we want to store in the database such as id, title, summary, url, author, and timestamp.
# In order to understand MongoDB better we read up on the documentation given during lab.
# MongoDB in a Flask Application: https://www.digitalocean.com/community/tutorials/how-to-use-mongodb-in-a-flask-application 
# Sending Data from a Flask app to MongoDB Database: https://www.geeksforgeeks.org/sending-data-from-a-flask-app-to-mongodb-database/ 

@app.route("/api/articles", methods=["POST"])
def save_article():
    data = request.get_json()
    if not data or "url" not in data:
        return jsonify({"error": "Missing article URL"}), 400

    article = {
        "_id": data.get("_id") or data["url"],
        "headline": data.get("headline"),
        "abstract": data.get("abstract"),
        "url": data["url"],
        "byline": data.get("byline"),
        "stored_at": datetime.now(timezone.utc)
    }

    db.articles.replace_one({"_id": article["_id"]}, article, upsert=True)
    return jsonify({"message": "Article saved"}), 200

@app.route("/test-mongo")
def test_mongo():
    return jsonify({"collections": db.list_collection_names()})

if __name__ == '__main__':
    debug_mode = os.getenv('FLASK_ENV') != 'production'
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 8000)),debug=debug_mode)
