import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../../http/userAPI';
import { profile } from '../../http/deviceAPI';
import { Context } from '../../context';

export default function Nav() {
  const auth = useContext(Context);
  const [userProfile, setUserProfile] = useState('');
  const location = useLocation();

  const isHomePage = () => {
    return location.pathname === '/';
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      window.location.href = '/';
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (auth.user._isAuth) {
          const res = await profile();
          setUserProfile(res.profile)
          console.log("User is authenticated");
        } else {
          console.log("User is not authenticated");
        }
      } catch (err) {
        console.log(err);
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
                <img src="../assets/img/logo/RbgBrain.png" alt="Default Avatar" className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="38" height="38" />
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

                {auth.user._isAuth ? (
                  <li className="nav-item">
                    <div className="dropdown">
                      <Link to="#" className="navbar-dropdown-account-wrapper" id="accountNavbarDropdown" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside" data-bs-dropdown-animation >
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

                        <Link to="/user-profile" className="dropdown-item"><i className="bi bi-person"></i> Profil </Link>
                        <Link to="/user-profile-settings" className="dropdown-item"><i className="bi bi-gear"></i> Configurações </Link>
                        <Link to="/team-list" className="dropdown-item"><i className="bi bi-people"></i> Equipa </Link>

                        {userProfile.role == "administrador" ? <Link to="/admin-page" className="dropdown-item text-primary"><i className="bi bi-person-gear"></i> AdminPage </Link> : ""}

                        <div className="dropdown-divider"></div>

                        <Link to="/faq" className="dropdown-item"><i className="bi bi-question-circle"></i> Apoio </Link>

                        <div className="dropdown-divider"></div>

                        <button className="dropdown-item" onClick={handleLogout}>
                          <span className='text-danger'><i className="bi bi-box-arrow-right"></i> Sign out</span>
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
