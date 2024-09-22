import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from transformers import BertTokenizer, BertModel
import torch
import sys
import json

# Load the pre-trained BERT model and tokenizer
print("Loading BERT model and tokenizer...", file=sys.stderr)
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertModel.from_pretrained('bert-base-uncased')

# Load the dataset
dataset_path = 'D:/fyp/fyp project/quran-semantic-search/Final_year_project/src/backend/Dataset-Semantic.xlsx'
try:
    print(f"Loading dataset from {dataset_path}...", file=sys.stderr)
    df = pd.read_excel(dataset_path)
    print(f"Dataset loaded. Number of records: {len(df)}", file=sys.stderr)
except Exception as e:
    print(f"Error loading dataset: {str(e)}", file=sys.stderr)
    sys.exit(1)

def embed_text(text):
    """Generate embeddings for the input text using BERT."""
    try:
        print(f"Embedding text: {text[:50]}...", file=sys.stderr)  # Log to stderr
        inputs = tokenizer(text, return_tensors='pt', truncation=True, padding=True, max_length=128)
        with torch.no_grad():
            outputs = model(**inputs)
        return outputs.last_hidden_state.mean(dim=1).numpy()
    except Exception as e:
        print(f"Error embedding text: {str(e)}", file=sys.stderr)
        return None

def search(query):
    """Perform the semantic search by embedding the query and calculating cosine similarity."""
    print(f"Searching for query: {query}", file=sys.stderr)
    query_embedding = embed_text(query)
    if query_embedding is None:
        print("Failed to embed query", file=sys.stderr)
        return []

    try:
        # Embed only the first 10 verses for debugging
        embeddings = [embed_text(text) for text in df['EnglishTranslation']]
        print("Embeddings generated, calculating cosine similarities...", file=sys.stderr)

        valid_embeddings = [emb for emb in embeddings if emb is not None]
        if len(valid_embeddings) == 0:
            print("No valid embeddings found.", file=sys.stderr)
            return []

        cosine_similarities = [cosine_similarity(query_embedding, emb).flatten()[0] for emb in valid_embeddings]
        print("Cosine similarities calculated.", file=sys.stderr)

        # Return top results
        top_sim_indices = sorted(range(len(cosine_similarities)), key=lambda i: cosine_similarities[i], reverse=True)[:3]
        results = []
        for idx in top_sim_indices:
            results.append({
                "SrNo": int(df['SrNo'].iloc[idx]),
                "Translation": df['EnglishTranslation'].iloc[idx],
                "Original Arabic Text": df['OrignalArabicText'].iloc[idx],
                "Similarity Score": float(cosine_similarities[idx])
            })
        return results
    except Exception as e:
        print(f"Error during search: {str(e)}", file=sys.stderr)
        return []

if __name__ == '__main__':
    if len(sys.argv) > 1:
        query = sys.argv[1]
        results = search(query)
        print(json.dumps(results))  # Ensure only JSON is printed to stdout
    else:
        print("Please provide a search query.", file=sys.stderr)
