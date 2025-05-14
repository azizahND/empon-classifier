import React, { useState } from 'react';
import axios from 'axios';

function Predict() {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [imagePreview, setImagePreview] = useState(null); // Menyimpan preview gambar

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Membuat URL sementara untuk menampilkan gambar
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result); // Menyimpan URL gambar yang akan ditampilkan
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      const res = await axios.post('http://127.0.0.1:5000/predict', formData);
      setPrediction(res.data.prediction);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>Deteksi Empon-empon</h1>
      
      <input type="file" onChange={handleImageChange} />
      
      {/* Menampilkan preview gambar jika sudah ada */}
      {imagePreview && (
        <div style={{ marginTop: 20 }}>
          <h3>Gambar yang diunggah:</h3>
          <img 
            src={imagePreview} 
            alt="Preview" 
            style={{ width: '100%', maxWidth: '400px', marginTop: 10 }}
          />
        </div>
      )}
      
      <button onClick={handleSubmit} style={{ marginTop: 20 }}>
        Kirim Gambar
      </button>

      {prediction && <h2>Hasil Deteksi: {prediction}</h2>}
    </div>
  );
}

export default Predict;
