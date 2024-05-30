import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from "../../http/userAPI";
import { useTranslation } from 'react-i18next';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { t, i18n } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      window.location.href = '/';
    } catch (err) {
      setError(err.response.data.Message);
      console.log(err);
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
                      <h1 className="display-5">{t('sign_in')}</h1>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label" htmlFor="signinSrEmail">
                    {t('email')}
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="example@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label w-100" htmlFor="signupSrPassword" tabIndex="0">
                      <span className="d-flex justify-content-between align-items-center">
                        <span>{t('password')}</span>
                        <Link className="form-label-link mb-0" to="/password-reset-email">
                          {t('password_reset')}
                        </Link>
                      </span>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  {error && <p className="text-danger">{error}</p>}

                  <p className="text-center">
                  {t('text_info_sign_in_1')} <Link className="link" to="/sign-up">
                  {t('text_info_sign_in_2')} </Link>
                  </p>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg">{t('sign_in')}</button>
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
