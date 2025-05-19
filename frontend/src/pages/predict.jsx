import React, { useState } from 'react';
import axios from 'axios';
import Header from '../layout/Header';
import Navs from '../components/Navs';
import Button from '../components/Button';

function Predict() {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState('');
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
    } catch (err) {
      console.error(err);
    }
  };

  return (

    <>
    <div className="mx-auto max-w-[100rem]">
      <Navs/>
    </div>



    <div className="">
      <Header/>
    </div>

    <div className="container mx-auto justify-items-center border-3 border-gray-200 ">
      <div className="">

      </div>
      <Button variant='brown' label="Pilih File"/>
    </div>



    <div style={{ padding: 30 }}>
      <h1>Deteksi Empon-empon</h1>
      
      <input type="file" onChange={handleImageChange} />
      
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
    </>





    
  );
}

export default Predict;
