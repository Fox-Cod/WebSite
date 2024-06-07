import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { profile, getAllData, profileUpdate } from '../http/deviceAPI';
import { useTranslation } from 'react-i18next';

export default function UserProfileSettings() {
  const [schoolAndGroupData, setSchoolAndGroupData] = useState({});
  const [userProfile, setUserProfile] = useState({});
  const [formData, setFormData] = useState({ name: '', group: '', school: '' });
  const { t } = useTranslation();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await profile();
        setUserProfile(res.profile);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchSchoolAndGroupData = async () => {
      try {
        const res = await getAllData();
        setSchoolAndGroupData(res);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSchoolAndGroupData();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedFormData = {
        name: formData.name || userProfile.name,
        group: formData.group || userProfile.idGroup,
        school: formData.school || userProfile.idSchool,
      };
      const response = await profileUpdate(updatedFormData);
      window.location.reload();
      setUserProfile(response.data.profile);
    } catch (error) {
      console.error(error);
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
                  <img className="profile-cover-img" src="../assets/img/1920x400/img1.jpg" alt="Profile Cover" />
                </div>
              </div>
              <div className="text-center mb-5">
                <div className="avatar avatar-xxl avatar-circle profile-cover-avatar">
                  <span className="bd-placeholder rounded avatar-initials">
                    {userProfile?.name?.charAt(0).toUpperCase()}
                  </span>
                  <span className="avatar-status avatar-status-success"></span>
                </div>
                <h1 className="page-header-title">{userProfile.name}</h1>
              </div>
              <div className="row">
                <div className="col-lg-3">
                  <div className="navbar-expand-lg navbar-vertical mb-3 mb-lg-5">
                    <div id="navbarVerticalNavMenu" className="collapse navbar-collapse">
                      <ul className="card card-navbar-nav nav nav-tabs nav-lg nav-vertical">
                        <li className="nav-item">
                          <a className="nav-link active" href="#content">
                            <i className="bi-person nav-icon"></i> {t('user_info')}
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="#passwordSection">
                            <i className="bi-key nav-icon"></i> {t('password')}
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
                              <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder={userProfile.name}
                                value={formData.name}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="row mb-4">
                            <label className="col-sm-3 col-form-label form-label">{t('group')}</label>
                            <div className="col-sm-9">
                              <select
                                className="form-control"
                                id="group"
                                value={formData.group || userProfile.idGroup}
                                onChange={handleChange}
                              >
                                <option disabled>{userProfile.nameGroup}</option>
                                <option disabled>-- {t('text_info_settings_1')} --</option>
                                {schoolAndGroupData.groups?.map((group) => (
                                  <option key={group.idGroup} value={group.idGroup}>
                                    {group.codGroup} {group.nameGroup}
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
                                value={formData.school || userProfile.idSchool}
                                onChange={handleChange}
                              >
                                <option disabled>{userProfile.nameSchool}</option>
                                <option disabled>-- {t('text_info_settings_1')} --</option>
                                {schoolAndGroupData.schools?.map((school) => (
                                  <option key={school.idSchool} value={school.idSchool}>
                                    {school.nameSchool}
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
                    <div id="passwordSection" className="card">
                      <div className="card-header">
                        <h4 className="card-title">{t('text_info_settings_3')}</h4>
                      </div>
                      <div className="card-body">
                        <p className="fs-5">{t('text_info_settings_4')}</p>
                        <div className="d-flex justify-content-end">
                          <Link className="btn btn-primary" to="/password-reset-email">{t('change_your_password')}</Link>
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
  );
}
