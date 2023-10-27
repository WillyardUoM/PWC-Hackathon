from flask import Flask, request
from flask_cors import CORS
import pickle
from pathlib import Path
import numpy as np
import pandas as pd

HERE = Path(__file__).parent

app = Flask(__name__)

CORS(app)


@app.route("/predict")
def predict():
  prompt = request.args.get('prompt')
  columns_to_read = [
    "Work Experience",
    "Technical Skills",
    "Soft Skills",
    "Projects Completed",
    "Interests and Passions",
    "Position", "Career Aspirations",
    "Courses Completed", 
    "Learning Paths (with Ratings)"
  ]

# Read only the specified columns from the CSV file into a pandas DataFrame
  data = pd.read_csv(HERE/ 'dataset.csv', usecols=columns_to_read)

  # Concatenate the specified columns into a new column
# Convert all values to strings before concatenation
  user_profile = data.apply(lambda row: ' '.join([str(i) for i in row]), axis=1)


  from sklearn.metrics.pairwise import cosine_similarity

  from sklearn.feature_extraction.text import TfidfVectorizer
  vectorizer = TfidfVectorizer(ngram_range=(1,2))

  tfidf = vectorizer.fit_transform(user_profile)

  title = prompt
  query_vec = vectorizer.transform([title])
  similarity = cosine_similarity(query_vec, tfidf).flatten()
  indices = np.argpartition(similarity, -5)[-5:]
  results = data.iloc[indices].iloc[0]
  return results["Learning Paths (with Ratings)"]


if __name__ =="__main__":
  app.run(host='127.0.0.1', port=5000)



