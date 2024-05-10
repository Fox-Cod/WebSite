import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function Nav() {
  const [auth, setAuth] = useState(false);
  const [userProfile, setUserProfile] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = () => {
    return location.pathname === '/';
  };


  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8081/logout', null, { withCredentials: true });
      console.log(response.data);
      if (response.data.Status === 'Success') {
        navigate('/');
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileResponse, roleResponse] = await Promise.all([
          axios.get('http://localhost:8081/api/profile', { withCredentials: true }),
        ]);
  
        setUserProfile(profileResponse.data.profile);
        setAuth(true)
      } catch (err) {
        setAuth(false)
        console.log(err)
      }
    };
  
    fetchData();
  }, []);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    const navbar = document.getElementById('navbar');

    if (navbar) {
      if (scrollTop > 0) {
        if (isHomePage()) {
          navbar.classList.add('navbar-dark', 'bg-white');
        }
        navbar.classList.remove('navbar-dark', 'navbar-transparent', 'text-dark');
      } else {
        if (isHomePage()) {
          navbar.classList.add('navbar-dark', 'navbar-transparent', 'text-dark');
        }
        navbar.classList.remove('navbar-dark', 'bg-white');
      }
    }
  };

  // Добавление и удаление обработчика прокрутки страницы при монтировании и размонтировании компонента
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div style={{ paddingTop: isHomePage() ? '0' : '60px' }}>
      <nav id="navbar" className={`navbar navbar-expand-lg navbar-end fixed-top navbar-dark ${isHomePage() ? 'navbar-transparent' : ''}`} style={{ transition: "background-color 0.3s ease" }}>
        <div className="container">
          <div className="navbar-nav-wrap">
            {/* navbar navbar-expand-lg navbar-shadow navbar-end */}
            <div className="navbar-brand-wrapper">
              <Link to="/" className="navbar-brand">
                <img src="../assets/img/logo/RbgBrain.png" alt="Default Avatar" className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="38" height="38"/>
              </Link>
            </div>

            <nav className="collapse navbar-collapse">
              <ul className="navbar-nav ms-auto" >

                <li className="nav-item">
                  <Link to="/" className="nav-link text-body">
                    Inicio
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/form" className="nav-link text-body">
                    Forms
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/tools" className="nav-link text-body">
                    Ferramentos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/faq" className="nav-link text-body">
                    FAQs
                  </Link>
                </li>

                { auth ? (
                <li className="nav-item">
                  <div className="dropdown">
                    <button type="button" className="btn btn-ghost-secondary btn-icon rounded-circle me-2" id="navbarNotificationsDropdown" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside" data-bs-dropdown-animation>
                      <i className="bi-bell"></i>
                      <span className="btn-status btn-sm-status btn-status-danger"></span>
                    </button>

                    <div className="dropdown-menu dropdown-menu-end dropdown-card navbar-dropdown-menu navbar-dropdown-menu-borderless" aria-labelledby="navbarNotificationsDropdown" style={{ width: '25rem' }}>
                      <div className="card">
                        <div className="card-header card-header-content-between">
                          <h4 className="card-title mb-0">Notificações</h4>
                        </div>

                        <div className="card-body-height">
                          <div className="tab-content" id="notificationTabContent">
                            <div className="tab-pane fade show active" id="notificationNavOne" role="tabpanel" aria-labelledby="notificationNavOne-tab">
                              <ul className="list-group list-group-flush navbar-card-list-group">
                                <li className="list-group-item form-check-select">

                                  <div className="row">
                                    <div className="col-auto">
                                      <div className="d-flex align-items-center">
                                        <label className="form-check-label" htmlFor="notificationCheck1"></label>
                                        <span className="form-check-stretched-bg"></span>
                                      </div>                           
                                      {/* <img className="avatar avatar-sm avatar-circle" src="./assets/img/160x160/img3.jpg" alt="Descrição da Imagem" /> */}
                                    </div>

                                    <div className="col ms-n2">
                                      <h5 className="mb-1">Brian Warner</h5>
                                      <p className="text-body fs-5">alterou um problema de "Em Progresso" para <span className="badge bg-success">Revisão</span></p>
                                    </div>

                                    <small className="col-auto text-muted text-cap">2 horas</small>
                                  </div>

                                  <a className="stretched-link" href="#"></a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <a className="card-footer text-center" href="#">
                          Ver todas as notificações <i className="bi-chevron-right"></i>
                        </a>
                      </div>
                    </div>
                    <Link
                      to="#"
                      className="navbar-dropdown-account-wrapper"
                      id="accountNavbarDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      data-bs-auto-close="outside"
                      data-bs-dropdown-animation
                    >
                      <div className="avatar avatar-sm avatar-circle">
                        <span className="avatar-img avatar-soft-dark" title={userProfile.name}>
                            <span className="avatar-initials">{userProfile?.name?.charAt(0).toUpperCase()}</span>
                        </span>
                        <span className="avatar-status avatar-sm-status avatar-status-success"></span>
                      </div>
                    </Link>

                    <div className="dropdown-menu dropdown-menu-end navbar-dropdown-menu navbar-dropdown-menu-borderless navbar-dropdown-account" aria-labelledby="accountNavbarDropdown" style={{ width: '16rem' }}>

                      <div className="dropdown-item-text">
                          <h6 className="text-muted">{userProfile.role}</h6>
                        <div className="d-flex align-items-center">
                          <div className="avatar avatar-sm avatar-circle">
                            <span className="avatar-img avatar-soft-dark" title={userProfile.name}>
                              <span className="avatar-initials">{userProfile?.name?.charAt(0).toUpperCase()}</span>
                          </span>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h5 className="mb-0">{userProfile.name}</h5>
                            <p className="mb-0">{userProfile.email}</p>
                          </div>
                        </div>
                      </div>


                      <Link to="/user-profile" className="dropdown-item"><i class="bi bi-person"></i> Profil </Link>
                      <Link to="/user-profile-settings" className="dropdown-item"><i class="bi bi-gear"></i> Configurações </Link>
                      <Link to="/team-list" className="dropdown-item"><i class="bi bi-people"></i> Equipa </Link>

                      {userProfile.role == "administrador" ? <Link to="/admin-page" className="dropdown-item text-primary"><i class="bi bi-person-gear"></i> AdminPage </Link> : ""}
                      
                      <div className="dropdown-divider"></div>

                      <Link to="/faq" className="dropdown-item"><i class="bi bi-question-circle"></i> Apoio </Link>

                      <div className="dropdown-divider"></div>

                      <button className="dropdown-item" onClick={handleLogout}>
                        <span className='text-danger'><i class="bi bi-box-arrow-right"></i> Sign out</span>
                      </button>

                    </div>
                  </div>

                </li>
                  ) : (
                    <div>
                      <Link to="/sign-in" className="navbar-dropdown-account-wrapper">
                        <div className="avatar avatar-sm avatar-circle">
                          <img className="avatar-img" src="../assets/default-avatar-profile-icon.jpg" alt="Image Description" />
                        </div>
                      </Link>
                    </div>
                  )}
              </ul>
            </nav>
          </div>
        </div>
      </nav>
    </div>
  );
}
