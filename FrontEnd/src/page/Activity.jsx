import React, { useEffect, useState } from 'react';
import { AddAndSearchActivity, Pagination } from './component/Other';
import { Link } from "react-router-dom";
import { activity } from '../http/deviceAPI';
import { useTranslation } from 'react-i18next';
import { SearchComponentForActivities, FilterForActivity } from './component/Search';
import Cookies from 'js-cookie';

export default function Activity() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

  const { t } = useTranslation();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favsFromCookie = Cookies.get('favorites');
    if (favsFromCookie) {
      setFavorites(favsFromCookie.split(',').map(Number));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await activity();
        const sortedData = res.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
        setData(sortedData);
        setFilteredData(sortedData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const toggleFavorite = (id) => {
    const updatedFavorites = favorites.includes(id)
      ? favorites.filter(favId => favId !== id)
      : [...favorites, id];

    setFavorites(updatedFavorites);
    Cookies.set('favorites', updatedFavorites.join(','), { expires: 365 });
  };

  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    return date.toDateString() === new Date().toDateString()
      ? date.toLocaleTimeString('default', { hour: 'numeric', minute: 'numeric' })
      : date.toLocaleDateString('default', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const currentPosts = filteredData.slice(indexOfLastPost - postsPerPage, indexOfLastPost);

  const handleFilter = (filters) => {
    const { subjects, years, educations } = filters;
    const filtered = data.filter(item =>
      (!subjects.length || subjects.includes(item.subjects.nameSubject)) &&
      (!years.length || years.includes(item.years.year)) &&
      (!educations.length || educations.includes(item.educations.nameEducation))
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

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
        <div className="card">
          <div className="card-header card-header-content-md-between">
            <div className="mb-2">
              <SearchComponentForActivities posts={data} />
            </div>
            <div className="d-grid d-sm-flex justify-content-md-end align-items-sm-center">
              <FilterForActivity onFilter={handleFilter} />
              <AddAndSearchActivity />
            </div>
          </div>
        </div>
        {currentPosts.map(d => (
          <div className="my-3 p-3 rounded shadow-sm card" key={d.idActivity} style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <div className="d-flex align-items-start">
              <div className="avatar avatar-sm avatar-circle me-2">
                <span className="avatar-soft-dark" title={d.users.name}>
                  <span className="bd-placeholder-img flex-shrink-0 me-2 rounded avatar-initials">{d.users.name.charAt(0).toUpperCase()}</span>
                </span>
              </div>
              <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-1">
                    <small className="text-muted">
                      <Link to={`/view-profile/${d.users.idTeacher}`}>{d.users.name}</Link> | {formatDate(d.publishDate)}
                    </small>
                  </h5>
                  <i className={`bi ${favorites.includes(d.idActivity) ? 'bi-bookmark-fill bookmark' : 'bi-bookmark bookmark'}`} role='button' onClick={() => toggleFavorite(d.idActivity)}></i>
                </div>
                <div>
                  <strong className="text-gray-dark">{d.title}</strong>
                </div>
                <div>
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
                  <Link to={`/activity/view-activity/${d.idActivity}`} className="link">{t('more')}</Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={filteredData.length}
          paginate={setCurrentPage}
          currentPage={currentPage}
        />
      </main>
    </div>
  );
}
