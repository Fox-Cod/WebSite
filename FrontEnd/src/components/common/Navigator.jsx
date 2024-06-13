import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../../api/userAPI';
import { profile } from '../../api/deviceAPI';
import { Context } from '../../contexts/context';
import { useTranslation } from 'react-i18next';

export default function Nav() {
  const auth = useContext(Context);
  const [userProfile, setUserProfile] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  const isHomePage = () => location.pathname === '/';

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      window.location.href = '/';
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await profile();
        setUserProfile(res.profile);
        console.log("User is authenticated");
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.getElementById('theme-link').href = '/css/theme-dark.min.css';
    } else {
      setDarkMode(false);
      document.getElementById('theme-link').href = '/css/theme.min.css';
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    const newTheme = !darkMode ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    document.getElementById('theme-link').href = newTheme === 'dark' ? '/css/theme-dark.min.css' : '/css/theme.min.css';
  };

  const { t } = useTranslation();

  return (
    <div style={{ paddingTop: isHomePage() ? '0' : '60px' }}>
      <nav id="navbar" className='navbar navbar-expand-lg navbar-end fixed-top bg-body border-bottom shadow-sm'>
        <div className="container">
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <img src="/assets/img/logo/RbgBrain.png" alt="Default Avatar"className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="38" height="38" />
            <div>
              <h2 className="mb-0 text-body">PRED</h2>
            </div>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link text-body">
                  {t('home')}
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/form" className="nav-link text-body">
                  {t('forum')}
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/tools" className="nav-link text-body">
                  {t('tool')}
                </Link>
              </li>
              <li className="nav-item">
                <div className="dropdown">
                  <Link to="#" className="navbar-dropdown-account-wrapper">
                    <div className="avatar-sm avatar-circle">
                      <span className="avatar-img" onClick={toggleDarkMode}>
                        {darkMode ? <i className="avatar-initials bi bi-sun-fill"></i> : <i className="avatar-initials bi bi-moon-fill"></i>}
                      </span>
                    </div>
                  </Link>
                </div>
              </li>
              {auth.user._isAuth ? (
                <li className=" dropdown">
                  <Link to="#" className="navbar-dropdown-account-wrapper" id="accountNavbarDropdown" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside" data-bs-dropdown-animation>
                    <div className="avatar avatar-sm avatar-circle">
                      <span className="avatar-img avatar-soft-dark" title={userProfile.name}>
                        <span className="avatar-initials">{userProfile?.name?.charAt(0).toUpperCase()}</span>
                      </span>
                      <span className="avatar-status avatar-sm-status avatar-status-success"></span>
                    </div>
                  </Link>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="accountNavbarDropdown" style={{ width: '16rem' }}>
                    <li className="dropdown-item-text">
                      {/* <h6 className="text-muted">{userProfile.role}</h6> */}
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
                    </li>
                    <li><Link to="/user-profile" className="dropdown-item"><i className="bi bi-person"></i> {t('profile')}</Link></li>
                    <li><Link to="/user-profile-settings" className="dropdown-item"><i className="bi bi-gear"></i> {t('settings')}</Link></li>
                    <li><Link to="/team-list" className="dropdown-item"><i className="bi bi-people"></i> {t('teams')}</Link></li>
                    {userProfile.role === "administrador" && <li><Link to="/admin-page" className="dropdown-item text-primary"><i className="bi bi-person-gear"></i> {t('admin_page')}</Link></li>}
                    <li><Link to="/about-us" className="dropdown-item"><i className="bi bi-question-circle"></i> {t('about')}</Link></li>
                    <li><div className="dropdown-divider"></div></li>
                    <li><button className="dropdown-item" onClick={handleLogout}><span className="text-danger"><i className="bi bi-box-arrow-right"></i> {t('sign_out')}</span></button></li>
                  </ul>
                </li>
              ) : (
                <li className="d-flex align-items-center">
                  <Link to="/sign-in" className="nav-link p-0 me-2">
                    <button type="button" className="btn btn-white">Log In</button>
                  </Link>

                  <Link to="/sign-up" className="nav-link p-0">
                    <button type="button" className="btn btn-outline-primary">Sign Up</button>
                  </Link>
                </li>

              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
