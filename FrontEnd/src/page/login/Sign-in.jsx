
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });


  
  const validateForm = () => {
    const errors = {};

    if (!formData.email || !formData.email.includes('@')) {
      errors.email = 'Por favor, insira um endereço de e-mail válido.';
    }

    if (!formData.password || formData.password.length < 8) {
      errors.password = 'A senha deve ter pelo menos 8 caracteres.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:8081/api/login', formData, { withCredentials: true });
        if (response.data.Status === 'Success') {
          navigate('/');
          location.reload();
        } else {
          setFormErrors({ general: 'Credenciais inválidas' });
          console.log(response)
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log('Falha na validação do formulário.');
    }
  };


  return (
    <div>
      <main id="content" role="main" className="main">
        <div className="container py-5 py-sm-7">
          <div className="mx-auto" style={{ maxWidth: '30rem' }}>
            <div className="card card-lg mb-5">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="text-center">
                    <div className="mb-5">
                      <h1 className="display-5">Sign in</h1>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label" htmlFor="signinSrEmail">
                      Seu e-mail
                    </label>
                    <input
                      type="text"
                      className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                      name="email"
                      id="floatingInput"
                      placeholder="example@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <span className="invalid-feedback">{formErrors.email}</span>
                  </div>

                  <div className="mb-4">
                    <label className="form-label w-100" htmlFor="signupSrPassword" tabIndex="0">
                      <span className="d-flex justify-content-between align-items-center">
                        <span>Senha</span>
                        <Link className="form-label-link mb-0" to="/password-reset-email">
                          Esqueceu a senha?
                        </Link>
                      </span>
                    </label>
                      <input
                        type="password"
                        className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
                        name="password"
                        id="floatingPassword"
                        placeholder="Senha"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      />
                    <span className="invalid-feedback">{formErrors.password}</span>
                  </div>

                  <p className="text-center">
                    Ainda não tem uma conta? <Link className="link" to="/sign-up">
                      Inscreva-se aqui
                    </Link>
                  </p>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg">Sign in</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}
