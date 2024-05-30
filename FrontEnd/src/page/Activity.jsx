import React, { useEffect, useState } from 'react';
import { AddAndSearchActivity, Pagination } from './component/Other';
import { Link } from "react-router-dom";
import { activity } from '../http/deviceAPI';
import { useTranslation } from 'react-i18next';

export default function Activity() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await activity();
        setData(res.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate)));
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

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-4">
      <header id="header" className="navbar navbar-expand-lg navbar-spacer-y-0 flex-lg-column">
          <nav className="js-mega-menu flex-grow-1">
            <div className="collapse navbar-collapse" id="navbarDoubleLineContainerNavDropdown">
              <ul className="nav nav-tabs align-items-center">
                <li className='nav-item'>
                  <Link className="nav-link" to="/form" data-placement="left">
                    <i className="bi bi-house dropdown-item-icon"></i> {t('home')}
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className="nav-link active" to="/activity" data-placement="left">
                    <i className="bi bi-activity dropdown-item-icon"></i> {t('activity')}
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className="nav-link" to="/resources" data-placement="left">
                    <i className="bi bi-file-earmark-arrow-down dropdown-item-icon"></i> {t('resources')}
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className="nav-link" to="/tools" data-placement="left">
                    <i className="bi bi-tools dropdown-item-icon"></i> {t('tool')}
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
      </header>

      <main className='card card-body'>
        <AddAndSearchActivity />
        {currentPosts.map((d, i) => (
          <div className="my-3 p-3 rounded shadow-sm card" key={i} style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <div className="d-flex align-items-start">
              <div className="avatar avatar-sm avatar-circle me-2">
                <span className="avatar-soft-dark" title={d.users.name}>
                  <span className="bd-placeholder-img flex-shrink-0 me-2 rounded avatar-initials">{d.users.name.charAt(0).toUpperCase()}</span>
                </span>
              </div>
              <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-1">
                    <small className="text-muted"><Link to={`/view-profile/${d.users.idTeacher}`}>{d.users.name}</Link> | {formatDate(d.publishDate)}</small>
                  </h5>
                </div>
                <div className="d-flex justify-content-between">
                  <strong className="text-gray-dark">{d.title}</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-gray-dark">
                    {d.description.length > 200 ? `${d.description.substring(0, 200)}...` : d.description}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="badge bg-primary me-1">{d.subjects.nameSubject}</span>
                  <span className="badge bg-success me-1">{d.educations.nameEducation}</span>
                  <span className="badge bg-warning">{d.years.year}</span>
                </div>
                <div className="d-flex align-items-center">
                  <Link to={`/view-activity/${d.idActivity}`} className="link">{t('more')}</Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        <Pagination
          dataPerPage={postsPerPage}
          totalDatas={data.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </main>
    </div>
  );
}
