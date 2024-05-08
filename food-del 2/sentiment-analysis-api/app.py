from flask import Flask, request, jsonify
import joblib
import re

app = Flask(__name__)

# Load the model and vectorizer
model = joblib.load('Model.pkl')  
vectorizer = joblib.load('cv_Model.pkl')  

def clean_text(text):
    """Preprocess text for sentiment analysis model."""
    # Remove HTML tags
    text = re.sub(r'<.*?>', ' ', text)
    # Replace contractions
    text = re.sub(r"can't", 'cannot', text)
    text = re.sub(r"don't", 'do not', text)
    text = re.sub(r"didn't", 'did not', text)
    # Replace phone numbers with 'mobno'
    text = re.sub(r'[\d-]{10,12}', 'mobno', text)
    # Remove punctuation and numbers
    text = re.sub(r'[^A-Za-z]', ' ', text)
    # Remove extra spaces
    text = re.sub(r'\s+', ' ', text)
    # Convert to lower case
    return text.lower()

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    message = data.get('message', '')

    if not message:
        return jsonify({'error': 'No message provided'}), 400

    # Clean and vectorize the message
    cleaned_message = clean_text(message)
    vectorized_message = vectorizer.transform([cleaned_message])

    # Predict sentiment
    sentiment = model.predict(vectorized_message)[0]
    sentiment = int(sentiment)  # Convert numpy int64 to Python int if necessary

    return jsonify({'sentiment': sentiment})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
