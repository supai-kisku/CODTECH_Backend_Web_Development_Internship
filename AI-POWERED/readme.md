Intern ID:CTIS05S19

TASK- 4  AI-POWERED
RECOMMENDATION
ENGINE : Machine Learning — Content-Based Recommendation Engine
📝 Project Overview
This project addresses the challenge of item discovery by implementing a Content-Based Recommendation Engine exposed via a high-performance REST API. Utilizing textual metadata processing, the pipeline vectors dataset features, calculates multi-dimensional item similarity matrices, and serves real-time, weighted recommendations based on structural content profiles.

⚙️ Core Architecture & Concepts
TF-IDF Vectorization: Textual metadata (genres) is tokenized and transformed into a normalized Term Frequency-Inverse Document Frequency matrix, quantifying feature importance.

Cosine Similarity Matching: Computes the angular cosine distance between vector spaces to isolate and rank the closest geometric neighbors for a target item.

Asynchronous API Routing: Leverages FastAPI to expose clean end-points for immediate model inference and real-time recommendation delivery.

🛠️ Technical Stack
Web Framework: FastAPI, Uvicorn

Machine Learning Engine: Scikit-Learn (TfidfVectorizer, cosine_similarity)

Data Processing: Pandas