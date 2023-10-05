import requests
from bs4 import BeautifulSoup
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/scrape", methods=["GET"])
def scrape_subreddit():
    subreddit_url = "https://www.reddit.com/r/geegees/"
    
    response = requests.get(subreddit_url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, "html.parser")
        post_titles = [title.text for title in soup.find_all("h3")]
        return jsonify({"titles": post_titles})
    else:
        return jsonify({"error": f"Failed to retrieve data. Status code: {response.status_code}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
