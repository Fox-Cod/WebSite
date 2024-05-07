import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function UserProfile() {
  const [profile, setProfile] = useState({});
  const [activity, setActivity] = useState([]);
  const [resources, setResources] = useState([]);
  const [teams, setTeams] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    async function fetchProfileAndActivity() {
      try {
        const response = await axios.get(`http://localhost:8081/api/user-profile-and-activity/${userId}`);
        setProfile(response.data.profile);
        setActivity(response.data.activity);
        setResources(response.data.resources);
        setTeams(response.data.teams);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    }

    fetchProfileAndActivity();
  }, [userId]);


  function formatDate(rawDate) {
    const dataRegistro = new Date(rawDate);
    const day = dataRegistro.getDate();
    const month = dataRegistro.toLocaleString('default', { month: 'long' });
    const year = dataRegistro.getFullYear();
    return `${day} ${month} ${year}`;
  }

  function formatDate(rawDate) {
    const dataRegistro = new Date(rawDate);
    const day = dataRegistro.getDate();
    const month = dataRegistro.toLocaleString('default', { month: 'long' });
    const year = dataRegistro.getFullYear();
    return `${day} ${month} ${year}`;
  }

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
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
                  <span className="bd-placeholder rounded avatar-initials">{profile?.name?.charAt(0).toUpperCase()}</span>
                  <span className="avatar-status avatar-status-success"></span>
                </div>
                {/* <i className="bi-patch-check-fill fs-2 text-primary" data-bs-toggle="tooltip" data-bs-placement="top" title="Top endorsed"></i> */}
                <h1 className="page-header-title">{profile?.name}</h1>
                <ul className="list-inline list-px-2">
                  <li className="list-inline-item">
                    <i className="bi-geo-alt me-1"></i>
                    <span>{profile?.nameSchool}</span>
                  </li>

                  <li className="list-inline-item">
                    <i className="bi-building me-1"></i>
                    <span>{profile?.nameGroup}</span>
                  </li>

                  <li className="list-inline-item">
                    <i className="bi-calendar-week me-1"></i>
                    <span>{formatDate(profile?.CreateDate)}</span>
                  </li>

                  {/* <Link className="list-inline-item" style={{ cursor: 'pointer' }}>
                    <i className="bi-exclamation-triangle-fill" title='Enviar uma queixa'></i>
                  </Link> */}
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
                      <h4 className="card-header-title">Equipa(s)</h4>
                      <ul className="list-unstyled list-py-3 mt-3">
                        <li className="pb-0">
                          {/* <li ><span className="card-subtitle">Equipa</span></li> */}
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {teams.map(team => (
                              <Link key={team.idTeam} to={`/${team.idTeam}`} style={{ marginBottom: '10px' }}>
                                <i className="bi-people dropdown-item-icon"></i>#{team.teams.nameTeam}
                              </Link>
                            ))}
                          </div>
                          <Link to="#"><i className="bi-people dropdown-item-icon"></i>#123</Link>
                        </li>
                      </ul>
                    </div>

                    <div className="card-body">

                    </div>
                  </div>
                </div>

                <div className="col-lg-8">
                  <div className="d-grid gap-3 gap-lg-5">
                    <div className="card">
                      <div className="card-header card-header-content-between">
                        <h4 className="card-header-title">Atividade(s)</h4>
                      </div>
                      <div className="card-body card-body-height" style={{ height: '30rem' }}>
                        <ul className="step step-icon-xs mb-0">
                          {activity.map((d, i) => (
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
                        {resources.map((d, i) => (
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
                      {/* <div className="card-footer">
                      <Link className="link link-collapse" data-bs-toggle="collapse" to="/form" role="button" aria-expanded="false" aria-controls="collapseActivitySection">
                        <span className="link-collapse-default">Ver mais</span>
                      </Link>
                    </div> */}
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
