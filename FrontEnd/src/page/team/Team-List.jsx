import React, { useState, useEffect } from 'react';
import { AddTeam } from '../component/Other';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function TeamList() {
  const [data, setData] = useState([]);
  const [userProfile, setUserProfile] = useState('');
  const [searchTeams, setSearchTeams] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchDataUserProfile = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/profile', { withCredentials: true })
      setUserProfile(response.data.profile)
    } catch (err) {
      console.error(err);
    }
  }

  const fetchDataTeamList = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/view-team-list', { withCredentials: true })
      setData(response.data.teams)
      setCurrentUser(response.data.idTeacher);
    } catch (err) {
      console.error(err);
    }
  }

  const fetchDataSeachTeams = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/search-teams`, { withCredentials: true })
      setSearchTeams(response.data.allTeams)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchDataUserProfile(),
      fetchDataTeamList();
    fetchDataSeachTeams();
  }, []);

  function formatDate(rawDate) {
    const dataRegistro = new Date(rawDate);
    const day = dataRegistro.getDate();
    const month = dataRegistro.toLocaleString('default', { month: 'long' });
    const year = dataRegistro.getFullYear();
    return `${day} ${month} ${year}`;
  }

  const isCurrentUserInTeam = data.some(member => member.teams.idTeacher === currentUser);


  const getRandomTeams = (arr, n) => {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

  // Выбираем 6 случайных записей
  const randomTeams = getRandomTeams(searchTeams, 6);
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
                    <span>{formatDate(userProfile.createDate)}</span>
                  </li>
                </ul>
              </div>


              <div className="js-nav-scroller hs-nav-scroller-horizontal mb-5">

                <ul className="nav nav-tabs align-items-center">
                  <li className="nav-item">
                    <Link className="nav-link" to="/user-profile">Perfil</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/team-list">Equipa</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link disabled" to="/friends">Amigos</Link>
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

              <div className="my-4 p-3 bg-body rounded shadow-sm">
                <div className="row align-items-center">
                  <div className="col">
                    <h3 className="mb-0">{data.length > 0 ? `${data.length} Equipa(s)` : 'Ainda não tem uma equipa'}</h3>
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
                                  <Link to={`/${team.teams.idTeam}`}>#{team.teams.nameTeam}</Link>
                                </h4>
                              </div>
                              <div className="col-3 text-end">
                                <div className="dropdown">
                                  <button type="button" className="btn btn-ghost-secondary btn-icon btn-sm rounded-circle" id="teamsDropdown1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="bi-three-dots-vertical"></i>
                                  </button>
                                  <div className="dropdown-menu dropdown-menu-sm dropdown-menu-end" aria-labelledby="teamsDropdown1">
                                    <a className="dropdown-item" href="#">Mudar o nome da equipa</a>
                                    <a className="dropdown-item" href="#">Adicionar aos favoritos</a>
                                    <a className="dropdown-item" href="#">Equipa de arquivo (Admin)</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item text-danger" href="#">Delete</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <p>{team.teams.descriptionTeam}</p>
                          </div>
                          <div className="card-footer border-0 pt-0">
                            <div className="list-group list-group-flush list-group-no-gutters">
                              <div className="list-group-item">
                                <div className="row align-items-center">
                                  <div className="col">
                                    <span className="card-subtitle">Indústria:</span>
                                  </div>
                                  <div className="col-auto">
                                    <a className="badge bg-soft-primary text-primary p-2" href="#">{team.teams.areasWork}</a>
                                  </div>
                                </div>
                              </div>

                              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                {team.teams.privacy === 1 ? (
                                  <div className='form-text badge bg-soft-primary text-success rounded-pill me-1'>Publico <i class="bi bi-globe2"></i></div>
                                ) : (
                                  <div className='form-text badge bg-soft-primary text-danger rounded-pill me-1'>Privado <i class="bi bi-lock"></i></div>
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
                              <button type="button" className="btn btn-ghost-secondary btn-icon btn-sm rounded-circle" id="teamsListDropdown1" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bi-three-dots-vertical"></i>
                              </button>

                              <div className="dropdown-menu dropdown-menu-sm dropdown-menu-end" aria-labelledby="teamsListDropdown1">
                                <a className="dropdown-item" href="#">Mudar o nome da equipa</a>
                                <a className="dropdown-item" href="#">Adicionar aos favoritos</a>
                                <a className="dropdown-item" href="#">Equipa de arquivo (Admin)</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item text-danger" href="#">Delete</a>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                {team.teams.privacy === 1 ? (
                                  <div className='form-text badge bg-soft-primary text-success rounded-pill me-1'>Publico <i class="bi bi-globe2"></i></div>
                                ) : (
                                  <div className='form-text badge bg-soft-primary text-danger rounded-pill me-1'>Privado <i class="bi bi-lock"></i></div>
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
                  <h5>Recomendado </h5>
                  <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3">
                    {randomTeams.map(teams => (
                      <div className="col mb-3 mb-lg-5" key={teams.idTeam}>
                        <div className="card h-100">
                          <div className="card-body pb-0">
                            <div className="row align-items-center mb-2">
                              <div className="col-9">
                                <h4 className="mb-1">
                                  <Link to={`/${teams.idTeam}`}>#{teams.nameTeam}</Link>
                                </h4>
                              </div>
                              <div className="col-3 text-end">
                                <div className="dropdown">
                                  <button type="button" className="btn btn-ghost-secondary btn-icon btn-sm rounded-circle" id="teamsDropdown1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="bi-three-dots-vertical"></i>
                                  </button>
                                  <div className="dropdown-menu dropdown-menu-sm dropdown-menu-end" aria-labelledby="teamsDropdown1">
                                    <a className="dropdown-item" href="#">Mudar o nome da equipa</a>
                                    <a className="dropdown-item" href="#">Adicionar aos favoritos</a>
                                    <a className="dropdown-item" href="#">Equipa de arquivo (Admin)</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item text-danger" href="#">Delete</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <p>{teams.descriptionTeam}</p>
                          </div>
                          <div className="card-footer border-0 pt-0">
                            <div className="list-group list-group-flush list-group-no-gutters">
                              <div className="list-group-item">
                                <div className="row align-items-center">
                                  <div className="col">
                                    <span className="card-subtitle">Indústria:</span>
                                  </div>
                                  <div className="col-auto">
                                    <a className="badge bg-soft-primary text-primary p-2" href="#">{teams.areasWork}</a>
                                  </div>
                                </div>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                {teams.privacy === 1 ? (
                                  <div className='form-text badge bg-soft-primary text-success rounded-pill me-1'>Publico <i class="bi bi-globe2"></i></div>
                                ) : (
                                  <div className='form-text badge bg-soft-primary text-danger rounded-pill me-1'>Privado <i class="bi bi-lock"></i></div>
                                )}
                                {/* {isCurrentUserInTeam && (
                                  <div className='form-text badge bg-soft-primary text-body rounded-pill me-1'>Já na equipa</div>
                                )} */}
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
