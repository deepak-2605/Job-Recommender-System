import os
from flask import Flask
from flask_cors import CORS
from flask import request, jsonify
from job_recommender import job_recommender

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

@app.route('/recommend', methods=['POST'])
def recommend_jobs():
    # Parse the incoming JSON request
    file = request.files['resume']
    file_path = 'temp_resume.pdf'
    file.save(file_path)
    
    # Call the recommendation function from your job recommender script
    recommendations = job_recommender.getRecommendations(file_path)

    # Return the recommendations as a JSON response
    return jsonify(recommendations)
 
if __name__ == '__main__':
    port = int(os.getenv("PORT", 5000))  # Default to port 5000 if PORT is not set
    app.run(debug=True, port=port)
