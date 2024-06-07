import React, { useState, useEffect } from 'react';
import { registration } from '../../http/userAPI';
import { getAllData } from '../../http/deviceAPI';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function SignUp() {
  const [schoolAndGroupData, setSchoolAndGroupData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    group: '',
    school: '',
  });
  const { t, i18n } = useTranslation();

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

    if (!userData.school) {
      errors.school = 'Selecionar uma escola válida.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    const selectedGroup = schoolAndGroupData.groups.find((groups) => groups.nameGroup === value);

    setUserData((prevData) => ({
      ...prevData,
      [id]: value,
      idGroup: selectedGroup ? selectedGroup.codGroup : null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await registration(userData)
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
      const response = await getAllData()
      setSchoolAndGroupData(response);
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
        <div className="container py-5 py-sm-7 ">
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
                      {t('name')}
                    </label>
                    <input
                      type="text"
                      className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
                      id="name"
                      placeholder="Tiago Lopes"
                      value={userData.name}
                      onChange={handleChange}
                    />
                    <span className="invalid-feedback">{formErrors.name}</span>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="form-label">
                      {t('email')}
                    </label>
                    <input
                      type="text"
                      className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                      id="email"
                      placeholder="example@example.com"
                      value={userData.email}
                      onChange={handleChange}
                    />
                    <span className="invalid-feedback">{formErrors.email}</span>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="form-label">
                      <span>{t('password')}</span>
                    </label>
                    <input
                      type="password"
                      className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
                      id="password"
                      placeholder="Password"
                      value={userData.password}
                      onChange={handleChange}
                    />
                    <span className="invalid-feedback">{formErrors.password}</span>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="confirmPassword" className="form-label">
                      <span>{t('confirm_password')}</span>
                    </label>
                    <input
                      type="password"
                      className={`form-control ${formErrors.confirmPassword ? 'is-invalid' : ''}`}
                      id="confirmPassword"
                      placeholder="Confirmar a password"
                      value={userData.confirmPassword}
                      onChange={handleChange}
                    />
                    <span className="invalid-feedback">{formErrors.confirmPassword}</span>
                  </div>

                  <div className="mb-4">
                    <label className="form-label">
                      {t('group')}
                    </label>
                    <select
                      className={`form-control ${formErrors.group ? 'is-invalid' : ''}`}
                      id="group"
                      value={userData.group}
                      onChange={handleChange}
                    >
                      <option value="">Qualquer</option>
                      {schoolAndGroupData.groups && schoolAndGroupData.groups.map((groups, index) => (
                        <option key={index} value={groups.idGroup}>
                          {groups.codGroup} {groups.nameGroup}
                        </option>
                      ))}
                    </select>
                    <span className="invalid-feedback">{formErrors.group}</span>
                  </div>

                  <div className="mb-4">
                    <label className="form-label">
                      {t('school')}
                    </label>
                    <select
                      className={`form-control ${formErrors.school ? 'is-invalid' : ''}`}
                      id="school"
                      value={userData.school}
                      onChange={handleChange}
                    >
                      <option value="">Qualquer</option>
                      {schoolAndGroupData.schools && schoolAndGroupData.schools.map((schools, index) => (
                        <option key={index} value={schools.idSchool}>
                          {schools.nameSchool}
                        </option>
                      ))}
                    </select>
                    <span className="invalid-feedback">{formErrors.school}</span>
                  </div>

                  <p className="text-center">{t('text_info_sign_up_1')} <Link className="link" to="/sign-in">{t('text_info_sign_up_2')}</Link></p>
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
};