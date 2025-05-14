from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from PIL import Image
import numpy as np
import joblib
from tensorflow.keras.models import load_model

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

model = load_model('model/model_tanaman_obat.h5')

label_map = {0: "Jahe", 1: "Kunyit", 2: "Lengkuas", 3: "Kencur"}

def preprocess_image(image_path):
    image = Image.open(image_path).convert('RGB')
    image = image.resize((224, 224))  
    arr = np.array(image) / 255.0  
    return arr.reshape(1, 224, 224, 3)

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image part'}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(file_path)

    img_array = preprocess_image(file_path)
    prediction = model.predict(img_array)[0]
    predicted_class = np.argmax(prediction)
    
    if predicted_class not in label_map:
        return jsonify({'prediction': 'Mohon maaf, saat ini belum tersedia'}), 200
    
    label = label_map.get(predicted_class, "Unknown")

    return jsonify({'prediction': label})

if __name__ == '__main__':
    app.run(debug=True)
