# Step 1: Install necessary libraries
import pandas as pd
import numpy as np
import nltk
from nltk.corpus import wordnet as wn
from gensim.models import Word2Vec
from sklearn.metrics.pairwise import cosine_similarity
import sys
import json

# Download necessary NLTK data (run this once)
nltk.download('wordnet')
nltk.download('omw-1.4')

# Step 2: Load the Quranic dataset
dataset_path = 'Dataset-Verse-by-Verse.xlsx'  # Replace with your correct dataset path
try:
    df = pd.read_excel(dataset_path)
    print(f"Loaded dataset with {len(df)} verses", file=sys.stderr)
except FileNotFoundError:
    print(json.dumps({"error": "Dataset not found. Please check the file path."}))
    sys.exit(1)

# Data cleaning: Drop rows with missing or invalid 'SrNo'
df = df.dropna(subset=['SrNo', 'EnglishTranslation', 'OrignalArabicText'])
df['SrNo'] = df['SrNo'].astype(int, errors='ignore')

# Step 3: Prepare text data for Word2Vec training
df['tokenized'] = df['EnglishTranslation'].apply(lambda x: x.lower().split())

# Step 4: Train a Word2Vec model on the dataset
model = Word2Vec(sentences=df['tokenized'], vector_size=100, window=5, min_count=1, workers=4)
print("Word2Vec model trained.", file=sys.stderr)

# Step 5: Stopwords list (add more as needed)
stopwords = set(["of", "and", "the", "in", "on", "with", "a", "an", "is", "it", "for" ,"from"])

# Function to expand the query using WordNet synonyms
def get_wordnet_synonyms(query, max_synonyms=5):
    if not query.strip():
        return {"error": "Empty query provided. Please enter a valid query."}

    words = query.lower().split()
    expanded_query = set()

    for word in words:
        if word in stopwords:  # Skip stopwords
            expanded_query.add(word)
            continue

        synsets = wn.synsets(word)
        if not synsets:
            return {"error": f"No WordNet synonyms found for the word: '{word}'."}

        for synset in synsets:
            for lemma in synset.lemmas()[:max_synonyms]:
                synonym = lemma.name().lower()
                if synonym.isalpha() and synonym not in expanded_query:
                    expanded_query.add(synonym)

    return expanded_query

# Step 6: Get embeddings for the expanded query and normalize them
def get_average_embedding(words, model):
    valid_words = [word for word in words if word in model.wv]
    if valid_words:
        embedding = np.mean([model.wv[word] for word in valid_words], axis=0)
        return embedding / np.linalg.norm(embedding)
    else:
        return None  # Return None if no valid words are found

# Step 7: Define the search function with error handling and similarity score threshold
def wordnet_vector_search(query, top_n=5, similarity_threshold=0.8):
    expanded_query = get_wordnet_synonyms(query)
    
    if isinstance(expanded_query, dict) and "error" in expanded_query:
        return expanded_query  # Return error if query expansion failed

    print(f"Expanded query: {expanded_query}", file=sys.stderr)

    query_embedding = get_average_embedding(expanded_query, model)
    if query_embedding is None:
        return {"error": "No valid words found in the query to compute embeddings."}

    results = []

    for index, row in df.iterrows():
        verse_words = set(row['tokenized'])
        verse_embedding = get_average_embedding(verse_words, model)

        if verse_embedding is not None:
            similarity = cosine_similarity([query_embedding], [verse_embedding])[0][0]

            if similarity > similarity_threshold:
                results.append({
                    "SrNo": row['SrNo'],
                    "SurahNameArabic": row['SurahNameArabic'],
                    "Translation": row['EnglishTranslation'],
                    "Original Arabic Text": row['OrignalArabicText'],
                    "OriginalEnglishTranslation": row['OriginalEnglishTranslation'],
                    "Similarity Score": float(similarity)  # Convert to a standard Python float
                })

    if not results:
        return {"error": "No results found matching the similarity threshold."}

    results = sorted(results, key=lambda x: x['Similarity Score'], reverse=True)
    return results[:top_n]

# Step 8: Main execution for running via command line or API
if __name__ == '__main__':
    if len(sys.argv) > 1:
        query = sys.argv[1]  # Get the query from the command line arguments
        try:
            top_n = 8
            similarity_threshold = 0.8
            results = wordnet_vector_search(query, top_n=top_n, similarity_threshold=similarity_threshold)
            print(json.dumps(results))
        except Exception as e:
            print(json.dumps({"error": str(e)}))
    else:
        print(json.dumps({"error": "Please provide a search query."}))
