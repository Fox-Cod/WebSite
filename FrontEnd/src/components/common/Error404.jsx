import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-1">404</h1>
        <p className="lead">Página não encontrada</p>
        <p className="mb-4">Desculpe, a página que você está procurando não existe.</p>
        <Link to="/" className="link">
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
};

export default Error404;
