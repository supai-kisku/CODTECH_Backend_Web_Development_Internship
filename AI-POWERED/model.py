import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

class RecommendationEngine:
    def __init__(self, dataset_path):
        self.df = pd.read_csv(dataset_path)

        tfidf = TfidfVectorizer()
        tfidf_matrix = tfidf.fit_transform(self.df["genre"])

        self.similarity = cosine_similarity(tfidf_matrix)

    def recommend(self, title, top_n=5):
        title = title.lower()

        matches = self.df[
            self.df["title"].str.lower() == title
        ]

        if matches.empty:
            return []

        idx = matches.index[0]

        scores = list(enumerate(self.similarity[idx]))

        scores = sorted(
            scores,
            key=lambda x: x[1],
            reverse=True
        )

        recommendations = []

        for i, score in scores[1:top_n+1]:
            recommendations.append({
                "id": int(self.df.iloc[i]["id"]),
                "title": self.df.iloc[i]["title"],
                "genre": self.df.iloc[i]["genre"],
                "score": float(score)
            })

        return recommendations