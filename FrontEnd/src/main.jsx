import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./component/Navbar.module.css"; 

const app = ReactDOM.createRoot(document.getElementById('root'));

app.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
