from flask import Flask
from flask_cors import CORS
from flask import Flask, request, jsonify
from job_recommender import job_recommender

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)


@app.route('/recommend', methods=['POST'])
def recommend_jobs():
    # Parse the incoming JSON request
    # data = request.json
    print("request ",request.files)
    file = request.files['resume']
    print(file)
    file_path = 'temp_resume.pdf'
    file.save(file_path)
    
    # You can call the recommendation function from your job recommender script here
    recommendations = job_recommender.getRecommendations(file_path)  # Adjust this function name according to your implementation

    # Return the recommendations as a JSON response
    return jsonify(recommendations)
    # return jsonify("HELLO")

if __name__ == '__main__':
    app.run(debug=True)
