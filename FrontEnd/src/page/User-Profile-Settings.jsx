import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../context';
import { profile, getAllData, profileUpdate } from '../http/deviceAPI';
import { useTranslation } from 'react-i18next';

export default function UserProfileSettings() {
  const auth = useContext(Context);
  const [schoolAndGroupData, setSchoolAndGroupData] = useState({});
  const [userProfile, setUserProfile] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    group: '',
    school: '',
  });
  const [newEmail, setNewEmail] = useState({email: ''});
  const [error, setError] = useState(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (auth.user._isAuth) {
          const res = await profile();
          setUserProfile(res.profile),
          console.log("User is authenticated");
        } else {
          window.location.href = '/';
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const fetchViewData = async () => {
    try {
      const res = await getAllData()
      setSchoolAndGroupData(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchViewData();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedFormData = {
        name: formData.nome || userProfile.name,
        group: formData.group || userProfile.idGroup,
        school: formData.escola || userProfile.idSchool,
      };

      const response = await profileUpdate(updatedFormData)
      window.location.reload();
      setUserProfile(response.data.profile);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeEmail = (e) => {
    setNewEmail({ ...newEmail, email: e.target.value });
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();

    try {
      const updatedEmailData = {
        id: newEmail.id || userProfile.idTeacher,
        email: newEmail.email || userProfile.email,
      };

      const response = await axios.post('http://localhost:8081/profile/email', updatedEmailData);

      if (response.data.Status === 'Success') {
        setUserProfile(response.data.profile);
      } else {
        setError(response.data.Message || 'Error on the server');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <main id="content" role="main" className="main">
        <div className="content container-fluid">
          <div className="row justify-content-lg-center">
            <div className="col-lg-10">
              <div className="profile-cover">
                <div className="profile-cover-img-wrapper">
                  <img className="profile-cover-img" src="../assets/img/1920x400/img1.jpg" alt="Image Description" />
                </div>
              </div>
              <div className="text-center mb-5">
                <div className="avatar avatar-xxl avatar-circle profile-cover-avatar">
                  <span className="bd-placeholder rounded avatar-initials">{userProfile?.name?.charAt(0).toUpperCase()}</span>
                  <span className="avatar-status avatar-status-success"></span>
                </div>

                <h1 className="page-header-title">{userProfile.name}</h1>
              </div>


              <div className="row">
                <div className="col-lg-3">
                  <div className="navbar-expand-lg navbar-vertical mb-3 mb-lg-5">
                    <div id="navbarVerticalNavMenu" className="collapse navbar-collapse">
                      <ul id="navbarSettings" className="js-sticky-block js-scrollspy card card-navbar-nav nav nav-tabs nav-lg nav-vertical" data-hs-sticky-block-options='{
                            "parentSelector": "#navbarVerticalNavMenu",
                            "targetSelector": "#header",
                            "breakpoint": "lg",
                            "startPoint": "#navbarVerticalNavMenu",
                            "endPoint": "#stickyBlockEndPoint",
                            "stickyOffsetTop": 20
                          }'>
                        <li className="nav-item">
                          <a className="nav-link active" href="#content">
                            <i className="bi-person nav-icon"></i> {t('user_info')}
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="#emailSection">
                            <i className="bi-at nav-icon"></i> {t('email')}
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="#passwordSection">
                            <i className="bi-key nav-icon"></i> {t('password')}
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="#deleteAccountSection">
                            <i className="bi-trash nav-icon"></i> {t('delete_account')}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="d-grid gap-3 gap-lg-5">
                    <div className="card">
                      <div className="card-header">
                        <h2 className="card-title">{t('user_info')}</h2>
                      </div>

                      <div className="card-body">
                        <form onSubmit={handleSubmit}>

                          
                          <div className="row mb-4">
                            <label className="col-sm-3 col-form-label form-label">{t('name')}</label>
                            <div className="col-sm-9">
                              <div className="input-group input-group-sm-vertical">
                                <input type="text" className="form-control" id="name" placeholder={userProfile.name} value={formData.nome} onChange={handleChange} />
                              </div>
                            </div>
                          </div>

                          <div className="row mb-4">
                            <label className="col-sm-3 col-form-label form-label">{t('group')}</label>
                            <div className="col-sm-9">
                              <select
                                className="form-control"
                                id="group"
                                value={userProfile.nameGroup}
                                onChange={handleChange}
                              >
                                <option disabled>{userProfile.nameGroup}</option>
                                <option disabled>-- {t('text_info_settings_1')} --</option>
                                {schoolAndGroupData.groups && schoolAndGroupData.groups.map((id, index) => (
                                    <option key={index} value={id.idGroup}>
                                      {id.codGroup} {id.nameGroup}
                                    </option>
                                  ))}
                              </select>
                            </div>
                          </div>

                          <div className="row mb-4">
                            <label className="col-sm-3 col-form-label form-label">{t('school')}</label>
                            <div className="col-sm-9">
                              <select
                                className="form-control"
                                id="school"
                                value={userProfile.nameSchool}
                                onChange={handleChange}
                              >
                                <option disabled>{userProfile.nameSchool}</option>
                                <option disabled>-- {t('text_info_settings_1')} --</option>
                                  {schoolAndGroupData.schools && schoolAndGroupData.schools.map((id, index) => (
                                    <option key={index} value={id.idSchool}>
                                      {id.nameSchool}
                                    </option>
                                  ))}
                              </select>
                            </div>
                          </div>

                          <div className="d-flex justify-content-end">
                            <button type="submit" className="btn btn-primary">{t('save_changes')}</button>
                          </div>
                        </form>
                      </div>
                    </div>

                    <div id="emailSection" className="card">
                      <div className="card-header">
                        <h4 className="card-title">{t('email')}</h4>
                      </div>
                      <div className="card-body">
                        <p>{t('text_info_settings_2')} <span className="fw-semibold">{userProfile.email}</span></p>
                        <form onSubmit={handleSubmitEmail}>
                          <div className="row mb-4">
                            <label className="col-sm-3 col-form-label form-label">{t('new_email')}</label>
                            <div className="col-sm-9">
                              <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Introduzir novo endereço de correio eletrónico"
                                value={newEmail.email}
                                onChange={handleChangeEmail}
                              />
                            </div>
                          </div>
                          <div className="d-flex justify-content-end">
                            <button type="submit" className="btn btn-primary">{t('save_changes')}</button>
                          </div>
                        </form>
                      </div>
                    </div>

                    <div id="passwordSection" className="card">
                      <div className="card-header">
                        <h4 className="card-title">{t('text_info_settings_3')}</h4>
                      </div>

                      <div className="card-body">
                        <div className="mb-4">
                          <p className="fs-5">{t('text_info_settings_4')}</p>
                        </div>

                        <div className="d-flex justify-content-end">
                          <Link className="btn btn-primary" to="/password-reset-email">{t('change_your_password')}</Link>
                        </div>
                      </div>

                    </div>

                    <div id="deleteAccountSection" className="card">
                      <div className="card-header">
                        <h4 className="card-title">{t('delete_account')}</h4>
                      </div>
                      <div className="card-body">
                        <p className="card-text">{t('text_info_settings_5')}</p>

                        <div className="mb-4">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="deleteAccountCheckbox" />
                            <label className="form-check-label">
                              {t('text_info_settings_6')}
                            </label>
                          </div>
                        </div>

                        <div className="d-flex justify-content-end gap-3">
                          <button type="submit" className="btn btn-danger">{t('delete')}</button>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
