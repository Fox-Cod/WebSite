import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [schoolAndGroupData, setSchoolAndGroupData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    group: '',
    escola: '',
  });

  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    if (!userData.name || userData.name.length < 4) {
      errors.name = 'O nome deve ter pelo menos 4 caracteres.';
    }

    if (!userData.email || !userData.email.includes('@')) {
      errors.email = 'Introduza um endereço de correio eletrónico válido.';
    }

    if (!userData.password || userData.password.length < 8) {
      errors.password = 'A palavra-passe deve ter pelo menos 8 caracteres.';
    }

    if (userData.password !== userData.confirmPassword) {
      errors.confirmPassword = 'As palavras-passe não correspondem.';
    }

    if (!userData.group) {
      errors.group = 'Seleccione um grupo válido.';
    }

    if (!userData.escola) {
      errors.escola = 'Selecionar uma escola válida.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const selectedGroup = schoolAndGroupData.grupos.find((grupo) => grupo.nome_grupo === value);

    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
      id_grupo: selectedGroup ? selectedGroup.cod_grupo : null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await axios.post('http://localhost:8081/api/registration', userData);
        navigate('/sign-in');
      } catch (error) {
        console.error('Error submitting data to the server:', error);
      }
    } else {
      console.log('Form validation failed.');
    }
  };

  const fetchViewData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/view-data');
      if (response.data.Status === 'Success') {
        setSchoolAndGroupData(response.data.data);
      } else {
        console.error(response.data.Message);
      }
    } catch (error) {
      console.error('Error fetching view data:', error);
    }
  };

  useEffect(() => {
    fetchViewData();
  }, []);

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
                      <h1 className="display-5">Sign Up</h1>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="name" className="form-label">
                      Nome
                    </label>
                    <input
                      type="text"
                      className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
                      id="name"
                      name="name"
                      placeholder="Tiago Lopes"
                      value={userData.name}
                      onChange={handleChange}
                    />
                    <span className="invalid-feedback">{formErrors.name}</span>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="form-label">
                      Seu e-mail
                    </label>
                    <input
                      type="text"
                      className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                      id="email"
                      name="email"
                      placeholder="example@example.com"
                      value={userData.email}
                      onChange={handleChange}
                    />
                    <span className="invalid-feedback">{formErrors.email}</span>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="form-label">
                      <span>Password</span>
                    </label>
                    <input
                      type="password"
                      className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
                      id="password"
                      name="password"
                      placeholder="Password"
                      value={userData.password}
                      onChange={handleChange}
                    />
                    <span className="invalid-feedback">{formErrors.password}</span>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="confirmPassword" className="form-label">
                      <span>Confirmar a password</span>
                    </label>
                    <input
                      type="password"
                      className={`form-control ${formErrors.confirmPassword ? 'is-invalid' : ''}`}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirmar a password"
                      value={userData.confirmPassword}
                      onChange={handleChange}
                    />
                    <span className="invalid-feedback">{formErrors.confirmPassword}</span>
                  </div>

                  <div className="mb-4">
                    <label className="form-label">
                      Grupo
                    </label>
                    <select
                      className={`form-control ${formErrors.group ? 'is-invalid' : ''}`}
                      id="group"
                      name="group"
                      value={userData.group}
                      onChange={handleChange}
                    >
                      <option value="">Qualquer</option>
                      {schoolAndGroupData.grupos && schoolAndGroupData.grupos.map((grupo, index) => (
                        <option key={index} value={grupo.id_grupo}>
                          {grupo.cod_grupo} {grupo.nome_grupo}
                        </option>
                      ))}
                    </select>
                    <span className="invalid-feedback">{formErrors.group}</span>
                  </div>

                  <div className="mb-4">
                    <label className="form-label">
                      Escola
                    </label>
                    <select
                      className={`form-control ${formErrors.escola ? 'is-invalid' : ''}`}
                      id="escola"
                      name="escola"
                      value={userData.escola}
                      onChange={handleChange}
                    >
                      <option value="">Qualquer</option>
                      {schoolAndGroupData.escolas && schoolAndGroupData.escolas.map((escola, index) => (
                        <option key={index} value={escola.id_escola}>
                          {escola.nome_escola}
                        </option>
                      ))}
                    </select>
                    <span className="invalid-feedback">{formErrors.escola}</span>
                  </div>

                  <p className="text-center">Já tem uma conta?? <Link className="link" to="/sign-in">Clique aqui</Link></p>
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
};
