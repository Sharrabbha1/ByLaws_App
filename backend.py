from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
from rapidfuzz.fuzz import ratio
from collections import Counter

app = Flask(__name__)
CORS(app)  # Enable CORS

# Load JSON files
def load_json_files(folder_path):
    data = []
    for file_name in os.listdir(folder_path):
        if file_name.endswith(".json"):
            file_path = os.path.join(folder_path, file_name)
            with open(file_path, 'r', encoding='utf-8') as file:
                try:
                    data.extend(json.load(file))
                except json.JSONDecodeError:
                    print(f"Error reading {file_name}. Skipping.")
    return data

data_folder = "data"  # Adjust to match your folder structure
data = load_json_files(data_folder)

# Fuzzy search function
def fuzzy_search(data, search_keywords, threshold=50):
    results = []
    for entry in data:
        relevance = 0
        for keyword in search_keywords:
            title_similarity = ratio(keyword.lower(), entry.get('title', '').lower())
            if title_similarity >= threshold:
                relevance += title_similarity * 1.5

            for entry_keyword in entry.get('keywords', []):
                keyword_similarity = ratio(keyword.lower(), entry_keyword.lower())
                if keyword_similarity >= threshold:
                    relevance += keyword_similarity
        if relevance > 0:
            results.append((entry, relevance))
    results.sort(key=lambda x: -x[1])
    return results

@app.route("/")
def home():
    return "Backend is running! Use the /search endpoint to search for violations."

@app.route("/search", methods=["POST"])
def search():
    try:
        request_data = request.get_json()
        search_query = request_data.get("query", "")
        search_keywords = search_query.split()

        results = fuzzy_search(data, search_keywords)
        return jsonify([entry[0] for entry in results[:5]])  # Return top 5 matches
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
