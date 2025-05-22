import React, { useState } from 'react';
import axios from 'axios';
import Header from '../layout/Header';
import Navs from '../components/Navs';
import Button from '../components/Button';

function Predict() {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
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
      setDescription(res.data.description);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-[100rem]">
        <Navs />
      </div>

      <div>
        <Header />
      </div>

      <div className="container mx-auto max-w-xl px-4 py-10 text-center bg-white shadow-md rounded-lg mt-8">
        <h1 className="text-3xl font-bold text-green-800 mb-6">Deteksi Empon-Empon</h1>

        <div className="mb-4">
          <input 
            type="file" 
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          />
        </div>

        {imagePreview && (
          <div className="mb-6">
            <h3 className="text-md font-medium mb-2">Gambar yang diunggah:</h3>
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="mx-auto max-w-xs rounded-lg border"
            />
          </div>
        )}

        <button 
          onClick={handleSubmit} 
          className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition"
        >
          Kirim Gambar
        </button>

        {prediction && (
          <div className="mt-6 text-left">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Hasil Deteksi: <span className="text-green-700">{prediction}</span>
            </h2>
            <p className="text-gray-700 bg-gray-100 p-4 rounded-lg">{description}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Predict;
