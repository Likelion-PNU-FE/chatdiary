
import React from 'react';
import './styles/App.css';
import { RouterProvider } from "react-router-dom";
import router from "./router/router.jsx";

function App() {
  return (
    <RouterProvider router={router} />
      
  );

}

export default App
