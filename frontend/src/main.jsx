// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app"; // Pastikan path ini benar

import 'preline/preline';

// Menambahkan ekspor default agar bisa diimpor di index.js
const Main = () => {
  return (
    <StrictMode>
      <App />
    </StrictMode>
  );
};

export default Main;  // Pastikan ada ekspor default
