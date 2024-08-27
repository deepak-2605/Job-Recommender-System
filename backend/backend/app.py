from flask import Flask, request, jsonify
import job_recommender.job_recommender  # Import your job recommender logic

app = Flask(__name__)

@app.route('/recommend', methods=['POST'])
def recommend_jobs():
    # Parse the incoming JSON request
    data = request.json
    
    # Extract the file path or text of the resume from the request
    file_path = data.get('file_path')
    
    # You can call the recommendation function from your job recommender script here
    recommendations = job_recommender.get_recommendations(file_path)  # Adjust this function name according to your implementation

    # Return the recommendations as a JSON response
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(debug=True)
