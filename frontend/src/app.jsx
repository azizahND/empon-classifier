import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Predict from "./pages/predict"; 
import Landing from "./pages/landing"; 
import About from "./pages/about"; 



function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Landing />} />
        <Route path="/deteksi" element={<Predict />} />
        <Route path="/about" element={<About />} />

      </Routes>
    </Router>
  );
}

export default App; 
