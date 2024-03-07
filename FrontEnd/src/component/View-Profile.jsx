import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function UserProfile() {
  const [userProfile, setUserProfile] = useState(null); // изменено
  const [error, setError] = useState(null);
  const { userId } = useParams();
  console.log(userId)

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/view-profile/${userId}`);
      setUserProfile(response.data.profile); // установка профиля в состояние
    } catch(err) {
      setError(err); // установка ошибки в состояние
    }
  }

  function formatDate(rawDate) {
    const dataRegistro = new Date(rawDate);
    const day = dataRegistro.getDate();
    const month = dataRegistro.toLocaleString('default', { month: 'long' });
    const year = dataRegistro.getFullYear();
    return `${day} ${month} ${year}`;
  }

  useEffect(() => {
    fetchData();
  }, [userId]);

  // if (error) {
  //   return <div>Error: {error.message}</div>; // отображение ошибки
  // } else if (!userProfile) {
  //   return <div>Loading...</div>; // отображение загрузки
  // }

  return (
    <div>
    <main id="content" role="main" className="main">
      <div className="content container-fluid">
        <div className="row justify-content-lg-center">
          <div className="col-lg-10">
            <div className="profile-cover">
              <div className="profile-cover-img-wrapper">
                <img className="profile-cover-img" src="../assets/img/1920x400/img1.jpg" alt="Image Description"/>
              </div>
            </div>
            <div className="text-center mb-5">
              <div className="avatar avatar-xxl avatar-circle profile-cover-avatar">
                <span className="bd-placeholder rounded avatar-initials">{userProfile?.nome_professor?.charAt(0).toUpperCase()}</span>
                <span className="avatar-status avatar-status-success"></span>
              </div>
              <h2 className='link-danger'>ViewProfile</h2>
              <h1 className="page-header-title">{userProfile.nome_professor} <i className="bi-patch-check-fill fs-2 text-primary" data-bs-toggle="tooltip" data-bs-placement="top" title="Top endorsed"></i></h1>
              <ul className="list-inline list-px-2">
                <li className="list-inline-item">
                  <i className="bi-geo-alt me-1"></i>
                  <span>{"N.Escola"}</span>
                </li>

                <li className="list-inline-item">
                  <i className="bi-building me-1"></i>
                  <span>{"N.Grupo"}</span>
                </li>

                <li className="list-inline-item">
                  <i className="bi-calendar-week me-1"></i>
                  <span>{"Data"}</span>
                </li>
              </ul>
            </div>

            
            <div className="js-nav-scroller hs-nav-scroller-horizontal mb-5">
                
              <ul className="nav nav-tabs align-items-center">
                <li className="nav-item">
                  <Link className="nav-link active" to="">Perfil</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link disabled" to="./team">Equipa</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link disabled" to="/user-profile">Amigos</Link>
                </li>

                <li className="nav-item ms-auto">
                  <div className="d-flex gap-2">
                    <div className="form-check form-check-switch">
                      <input className="form-check-input" type="checkbox" value="" id="connectCheckbox"/>
                      <label className="form-check-label btn btn-sm" htmlFor="connectCheckbox">
                        <Link to="#">
                        <span className="form-check-default">
                          <i className="bi-person-plus-fill"></i> Subscrever
                        </span>
                        </Link>
                        <span className="form-check-active">
                          <i className="bi-check-lg me-2"></i> Está subscrito
                        </span>
                      </label>
                    </div>


                    <div className="dropdown nav-scroller-dropdown">
                      <button type="button" className="btn btn-white btn-icon btn-sm" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi-three-dots-vertical"></i>
                      </button>

                      <div className="dropdown-menu dropdown-menu-end mt-1" aria-labelledby="profileDropdown">
                        <span className="dropdown-header">Definições</span>

                        <a className="dropdown-item" href="#">
                          <i className="bi-info-circle dropdown-item-icon"></i> Sugerir edições
                        </a>

                        <div className="dropdown-divider"></div>

                        <span className="dropdown-header">Feedback</span>

                        <a className="dropdown-item" href="#">
                          <i className="bi-flag dropdown-item-icon"></i> Relatório
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="row">
              <div className="col-lg-4">
                <div className="js-sticky-block card mb-3 mb-lg-5" data-hs-sticky-block-options='{
                       "parentSelector": "#accountSidebarNav",
                       "breakpoint": "lg",
                       "startPoint": "#accountSidebarNav",
                       "endPoint": "#stickyBlockEndPoint",
                       "stickyOffsetTop": 20
                     }'>
                  <div className="card-header">
                    <h4 className="card-header-title">Amigos</h4>
                  </div>

                  <div className="card-body">
                  <ul className="list-unstyled list-py-3 mb-0">
                          <li>
                            <div className="d-flex align-items-center">
                              <a className="d-flex align-items-center me-2" href="#">
                                <div className="flex-shrink-0">
                                  <div className="avatar avatar-sm avatar-circle">
                                    <img className="avatar-img" src="./assets/img/160x160/img8.jpg" alt="Image Description"/>
                                    <span className="avatar-status avatar-sm-status avatar-status-success"></span>
                                  </div>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h5 className="text-hover-primary mb-0">Isabella Finley</h5>
                                  <span className="fs-6 text-body">79 Amigos</span>
                                </div>
                              </a>
                              <div className="ms-auto">
                                <div className="form-check form-check-switch">
                                  <input className="form-check-input" type="checkbox" value="" id="connectionsCheckbox2"/>
                                  <label className="form-check-label btn-icon btn-xs rounded-circle" for="connectionsCheckbox2">
                                    <span className="form-check-default">
                                      <i className="bi-person-plus-fill"></i>
                                    </span>
                                    <span className="form-check-active">
                                      <i className="bi-check-lg"></i>
                                    </span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                  </div>
                        <a className="card-footer text-center" href="user-profile-connections.html">
                        Ver todos os amigos <i className="bi-chevron-right"></i>
                      </a>
                </div>
              </div>

              <div className="col-lg-8">
                <div className="d-grid gap-3 gap-lg-5">
                  <div className="card">
                    <div className="card-header card-header-content-between">
                      <h4 className="card-header-title">A sua atividade</h4>
                    </div>

                    <div className="card-body card-body-height" style={{ height: '30rem' }}>
                      <ul className="step step-icon-xs mb-0">
                        <li className="step-item">
                          <div className="step-content-wrapper">
                            <span className="step-icon step-icon-pseudo step-icon-soft-dark"></span>

                            <div className="step-content">
                              <h5 className="step-title">
                                <a className="text-dark" href="#">Spidran pap.exe</a>
                              </h5>
                              <ul className="list-group">
                                <li className="list-group-item list-group-item-light">
                                  <div className="row gx-1">
                                    <div className="col-sm-4">
                                      <div className="d-flex">
                                        <span className="flex-shrink-0">
                                          <img className="avatar avatar-xs" src="../assets/svg/brands/excel-icon.svg" alt="Image Description"/>
                                        </span>
                                        <div className="flex-grow-1 text-truncate ms-2">
                                          <span className="d-block fs-6 text-dark text-truncate" title="weekly-reports.xls">PAP.xlsx</span>
                                          <span className="d-block small text-muted">12TB</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              </ul>

                              <span className="text-muted small text-uppercase">16.11.2023</span>
                            </div>
                          </div>
                        </li>
                        <li className="step-item">
                          <div className="step-content-wrapper">
                            <span className="step-icon step-icon-pseudo step-icon-soft-dark"></span>

                            <div className="step-content">
                              <h5 className="step-title">
                                <a className="text-dark" href="#">Bruh</a>
                              </h5>

                              <p className="fs-5 mb-1">👀  
                                <span className="badge bg-soft-primary text-primary rounded-pill"><span className="legend-indicator bg-primary"></span>"Disciplinas"</span>
                                <span className="badge bg-soft-primary text-success rounded-pill"><span className="legend-indicator bg-success"></span>"Nivel"</span>
                                <span className="badge bg-soft-primary text-warning rounded-pill"><span className="legend-indicator bg-warning"></span>"Anos"</span></p>

                              <span className="text-muted small text-uppercase">01.09.1939</span>
                            </div>
                          </div>
                        </li>          
                      </ul>
                    </div>
                    <div className="card-footer">
                      <Link className="link link-collapse" data-bs-toggle="collapse" to="/form" role="button" aria-expanded="false" aria-controls="collapseActivitySection">
                        <span className="link-collapse-default">Ver mais</span>
                      </Link>
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
