import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import sys
import json

# Load the preprocessed dataset
excel_path = 'D:/fyp/fyp project/quran-semantic-search/Final_year_project/src/backend/Dataset-Verse-by-Verse.xlsx'
quran_data = pd.read_excel(excel_path)

# Ensure 'SrNo' is clean and can be safely converted to integers
quran_data = quran_data[pd.to_numeric(quran_data['SrNo'], errors='coerce').notna()]
quran_data['SrNo'] = quran_data['SrNo'].astype(int)

def initialize_vectorizer(ngram_type):
    """Initialize TfidfVectorizer for unigram or bigram."""
    if ngram_type == 'bigram':
        return TfidfVectorizer(ngram_range=(2, 2), stop_words='english')
    else:
        return TfidfVectorizer(ngram_range=(1, 1), stop_words='english')

def search(query, ngram_type='unigram'):
    # Initialize TfidfVectorizer
    vectorizer = initialize_vectorizer(ngram_type)
    tfidf_matrix = vectorizer.fit_transform(quran_data['EnglishTranslation'])
    
    # Transform the query into a vector
    query_vector = vectorizer.transform([query])
    
    # Calculate cosine similarities
    cosine_similarities = cosine_similarity(query_vector, tfidf_matrix).flatten()
    
    # Set a threshold for valid similarity scores
    threshold = 0.1
    top_sim_indices = cosine_similarities.argsort()[-5:][::-1]  # Top 3 results in descending order
    
    # Check if all results have very low similarity scores
    if all(cosine_similarities[idx] < threshold for idx in top_sim_indices):
        return {"error": "No results found. Please try a different query."}

    results = []
    for idx in top_sim_indices:
        if cosine_similarities[idx] >= threshold:  # Only include results that pass the threshold
            try:
                results.append({
                    "SrNo": int(quran_data['SrNo'].iloc[idx]),
                    "Translation": quran_data['EnglishTranslation'].iloc[idx],
                    "Original Arabic Text": quran_data['OrignalArabicText'].iloc[idx],
                    "SurahNameArabic": quran_data['SurahNameArabic'].iloc[idx],
                    "OriginalEnglishTranslation": quran_data['OriginalEnglishTranslation'].iloc[idx],
                    "Similarity Score": float(cosine_similarities[idx])
                })
            except ValueError:
                continue

    # Return results as JSON
    return results

if __name__ == '__main__':
    if len(sys.argv) > 2:
        query = sys.argv[1]
        ngram_type = sys.argv[2]
        # Perform search and output JSON
        results = search(query, ngram_type)
        if "error" in results:
            print(json.dumps({"error": results["error"]}))  # Output error message in JSON format
        else:
            print(json.dumps(results))  # Output results in JSON format
    else:
        print(json.dumps({"error": "Please provide both a search query and ngram type."}))
