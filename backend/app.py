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

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

model = load_model('model/model_empon_classifier.h5')

label_map = {0: "Temulawak", 1: "Kencur", 2: "Lengkuas", 3: "Kunyit"}

plant_info = {
    "Temulawak": (
        "Temulawak (Curcuma xanthorrhiza) adalah tanaman obat asli Indonesia yang telah lama digunakan dalam pengobatan tradisional. "
        "Akar rimpangnya mengandung kurkumin dan xanthorrhizol, senyawa aktif yang memiliki sifat antiinflamasi, antimikroba, dan antioksidan. "
        "Temulawak sering dimanfaatkan untuk meningkatkan fungsi hati, membantu mengatasi gangguan pencernaan seperti kembung dan mual, serta mendukung sistem kekebalan tubuh. "
        "Selain itu, tanaman ini juga dikenal dapat membantu mengurangi kadar kolesterol dan memiliki potensi dalam mencegah pertumbuhan sel kanker. "
        "Dalam dunia kesehatan modern, ekstrak temulawak kini juga digunakan dalam suplemen herbal karena manfaatnya yang luas dan terbukti secara ilmiah."
    ),
    "Kunyit": (
        "Kunyit (Curcuma longa), yang juga dikenal sebagai kunir, adalah rempah-rempah berwarna kuning cerah yang memiliki banyak manfaat kesehatan. "
        "Komponen utamanya, kurkumin, merupakan antioksidan kuat yang berperan penting dalam melawan radikal bebas dan mengurangi peradangan dalam tubuh. "
        "Kunyit telah digunakan secara tradisional untuk meredakan nyeri sendi, mempercepat penyembuhan luka, memperbaiki pencernaan, dan sebagai peluruh haid. "
        "Selain manfaat kesehatannya, kunyit juga sering dijadikan pewarna alami dalam masakan dan bahan utama dalam berbagai ramuan jamu. "
        "Dalam studi ilmiah, kunyit menunjukkan potensi dalam mengurangi risiko penyakit kronis seperti kanker, diabetes, dan penyakit jantung."
    ),
    "Lengkuas": (
        "Lengkuas (Alpinia galanga) adalah rempah yang sering digunakan dalam masakan Asia Tenggara untuk memberikan aroma dan rasa khas. "
        "Namun lebih dari sekadar bumbu dapur, lengkuas juga dikenal karena kandungan senyawa aktif seperti galangin yang memiliki sifat antimikroba, antioksidan, dan antiinflamasi. "
        "Dalam pengobatan tradisional, lengkuas digunakan untuk meredakan gangguan pencernaan, batuk, dan perut kembung, serta meningkatkan nafsu makan. "
        "Lengkuas juga dipercaya dapat memperkuat daya tahan tubuh dan mengurangi infeksi saluran pernapasan. "
        "Pemanfaatannya yang luas baik dalam kuliner maupun kesehatan menjadikan lengkuas sebagai salah satu tanaman herbal penting di kawasan tropis."
    ),
    "Kencur": (
        "Kencur (Kaempferia galanga) adalah tanaman herbal yang banyak digunakan dalam pembuatan jamu dan pengobatan tradisional di Indonesia. "
        "Rimpang kencur memiliki aroma khas dan kandungan senyawa seperti etil p-metoksisinamat dan borneol yang berfungsi sebagai antiinflamasi, antijamur, dan antibakteri. "
        "Kencur sering direkomendasikan untuk meredakan batuk, sakit tenggorokan, dan mual, serta meningkatkan energi tubuh. "
        "Dalam jamu, kencur biasanya digunakan dalam bentuk wedang atau diminum langsung dengan madu untuk menjaga stamina dan meningkatkan daya tahan tubuh. "
        "Selain khasiat kesehatan, kencur juga bermanfaat untuk menjaga kesehatan kulit dan memperlancar aliran darah, sehingga cocok digunakan sebagai ramuan luar dan dalam."
    )
}

plant_details = {
    "Temulawak": {
        "Nama Latin": "Curcuma xanthorrhiza",
        "Asal": "Indonesia",
        "keluarga": "Zingiberaceae (Suku Jahe-jahean)"
    },
    "Kunyit": {
        "Nama Latin": "Curcuma longa",
        "Asal": "Asia Selatan dan Asia Tenggara",
        "keluarga": "Zingiberaceae (Suku Jahe-jahean)"
    },
    "Lengkuas": {
        "Nama Latin": "Alpinia galanga",
        "Asal": "Asia Selatan dan Asia Tenggara",
        "keluarga": "Zingiberaceae (Suku Jahe-jahean)"
    },
    "Kencur": {
        "nama_latin": "Kaempferia galanga",
        "Asal": "Asia Tenggara",
        "keluarga": "Zingiberaceae (Suku Jahe-jahean)"
    }
}

def preprocess_image(image_path):
    image = Image.open(image_path).convert('RGB')
    image = image.resize((224, 224))
    image = np.array(image) / 255.0
    return image.reshape(1, 224, 224, 3)

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image part'}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(file_path)

    try:
        img_array = preprocess_image(file_path)
        prediction = model.predict(img_array)[0]
        predicted_class = np.argmax(prediction)
    except Exception as e:
        return jsonify({'error': f'Prediction failed: {str(e)}'}), 500

    if predicted_class not in label_map:
        return jsonify({'prediction': 'Tidak dikenali'}), 200

    label = label_map[predicted_class]
    return jsonify({
        'prediction': label,
        'description': plant_info.get(label, "Deskripsi belum tersedia."),
        'detail': plant_details.get(label, {})
    })

if __name__ == '__main__':
    app.run(debug=True)
