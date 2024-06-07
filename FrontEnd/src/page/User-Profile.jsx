import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { profile, activity, resources } from '../http/deviceAPI';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

export default function UserProfile() {
  const [userProfile, setUserProfile] = useState({});
  const [dataActivity, setDataActivity] = useState([]);
  const [dataResources, setDataResources] = useState([]);
  const [teams, setTeams] = useState([]);
  const [favoritesActivity, setFavoritesActivity] = useState([]);
  const [favoritesResources, setFavoritesResources] = useState([]);
  const [dataFavoritesActivity, setDataFavoritesActivity] = useState([]);
  const [dataFavoritesResources, setDataFavoritesResources] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    setFavoritesActivity((Cookies.get('activityFavorites') || "").split(',').map(Number));
    setFavoritesResources((Cookies.get('resourcesFavorites') || "").split(',').map(Number));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { profile: userProfile, activity: dataActivity, resources: dataResources, teams } = await profile();
        setUserProfile(userProfile);
        setDataActivity(dataActivity);
        setDataResources(dataResources);
        setTeams(teams);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        setDataFavoritesActivity(await activity());
      } catch (err) {
        console.log(err);
      }
    };
    fetchActivityData();
  }, []);

  useEffect(() => {
    const fetchResourcesData = async () => {
      try {
        setDataFavoritesResources(await resources());
      } catch (err) {
        console.log(err);
      }
    };
    fetchResourcesData();
  }, []);

  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    const options = { hour: 'numeric', minute: 'numeric' };
    return date.toDateString() === new Date().toDateString()
      ? date.toLocaleTimeString('default', options)
      : date.toLocaleDateString('default', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024, sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
                <ul className="list-inline list-px-2">
                  <li className="list-inline-item"><i className="bi-geo-alt me-1"></i><span>{userProfile.nameSchool}</span></li>
                  <li className="list-inline-item"><i className="bi-building me-1"></i><span>{userProfile.nameGroup}</span></li>
                  <li className="list-inline-item"><i className="bi-calendar-week me-1"></i><span>{formatDate(userProfile.СreateDate)}</span></li>
                </ul>
              </div>
              <div className="js-nav-scroller hs-nav-scroller-horizontal mb-5">
                <ul className="nav nav-tabs align-items-center">
                  <li className="nav-item"><Link className="nav-link active" to="/user-profile">{t('profile')}</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/team-list">{t('teams')}</Link></li>
                  <li className="nav-item ms-auto">
                    <div className="d-flex gap-2">
                      <div className="dropdown nav-scroller-dropdown">
                        <button type="button" className="btn btn-white btn-icon btn-sm" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                          <i className="bi-three-dots-vertical"></i>
                        </button>
                        <div className="dropdown-menu dropdown-menu-end mt-1" aria-labelledby="profileDropdown">
                          <span className="dropdown-header">{t('feedback')}</span>
                          <Link className="dropdown-item" to="/#contact-section"><i className="bi-flag dropdown-item-icon"></i>{t('contact_us')}</Link>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="row">
                <div className="col-lg">
                  <div id="accountSidebarNav"></div>
                  <div className="js-sticky-block card mb-3 mb-lg-5" style={{ maxHeight: '800px' }}>
                    <div className="card-header"><h4 className="card-header-title">{t('profile')}</h4></div>
                    <div className="card-body overflow-auto">
                      <ul className="list-unstyled list-py-2 text-dark mb-0">
                        <li className="pb-0"><span className="card-subtitle">{t('about')}</span></li>
                        <li><i className="bi-person dropdown-item-icon"></i> {userProfile.name}</li>
                        <li><i className="bi-geo-alt me-1 dropdown-item-icon"></i> {userProfile.nameSchool}</li>
                        <li><i className="bi-building me-1 dropdown-item-icon"></i> {userProfile.nameGroup}</li>
                        <li className="pt-4 pb-0"><span className="card-subtitle">{t('contacts')}</span></li>
                        <li><i className="bi-at dropdown-item-icon"></i> {userProfile.email}</li>
                        <li className="pt-4 pb-0"><span className="card-subtitle">{t('teams')}</span></li>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          {teams.map(team => (
                            <Link key={team.idTeam} to={`/team/${team.idTeam}`} style={{ marginBottom: '10px' }}>
                              <i className="bi-people dropdown-item-icon"></i>#{team.teams.nameTeam}
                            </Link>
                          ))}
                        </div>
                      </ul>
                    </div>
                  </div>
                  <div className="card mb-3" style={{ maxHeight: '300px' }}>
                    <div className="card-header"><h4 className="card-header-title"><i className="bi bi-bookmark-fill bookmark"></i> Favoritos</h4></div>
                    <div className="card-body overflow-auto">
                      <ul className="list-unstyled list-py-2 text-dark mb-0">
                        <li className="pb-0"><span className="card-subtitle">Atividades</span></li>
                        {favoritesActivity.length > 0 ? (
                          favoritesActivity.map(favId => {
                            const activity = dataFavoritesActivity.find(act => act.idActivity === favId);
                            return activity ? (
                              <div className='mb-2' key={activity.idActivity}>
                                <Link to={`/activity/view-activity/${activity.idActivity}`} className="link">{activity.title}</Link>
                              </div>
                            ) : null;
                          })
                        ) : (
                          <p>Adicione as melhores <Link to='/form' className='link'>atividades</Link></p>
                        )}
                        <li className="pb-0"><span className="card-subtitle">Recursos</span></li>
                        {favoritesResources.length > 0 ? (
                          favoritesResources.map(favId => {
                            const resource = dataFavoritesResources.find(res => res.idResource === favId);
                            return resource ? (
                              <div className='mb-2' key={resource.idResource}>
                                <Link to={`/resource/view-resource/${resource.idResource}`} className="link">{resource.title}</Link>
                              </div>
                            ) : null;
                          })
                        ) : (
                          <p>Adicione os melhores <Link to='/form' className='link'>recursos</Link></p>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="d-grid gap-3 gap-lg-5">
                    <div className="card">
                      <div className="card-header card-header-content-between">
                        <h4 className="card-header-title">{t('your_activity')}</h4>
                      </div>
                      <div className="card-body card-body-height" style={{ height: '35rem' }}>
                        {dataActivity.length > 0 ? (
                          <ul className="step step-icon-xs mb-0">
                            {dataActivity.map((d, i) => (
                              <li className="step-item" key={i}>
                                <div className="step-content-wrapper">
                                  <span className="step-icon step-icon-pseudo step-icon-soft-dark"></span>
                                  <div className="step-content">
                                    <Link className="text-dark" to={`/activity/view-activity/${d.idActivity}`}><strong>{d.title}</strong></Link>
                                    <p className="fs-5 mb-1">
                                      {d.description}<br />
                                      <span className="badge bg-soft-primary text-primary rounded-pill"><span className="legend-indicator bg-primary"></span>{d.subjects.nameSubject}</span>
                                      <span className="badge bg-soft-primary text-success rounded-pill"><span className="legend-indicator bg-success"></span>{d.educations.nameEducation}</span>
                                      <span className="badge bg-soft-primary text-warning rounded-pill"><span className="legend-indicator bg-warning"></span>{d.years.year}</span>
                                    </p>
                                    <span className="text-muted small text-uppercase">{formatDate(d.publishDate)}</span>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="text-center">
                            <img className='mb-5' src="./assets/svg/illustrations/oc-looking-for-answers.svg" alt="Img NoData" style={{ height: '20rem' }} />
                            <h5>{t('no_user_activity_data_1')}.</h5><Link className='link' to="/activity"> {t('no_user_activity_data_2')} </Link>
                          </div>
                        )}
                        {dataResources.map((d, i) => (
                          <ul className="step step-icon-xs mb-0" key={i}>
                            <li className="step-item">
                              <div className="step-content-wrapper">
                                <span className="step-icon step-icon-pseudo step-icon-soft-dark"></span>
                                <div className="step-content">
                                  <ul className="list-group">
                                    <div className="d-flex justify-content-between">
                                      <Link className="text-dark" to={`/resource/view-resource/${d.idResource}`}><strong>{d.title}</strong></Link>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                      <span className="text-gray-dark">{d.description}</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                      <span className="badge bg-secondary mb-2">{d.type}</span>
                                    </div>
                                    {d.type === "Ficheiro" && (
                                      <li className="list-group-item list-group-item-light">
                                        <div className="row gx-1">
                                          <div className="col-sm-4">
                                            <div className="d-flex">
                                              <span className="flex-shrink-0">
                                                <img className="avatar avatar-xs" src="../assets/svg/illustrations/placeholder-img-format.svg" alt="Image Description" />
                                              </span>
                                              <div className="flex-grow-1 text-truncate ms-2">
                                                <span className="d-block fs-6 text-dark text-truncate">{d.fileName}</span>
                                                <span className="d-block small text-muted">{formatBytes(d.fileSize)}</span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                    )}
                                  </ul>
                                  <span className="text-muted small text-uppercase">{formatDate(d.publishDate)}</span>
                                </div>
                              </div>
                            </li>
                          </ul>
                        ))}
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
