// main.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Context } from './context';
import userAuth from "./site/userAuth";
import './locales/i18n';

const app = ReactDOM.createRoot(document.getElementById('root'));

app.render(
  <Context.Provider value={{ user: new userAuth() }}>
    <Router>
      <App />
    </Router>
  </Context.Provider>
);
