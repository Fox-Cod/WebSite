import React, { useState, useEffect } from 'react';
import { AddTeam } from '../../components/Other';
import { Link } from 'react-router-dom';
import { profile, searchTeam } from '../../api/deviceAPI';
import { useTranslation } from 'react-i18next';

export default function TeamList() {
  const [data, setTeams] = useState([]);
  const [userProfile, setUserProfile] = useState('');
  const [userTeams, setUserTeams] = useState([]);
  const [searchTeams, setSearchTeams] = useState([]);

  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await profile();
        setUserProfile(res.profile),
          setTeams(res.teams)
        setUserTeams(res.teams.map(team => team.teams.idTeam));
        console.log("User is authenticated");
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const fetchDataSeachTeams = async () => {
    try {
      const res = await searchTeam()
      setSearchTeams(res.allTeams)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchDataSeachTeams();
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

  const getRandomTeams = (arr, n) => {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

  const randomTeams = getRandomTeams(searchTeams, 12);
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
                {userProfile.nameSchool || userProfile.nameGroup ? (
                  <ul className="list-inline list-px-2">
                    <li className="list-inline-item"><i className="bi-geo-alt me-1"></i><span>{userProfile.nameSchool}</span></li>
                    <li className="list-inline-item"><i className="bi-building me-1"></i><span>{userProfile.nameGroup}</span></li>
                    <li className="list-inline-item"><i className="bi-calendar-week me-1"></i><span>{formatDate(userProfile.СreateDate)}</span></li>
                  </ul>
                ) : (
                  <p>Não foi verificado! <br /> Por favor, complete um registo completo <br /> <Link className='link' to='/user-profile-settings'>Continuar</Link></p>
                )}
              </div>


              <div className="js-nav-scroller hs-nav-scroller-horizontal mb-5">

                <ul className="nav nav-tabs align-items-center">
                  <li className="nav-item">
                    <Link className="nav-link" to="/user-profile">{t('profile')}</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/team-list">{t('teams')}</Link>
                  </li>

                  <li className="nav-item ms-auto">
                    <div className="d-flex gap-2">

                      <div className="dropdown nav-scroller-dropdown">
                        <button type="button" className="btn btn-white btn-icon btn-sm" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                          <i className="bi-three-dots-vertical"></i>
                        </button>

                        <div className="dropdown-menu dropdown-menu-end mt-1" aria-labelledby="profileDropdown">
                          <span className="dropdown-header">{t('feedback')}</span>

                          <Link className="dropdown-item" to="/#contact-section">
                            <i className="bi-flag dropdown-item-icon"></i>{t('contact_us')}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="my-4 p-3 card rounded shadow-sm">
                <div className="row align-items-center">
                  <div className="col">
                    <h3 className="mb-0">{data.length > 0 ? `${data.length} - ${t('teams')}` : `${t('no_user_team_data')}`}</h3>
                  </div>

                  <div className="col-auto">
                    <div className="form-check form-check-switch">
                      <AddTeam />
                    </div>
                    <ul className="nav nav-segment" id="profileTeamsTab" role="tablist">
                      <li className="nav-item">
                        <a className="nav-link active" id="grid-tab" data-bs-toggle="tab" href="#grid" role="tab" aria-controls="grid" aria-selected="true" title="Column view">
                          <i className="bi-grid"></i>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" id="list-tab" data-bs-toggle="tab" href="#list" role="tab" aria-controls="list" aria-selected="false" title="List view">
                          <i className="bi-view-list"></i>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" id="list-tab" data-bs-toggle="tab" href="#search" role="tab" aria-controls="list" aria-selected="false" title="List view">
                          <i className="bi-search"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {data.length === 0 ? (
                <div class="alert alert-soft-dark mb-5 mb-lg-7" role="alert">
                  <div class="d-flex align-items-center">
                    <div class="flex-shrink-0">
                      <img class="avatar avatar-xl" src="./assets/svg/illustrations/oc-megaphone.svg" alt="Image Description" data-hs-theme-appearance="default" />
                    </div>

                    <div class="flex-grow-1 ms-3">
                      <h3 class="alert-heading mb-1">{t('text_no_team_data_1')}</h3>
                      <p class="mb-0">{t('text_no_team_data_2')} <i className="bi-search"></i></p>
                    </div>
                  </div>
                </div>
              ) : (null)}

              <div className="tab-content" id="profileTeamsTabContent">
                <div className="tab-pane fade show active" id="grid" role="tabpanel" aria-labelledby="grid-tab">
                  <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3">
                    {data.map(team => (
                      <div className="col mb-3 mb-lg-5" key={team.teams.idTeam}>
                        <div className="card h-100">
                          <div className="card-body pb-0">
                            <div className="row align-items-center mb-2">
                              <div className="col-9">
                                <h4 className="mb-1">
                                  <Link to={`/team/${team.teams.idTeam}`}>#{team.teams.nameTeam}</Link>
                                </h4>
                              </div>
                            </div>
                            <p>{team.teams.descriptionTeam}</p>
                          </div>
                          <div className="card-footer border-0 pt-0">
                            <div className="list-group list-group-flush list-group-no-gutters">
                              <div className="list-group-item">
                                <div className="row align-items-center">
                                  <div className="col">
                                    <span className="card-subtitle">{t('industry')}</span>
                                  </div>
                                  <div className="col-auto">
                                    <a className="badge bg-soft-primary text-primary p-2" href="#">{team.teams.areasWork}</a>
                                  </div>
                                </div>
                              </div>

                              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                {team.teams.privacy === 1 ? (
                                  <div className='form-text badge bg-soft-primary text-success rounded-pill me-1'>{t('public')} <i class="bi bi-globe2"></i></div>
                                ) : (
                                  <div className='form-text badge bg-soft-primary text-danger rounded-pill me-1'>{t('private')} <i class="bi bi-lock"></i></div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="tab-pane fade" id="list" role="tabpanel" aria-labelledby="list-tab">
                  {data.map(team => (
                    <div className="col mb-3" key={team.teams.idTeam}>
                      <div className="card card-body">
                        <div className="row align-items-md-center">
                          <div className="col-9 col-md-4 col-lg-3 mb-2 mb-md-0">
                            <h4><Link to={`/team/${team.teams.idTeam}`}>#{team.teams.nameTeam}</Link></h4>
                            <a className="badge bg-soft-primary text-primary p-2" href="#">{team.teams.areasWork}</a>
                          </div>

                          <div className="col-3 col-md-auto order-md-last text-end">
                            <div className="dropdown">
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                {team.teams.privacy === 1 ? (
                                  <div className='form-text badge bg-soft-primary text-success rounded-pill me-1'>{t('public')} <i class="bi bi-globe2"></i></div>
                                ) : (
                                  <div className='form-text badge bg-soft-primary text-danger rounded-pill me-1'>{t('private')} <i class="bi bi-lock"></i></div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="col-sm mb-2 mb-sm-0">
                            <p>{team.teams.descriptionTeam}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="tab-pane fade" id="search" role="tabpanel" aria-labelledby="grid-tab">
                  <h5>{t('recommended')} </h5>
                  <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3">
                    {randomTeams.map(teams => (
                      <div className="col mb-3 mb-lg-5" key={teams.idTeam}>
                        <div className="card h-100">
                          <div className="card-body pb-0">
                            <div className="row align-items-center mb-2">
                              <div className="col-9">
                                <h4 className="mb-1">
                                  <Link to={`/team/${teams.idTeam}`}>#{teams.nameTeam}</Link>
                                </h4>
                              </div>
                            </div>
                            <p>{teams.descriptionTeam}</p>
                          </div>
                          <div className="card-footer border-0 pt-0">
                            <div className="list-group list-group-flush list-group-no-gutters">
                              <div className="list-group-item">
                                <div className="row align-items-center">
                                  <div className="col">
                                    <span className="card-subtitle">{t('industry')}</span>
                                  </div>
                                  <div className="col-auto">
                                    <a className="badge bg-soft-primary text-primary p-2" href="#">{teams.areasWork}</a>
                                  </div>
                                </div>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                {teams.privacy === 1 ? (
                                  <div className='form-text badge bg-soft-primary text-success rounded-pill me-1'>{t('public')} <i class="bi bi-globe2"></i></div>
                                ) : (
                                  <div className='form-text badge bg-soft-primary text-danger rounded-pill me-1'>{t('private')} <i class="bi bi-lock"></i></div>
                                )}
                                {userTeams.includes(teams.idTeam) && (
                                  <div className='form-text badge bg-soft-primary text-body rounded-pill me-1'>{t('user_is_already_on_the_team')}</div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
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
