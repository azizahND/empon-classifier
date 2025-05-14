import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Predict from "./pages/predict"; 

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Predict />} />

        <Route path="/Predict" element={<Predict />} />
      </Routes>
    </Router>
  );
}

export default App; 
