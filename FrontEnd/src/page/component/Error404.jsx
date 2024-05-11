import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="display-4">404</h1>
      <p className="lead">Page not found.</p>
      <p className="lead">Or you are trying to enter the page with authorization without authorization itself, if this is the case, then <Link to='/sign-in'>log in</Link></p>
    </div>
  );
}

export default NotFoundPage;
