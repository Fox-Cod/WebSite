// main.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Context } from './context';
import userAuth from "./site/userAuth";

const app = ReactDOM.createRoot(document.getElementById('root'));

app.render(
  <Context.Provider value={{ user: new userAuth() }}>
    <App />
  </Context.Provider>
);