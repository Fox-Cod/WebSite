import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from "../../http/userAPI";

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Предотвращаем дефолтное поведение отправки формы

    try {
      const res = await login(email, password);
      window.location.href = '/';
    } catch (err) {
      setError(err.message + ' Wamp'); // Устанавливаем сообщение об ошибке
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
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="example@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
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
                      className="form-control"
                      name="password"
                      id="floatingPassword"
                      placeholder="Senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  {error && <p className="text-danger">{error}</p>} {/* Выводим сообщение об ошибке */}

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
