import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function ResetPasswordPage() {
  const [values, setValues] = useState({
    passwordNovo: "",
    passwordNovoCon: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = new URLSearchParams(window.location.search).get("token");

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/token-validation/${token}`
        );
        if (response.data.success === true) {
          console.log("Token is valid");
        } else {
          setError("Invalid or expired token");
        }
      } catch (error) {
        console.error("Error while checking token validity:", error.message);
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

    if (!values.passwordNovo || values.passwordNovo.length < 8) {
      errors.passwordNovo = "A nova senha deve ter pelo menos 8 caracteres.";
    }

    if (values.passwordNovo !== values.passwordNovoCon) {
      errors.passwordNovoCon = "As novas senhas não coincidem.";
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
      const response = await axios.post(
        `http://localhost:8081/api/reset-password/${token}`,
        {
          password: values.passwordNovo,
          confirmPassword: values.passwordNovoCon,
          token: token,
        }
      );
      navigate('/sign-in');
  
      console.log("Ответ сервера:", response.data);
      // Обработка успешного сброса пароля, например, перенаправление пользователя
    } catch (error) {
      console.error("Ошибка при отправке данных на сервер:", error);
      if (error.response) {
        console.error("Ответ сервера:", error.response.data);
        // setError(error.response.data.message || "Ошибка на сервере");
      }
    }
  };

  return (
<main id="content" role="main" className="main">
  <div className="container py-5 py-sm-7 mt-10">
    <div className="mx-auto" style={{ maxWidth: "30rem" }}>
      <div className="card card-lg mb-5">
        <div className="card-body">
          {error && (
            <div className="text-center">
              <div className="mb-5">
                <div className="mb-4">
                  <img className="avatar avatar-xxl avatar-4x3" src="./assets/svg/illustrations/oc-maintenance.svg" alt="Image Description" data-hs-theme-appearance="default" />
                </div>
                <h1 className="">Error</h1>
              {error}
              </div>
            </div>
          )}
          {!error && (
            <form onSubmit={handleSubmit}>
              <div className="text-center">
                <div className="mb-5">
                  <h1 className="display-5">Alterar password</h1>
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label w-100" htmlFor="password-novo">
                  Nova senha
                </label>
                <input
                  type="password"
                  className={`form-control ${
                    formErrors.passwordNovo ? "is-invalid" : ""
                  }`}
                  id="password-novo"
                  placeholder="Nova senha"
                  value={values.passwordNovo}
                  onChange={(e) =>
                    setValues({ ...values, passwordNovo: e.target.value })
                  }
                />
                <span className="invalid-feedback">
                  {formErrors.passwordNovo}
                </span>
              </div>

              <div className="mb-4">
                <label
                  className="form-label w-100"
                  htmlFor="password-novo-con"
                >
                  Confirmar nova senha
                </label>
                <input
                  type="password"
                  className={`form-control ${
                    formErrors.passwordNovoCon ? "is-invalid" : ""
                  }`}
                  id="password-novo-con"
                  placeholder="Confirmar a nova senha"
                  value={values.passwordNovoCon}
                  onChange={(e) =>
                    setValues({ ...values, passwordNovoCon: e.target.value })
                  }
                />
                <span className="invalid-feedback">
                  {formErrors.passwordNovoCon}
                </span>
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary btn-lg">
                  Confirmar
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  </div>
</main>

  );
}
