from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from PIL import Image
import numpy as np
from tensorflow.keras.models import load_model

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Load model
model = load_model('model/model_tanaman_obat.h5')

# Mapping label
label_map = {0: "Temulawak", 1: "Kuniyr", 2: "Lengkuas", 3: "Kencur"}

# Informasi deskriptif untuk tiap tanaman
plant_info = {
    "Temulawak": "Temulawak adalah tanaman obat asli Indonesia yang bermanfaat untuk meningkatkan fungsi hati, pencernaan, dan sistem imun.",
    "Kuniyr": "Kunir atau kunyit mengandung kurkumin yang dikenal sebagai antioksidan dan antiinflamasi alami.",
    "Lengkuas": "Lengkuas adalah rempah-rempah yang umum digunakan dalam masakan dan dipercaya memiliki manfaat antimikroba serta memperbaiki pencernaan.",
    "Kencur": "Kencur sering digunakan dalam jamu dan pengobatan tradisional karena sifat anti-inflamasi dan kemampuannya meredakan batuk."
}

# Preprocessing gambar
def preprocess_image(image_path):
    image = Image.open(image_path).convert('RGB')
    image = image.resize((224, 224))  
    arr = np.array(image) / 255.0  
    return arr.reshape(1, 224, 224, 3)

# Endpoint prediksi
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

    label = label_map[predicted_class]
    description = plant_info.get(label, "Deskripsi belum tersedia.")

    return jsonify({
        'prediction': label,
        'description': description
    })

# Menjalankan server
if __name__ == '__main__':
    app.run(debug=True)
