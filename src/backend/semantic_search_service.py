# semantic_search_service.py
import pandas as pd
import numpy as np
import faiss
from sentence_transformers import SentenceTransformer
from flask import Flask, request, jsonify

# Step 1: Load the Quranic dataset and embeddings
dataset_path = 'Dataset-Verse-by-Verse.xlsx'  # Make sure this file is in the same directory
embeddings_path = 'verse_embeddings.npy'  # Path to the precomputed embeddings
faiss_index_path = 'quran_verse_faiss.index'  # Path to the FAISS index

# Load the dataset
df = pd.read_excel(dataset_path)

# Load precomputed embeddings and FAISS index
embeddings = np.load(embeddings_path)
index = faiss.read_index(faiss_index_path)

# Load the Sentence Transformer model
model = SentenceTransformer('paraphrase-MiniLM-L6-v2')

# Create a Flask application
app = Flask(__name__)

@app.route('/semantic-search', methods=['POST'])
def semantic_search():
    data = request.json
    query = data.get('query', '')
    top_n = data.get('top_n', 3)

    if not query:
        return jsonify({"error": "Query is required"}), 400

    # Generate the query embedding
    query_embedding = model.encode([query]).astype('float32')

    # Perform the search in the FAISS index
    distances, indices = index.search(query_embedding, top_n)

    # Retrieve results
    results = []
    for idx, distance in zip(indices[0], distances[0]):
        similarity_score = float(1 / (1 + distance))  # Normalize similarity score between 0 and 1
        results.append({
            "SrNo": int(df['SrNo'].iloc[idx]),
            "Translation": df['EnglishTranslation'].iloc[idx],
            "Original Arabic Text": df['OrignalArabicText'].iloc[idx],
            "Similarity Score": similarity_score
        })

    return jsonify(results)

@app.route('/keyword-search', methods=['POST'])
def keyword_search():
    # Placeholder for keyword search implementation
    return jsonify({"message": "Keyword search is not implemented in this service"}), 501

# Run the Flask app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
