import React, { useEffect } from 'react';
import { useParams, useLocation  } from 'react-router-dom';
import axios from 'axios';

export default function PasswordResetCode() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');
  console.log(token);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/token-validation/${token}`);
        if (response.data.success === true) {
          console.log(true);
          window.location.href = `/reset-password?token=${token}`;
        } else {
          console.log(false);
        }
        
      } catch (error) {
        console.error('Произошла ошибка при сбросе пароля:', error.message);
      }
    };
  
    fetchData();
  }, [token]);
  

  return (
    <div>
      <main id="content" role="main" className="main">
      <div className="container py-5 py-sm-7">
        <div className="mx-auto" style={{ maxWidth: '30rem' }}>
          <div className="card card-lg mb-5">
            <div className="card-body text-center">
              <div className="mb-4">
                <img className="avatar avatar-xxl avatar-4x3" src="./assets/svg/illustrations/oc-unlock.svg" alt="Image Description" data-hs-theme-appearance="default" />
              </div>

              <div className="mb-5">
                <h1 className="display-5">Verificação</h1>
                <p className="mb-0">Enviámos um código de verificação para o seu e-mail.</p>
                <p>Introduza o código da mensagem de correio eletrónico no campo abaixo.</p>
              </div>

              <div className="text-center">
                <p>Ainda não o recebi? <a href="#">Reenviar um novo código.</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    </div>
  );
}
