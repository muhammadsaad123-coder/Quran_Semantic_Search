import sys
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import json

# Load data from the specified path
df = pd.read_excel('/src/backend/100 lines.xlsx')

# Initialize TfidfVectorizer
vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(df['EnglishTranslation'])

def search(query):
    query_vector = vectorizer.transform([query])
    cosine_similarities = cosine_similarity(query_vector, tfidf_matrix).flatten()
    top_sim_indices = cosine_similarities.argsort()[-3:][::-1]

    results = []
    for idx in top_sim_indices:
        results.append({
            "srNo": int(df['SrNo'].iloc[idx]),
            "translation": df['EnglishTranslation'].iloc[idx],
            "similarityScore": cosine_similarities[idx]
        })

    return results

if __name__ == '__main__':
    query = sys.argv[1]
    results = search(query)
    print(json.dumps(results))
