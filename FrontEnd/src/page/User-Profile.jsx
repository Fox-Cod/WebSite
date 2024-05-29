import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { profile } from '../http/deviceAPI';
import { Context } from '../context';


export default function UserProfile() {
  const auth = useContext(Context);
  const [userProfile, setUserProfile] = useState({});
  const [dataActivtiy, setDataActvitiy] = useState([]);
  const [dataResources, setDataResources] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (auth.user._isAuth) {
          const res = await profile();
          setUserProfile(res.profile),
          setDataActvitiy(res.activity),
          setDataResources(res.resources),
          setTeams(res.teams)
          console.log("User is authenticated");
        } else {
          window.location.href = '/error404';
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    const currentDate = new Date();
    if (date.toDateString() === currentDate.toDateString()) {
        return date.toLocaleTimeString('default', { hour: 'numeric', minute: 'numeric' });
    } else {
        return date.toLocaleDateString('default', { day: 'numeric', month: 'long', year: 'numeric' });
    }
};

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  console.log(userProfile.СreateDate)

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

                <h1 className="page-header-title">
                  {/* <i className="bi-patch-check-fill fs-2 text-primary" data-bs-toggle="tooltip" data-bs-placement="top" title="Top endorsed"></i> */}
                  {userProfile.name}
                </h1>
                <ul className="list-inline list-px-2">
                  <li className="list-inline-item">
                    <i className="bi-geo-alt me-1"></i>
                    <span>{userProfile.nameSchool}</span>
                  </li>

                  <li className="list-inline-item">
                    <i className="bi-building me-1"></i>
                    <span>{userProfile.nameGroup}</span>
                  </li>

                  <li className="list-inline-item">
                    <i className="bi-calendar-week me-1"></i>
                    <span>{formatDate(userProfile.СreateDate)}</span>
                  </li>
                </ul>
              </div>

              <div className="js-nav-scroller hs-nav-scroller-horizontal mb-5">

                <ul className="nav nav-tabs align-items-center">
                  <li className="nav-item">
                    <Link className="nav-link active" to="/user-profile">Perfil</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/team-list">Equipa</Link>
                  </li>

                  <li className="nav-item ms-auto">
                    <div className="d-flex gap-2">
                      <div className="dropdown nav-scroller-dropdown">
                        <button type="button" className="btn btn-white btn-icon btn-sm" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                          <i className="bi-three-dots-vertical"></i>
                        </button>

                        <div className="dropdown-menu dropdown-menu-end mt-1" aria-labelledby="profileDropdown">
                          <span className="dropdown-header">FAQ</span>

                          <Link className="dropdown-item" to="/faq">
                            <i className="bi-info-circle dropdown-item-icon"></i> Mais informações
                          </Link>

                          <div className="dropdown-divider"></div>

                          <span className="dropdown-header">Feedback</span>

                          <Link className="dropdown-item" to="/#contact-section">
                            <i className="bi-flag dropdown-item-icon"></i>Contacte-nos
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="row">
                <div className="col-lg">

                  <div id="accountSidebarNav"></div>

                  <div className="js-sticky-block card mb-3 mb-lg-5" style={{ maxHeight: '500px' }} data-hs-sticky-block-options='{
                       "parentSelector": "#accountSidebarNav",
                       "breakpoint": "lg",
                       "startPoint": "#accountSidebarNav",
                       "endPoint": "#stickyBlockEndPoint",
                       "stickyOffsetTop": 20
                     }'>
                    <div className="card-header">
                      <h4 className="card-header-title">Profile</h4>
                    </div>

                    <div className="card-body overflow-auto" >
                      <ul className="list-unstyled list-py-2 text-dark mb-0">
                        <li className="pb-0"><span className="card-subtitle">Sobre</span></li>
                        <li><i className="bi-person dropdown-item-icon"></i> {userProfile.name}</li>
                        <li><i className="bi-geo-alt me-1 dropdown-item-icon"></i> {userProfile.nameSchool}</li>
                        <li><i className="bi-building me-1 dropdown-item-icon"></i> {userProfile.nameGroup}</li>


                        <li className="pt-4 pb-0"><span className="card-subtitle">Contacts</span></li>
                        <li><i className="bi-at dropdown-item-icon"></i> {userProfile.email}</li>
                        <li className="pt-4 pb-0" ><span className="card-subtitle">Equipa</span></li>
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
                </div>

                <div className="col-lg-8">
                  <div className="d-grid gap-3 gap-lg-5">
                    <div className="card">
                      <div className="card-header card-header-content-between">
                        <h4 className="card-header-title">A sua atividade</h4>

                        <div className="dropdown">
                          <button type="button" className="btn btn-ghost-secondary btn-icon btn-sm rounded-circle" id="contentActivityStreamDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="bi-three-dots-vertical"></i>
                          </button>

                          <div className="dropdown-menu dropdown-menu-end mt-1" aria-labelledby="contentActivityStreamDropdown">
                            <span className="dropdown-header">Definições</span>

                            <a className="dropdown-item" href="#">
                              <i className="bi-share-fill dropdown-item-icon"></i> Partilhar ligações
                            </a>

                            <div className="dropdown-divider"></div>

                            <span className="dropdown-header">Feedback</span>

                            <a className="dropdown-item" href="#">
                              <i className="bi-chat-left-dots dropdown-item-icon"></i> Relatório
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="card-body card-body-height" style={{ height: '30rem' }}>
                        {dataActivtiy.length > 0 ? (
                          <ul className="step step-icon-xs mb-0">
                            {dataActivtiy.map((d, i) => (
                              <li className="step-item" key={i}>
                                <div className="step-content-wrapper">
                                  <span className="step-icon step-icon-pseudo step-icon-soft-dark"></span>
                                  <div className="step-content">
                                    <Link className="text-dark" to={`/view-activity/${d.id}`}>{d.title}</Link>
                                    <p className="fs-5 mb-1"> {d.description}<br />
                                      <span className="badge bg-soft-primary text-primary rounded-pill"><span className="legend-indicator bg-primary"></span>{d.subjects.nameSubject} </span>
                                      <span className="badge bg-soft-primary text-success rounded-pill"><span className="legend-indicator bg-success"></span>{d.educations.nameEducation} </span>
                                      <span className="badge bg-soft-primary text-warning rounded-pill"><span className="legend-indicator bg-warning"></span>{d.years.year} </span>
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
                            <h5>Não tens nada.</h5><Link className='link' to="/activity"> Queres acrescentar alguma coisa? </Link>
                          </div>
                        )}
                        {dataResources.map((d, i) => (
                          <ul className="step step-icon-xs mb-0" key={i}>
                            <li className="step-item">
                              <div className="step-content-wrapper">
                                <span className="step-icon step-icon-pseudo step-icon-soft-dark"></span>

                                <div className="step-content">
                                  <ul className="list-group">
                                    <h6>{d.title}</h6>
                                    <li className="list-group-item list-group-item-light">
                                      <div className="row gx-1">
                                        <div className="col-sm-4">
                                          <div className="d-flex">
                                            <span className="flex-shrink-0">
                                              <img className="avatar avatar-xs" src="../assets/svg/components/placeholder-img-format.svg" alt="Image Description" />
                                            </span>
                                            <div className="flex-grow-1 text-truncate ms-2">
                                              <span className="d-block fs-6 text-dark text-truncate"><Link className="text-dark" to="/resources">{d.fileName}</Link></span>
                                              <span className="d-block small text-muted">{formatBytes(d.fileSize)}</span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
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

  )
}
