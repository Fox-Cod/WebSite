import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function PasswordResetEmail() {
  const [statusTrue, setStatusTrue] = useState(null);

  const [formErrors, setFormErrors] = useState({});
  const [values, setValues] = useState({
    email: '',
  });

  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    if (!values.email || !values.email.includes('@')) {
      errors.email = 'Por favor, insira um endereço de e-mail válido.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Отправляем запрос на сервер для генерации кода подтверждения и его отправки на электронную почту
      const response = await axios.post('http://localhost:8081/api/send-email', {
        email: values.email,
      });
      setStatusTrue('Dados enviados com sucesso!');
      
      console.log('Resposta do servidor:', response.data);

    } catch (error) {
      console.error('Erro ao enviar dados para o servidor:', error);
      if (error.response) {
        console.error('Resposta do servidor:', error.response.data);
        setFormErrors({ email: error.response.data.message || 'Erro no servidor' });
      }
    }
  };

  return (
    <div>
      <main id="content" role="main" className="main">
        <div className="container py-5 py-sm-7 mt-10">
          <div className="mx-auto" style={{ maxWidth: '30rem' }}>
            <div className="card card-lg mb-5">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="text-center">
                    <div className="mb-5">
                      <h1 className="display-5">Esqueceu-se da sua Senha?</h1>
                      <p>Introduza o endereço de correio eletrónico que utilizou para se registar e enviar-lhe-emos instruções sobre como redefinir a sua palavra-passe.</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="mb-4">
                    <label className="form-label" htmlFor="signinSrEmail"> Email </label>
                    <input
                      type="email"
                      className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                      name="email"
                      placeholder="example@example.com"
                      value={values.email}
                      onChange={(e) => setValues({ ...values, email: e.target.value })}
                    />
                    <span className="invalid-feedback">{formErrors.email}</span>
                  </div>

                  {statusTrue && <p className='text-success'>{statusTrue}</p>}
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg">Confirmar</button>
                  </div>
                  <Link to="/token-validation">ResetCode</Link><br />
                  <Link to="/reset-password">ResetPassword</Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
