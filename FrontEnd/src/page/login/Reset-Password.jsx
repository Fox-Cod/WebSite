import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { tokenValidation, resetPassword } from '../../http/deviceAPI';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confPassword, setConfirmPassword] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = new URLSearchParams(window.location.search).get("token");

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const response = await tokenValidation(token);
        if (!response.success) {
          setError("Invalid or expired token");
        }
      } catch (error) {
        setError(
          <>
            Erro ao verificar a validade do token <br />
            Tente atualizar o sítio ou seguir novamente a ligação enviada para o gmail.
          </>
        );
      }
    };

    checkTokenValidity();
  }, [token]);

  const validateForm = () => {
    const errors = {};
    if (!password || password.length < 8) {
      errors.password = "A nova senha deve ter pelo menos 8 caracteres.";
    }
    if (password !== confPassword) {
      errors.confPassword = "As novas senhas não coincidem.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await resetPassword(token, password, confPassword);
      navigate('/sign-in');
    } catch (error) {
      setError(error.response?.data?.message || "Erro no servidor");
    }
  };

  return (
    <main id="content" role="main" className="main">
      <div className="container py-5 py-sm-7 mt-10">
        <div className="mx-auto" style={{ maxWidth: "30rem" }}>
          <div className="card card-lg mb-5">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="text-center mb-5">
                  <h1 className="display-5">Alterar password</h1>
                </div>
                <div className="mb-4">
                  <label className="form-label w-100" htmlFor="password-novo">Nova senha</label>
                  <input
                    type="password"
                    className={`form-control ${formErrors.password ? "is-invalid" : ""}`}
                    id="password-novo"
                    placeholder="Nova senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span className="invalid-feedback">{formErrors.password}</span>
                </div>
                <div className="mb-4">
                  <label className="form-label w-100" htmlFor="password-novo-con">Confirmar nova senha</label>
                  <input
                    type="password"
                    className={`form-control ${formErrors.confPassword ? "is-invalid" : ""}`}
                    id="password-novo-con"
                    placeholder="Confirmar a nova senha"
                    value={confPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <span className="invalid-feedback">{formErrors.confPassword}</span>
                </div>
                {error}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">Confirmar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
