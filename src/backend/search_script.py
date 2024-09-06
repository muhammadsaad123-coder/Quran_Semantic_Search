import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import sys
import json

# Load the preprocessed dataset (make sure your preprocessed data is saved as an Excel file)
excel_path = 'D:/fyp/fyp project/quran-semantic-search/Final_year_project/src/backend/Dataset-Verse-by-Verse.xlsx'
quran_data = pd.read_excel(excel_path)

# Ensure 'SrNo' is clean and can be safely converted to integers
# Remove rows with invalid or non-numeric 'SrNo'
quran_data = quran_data[pd.to_numeric(quran_data['SrNo'], errors='coerce').notna()]
quran_data['SrNo'] = quran_data['SrNo'].astype(int)

def initialize_vectorizer(ngram_type):
    """Initialize TfidfVectorizer for unigram or bigram."""
    if ngram_type == 'bigram':
        # Initialize vectorizer for bigrams (2-word combinations)
        return TfidfVectorizer(ngram_range=(2, 2), stop_words='english')
    else:
        # Default to unigrams (single words)
        return TfidfVectorizer(ngram_range=(1, 1), stop_words='english')

def search(query, ngram_type='unigram'):
    # Initialize TfidfVectorizer for unigram or bigram based on ngram_type
    vectorizer = initialize_vectorizer(ngram_type)
    
    # Fit the vectorizer to the preprocessed EnglishTranslation column
    tfidf_matrix = vectorizer.fit_transform(quran_data['EnglishTranslation'])
    
    # Transform the query into a vector
    query_vector = vectorizer.transform([query])
    
    # Calculate cosine similarities between the query and the dataset
    cosine_similarities = cosine_similarity(query_vector, tfidf_matrix).flatten()
    
    # Get the top 3 most similar results
    top_sim_indices = cosine_similarities.argsort()[-3:][::-1]  # Get indices of top 3 results
    
    # Collect the results
    results = []
    for idx in top_sim_indices:
        try:
            # Safely convert SrNo to an integer (it is already ensured as int but we add this for robustness)
            results.append({
                "srNo": int(quran_data['SrNo'].iloc[idx]),
                "translation": quran_data['EnglishTranslation'].iloc[idx],
                "originalArabicText": quran_data['OrignalArabicText'].iloc[idx],
                "similarityScore": cosine_similarities[idx]
            })
        except ValueError:
            # Skip rows with invalid 'SrNo'
            print(f"Skipping invalid SrNo at index {idx}")
            continue
    
    return results

if __name__ == '__main__':
    if len(sys.argv) > 2:
        query = sys.argv[1]           # User's query as input
        ngram_type = sys.argv[2]      # 'unigram' or 'bigram'
        
        # Perform the search and print results
        results = search(query, ngram_type)
        print(json.dumps(results, indent=2))  # Prettified JSON output
    
    else:
        print("Please provide both a search query and ngram type (unigram or bigram).")
