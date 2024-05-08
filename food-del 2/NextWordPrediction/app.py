from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from keras.models import load_model
from keras.preprocessing.sequence import pad_sequences
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS = CORS(app)

# Load the model and tokenizer
model = load_model('model.h5')
tokenizer = joblib.load('tokenizer.pkl')  # Assuming the tokenizer is saved as 'tokenizer.pkl'
max_sequence_len = 30  # Set this to the same value used during training

def prepare_text(text):
    """Preprocess and tokenize text for next-word prediction."""
    sequence = tokenizer.texts_to_sequences([text])[0]
    padded = pad_sequences([sequence], maxlen=max_sequence_len-1, padding='pre')
    return padded

@app.route('/predict-next', methods=['POST'])
def predict_next():
    data = request.get_json()
    message = data.get('message', '')

    if not message:
        return jsonify({'error': 'No message provided'}), 400

    # Prepare the message
    prepared_message = prepare_text(message)
    
    # Predict next word
    predicted_probs = model.predict(prepared_message)
    predicted_index = np.argmax(predicted_probs)
    next_word = tokenizer.index_word[predicted_index]

    return jsonify({'next_word': next_word})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
