import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Context } from "./contexts/context";
import userAuth from "./site/userAuth";
import './locales/i18n';
import { GoogleOAuthProvider } from '@react-oauth/google';

const app = ReactDOM.createRoot(document.getElementById('root'));

app.render(
  <GoogleOAuthProvider clientId="41978584350-7q77ll8c23fktgf7ehes1piaq5q18jc5.apps.googleusercontent.com">
    <Context.Provider value={{ user: new userAuth() }}>
      <Router>
        <App />
      </Router>
    </Context.Provider>
  </GoogleOAuthProvider>
);
