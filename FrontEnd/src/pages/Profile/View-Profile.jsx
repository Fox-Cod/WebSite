import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { profileView } from '../../api/deviceAPI';
import { useTranslation } from 'react-i18next';

export default function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [activity, setActivity] = useState([]);
  const [resources, setResources] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useParams();

  const { t, i18n } = useTranslation();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await profileView(userId);
        setProfile(res.profile);
        setActivity(res.activity);
        setResources(res.resources);
        setTeams(res.teams);
        setLoading(false);
      } catch (error) {
        console.error('Erro durante o carregamento de dados:', error);
        setError('Erro durante o carregamento de dados');
        setLoading(false);
      }
    }

    fetchData();
  }, [userId]);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
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
                    <span>{formatDate(profile?.СreateDate)}</span>
                  </li>

                </ul>
              </div>

              <div className="row">
                <div className="col-lg-4">
                  <div className="js-sticky-block card mb-3 mb-lg-5">
                    <div className="card-header">
                      <h4 className="card-header-title">{t('teams')}</h4>
                      <ul className="list-unstyled list-py-3 mt-3">
                        <li className="pb-0">
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {teams.map(team => (
                              <Link key={team.idTeam} to={`/team/${team.idTeam}`} style={{ marginBottom: '10px' }}>
                                <i className="bi-people dropdown-item-icon"></i>#{team.teams.nameTeam}
                              </Link>
                            ))}
                          </div>
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
                        <h4 className="card-header-title">{t('activity')}</h4>
                      </div>
                      <div className="card-body card-body-height" style={{ height: '30rem' }}>
                        <ul className="step step-icon-xs mb-0">
                          {activity.map((d, i) => (
                            <li className="step-item" key={i}>
                              <div className="step-content-wrapper">
                                <span className="step-icon step-icon-pseudo step-icon-soft-dark"></span>
                                <div className="step-content">
                                  <Link className="text-dark" to={`/activity/view-activity/${d.idActivity}`}>{d.title}</Link>
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
                                              <img className="avatar avatar-xs" src="../assets/svg/illustrations/placeholder-img-format.svg" alt="Image Description" />
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
