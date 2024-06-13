import React, { useState, useEffect, useContext } from 'react';
import { AddAndSearchResources, Pagination } from '../../components/Other';
import { Link } from "react-router-dom";
import { resources } from '../../api/deviceAPI';
import { useTranslation } from 'react-i18next';
import { SearchComponentForResources, FilterForResource } from '../../components/specific/Search';
import Cookies from 'js-cookie';
import { Context } from '../../contexts/context';

export default function Resources() {
  const { user } = useContext(Context);
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [postsPerPage] = useState(8);

  const { t, i18n } = useTranslation();

  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    let updatedFavorites = [...favorites];
    if (favorites.includes(id)) {
      updatedFavorites = updatedFavorites.filter((favId) => favId !== id);
    } else {
      updatedFavorites.push(id);
    }

    setFavorites(updatedFavorites);
    Cookies.set('resourcesFavorites', updatedFavorites.join(','), { expires: 365 });
  };

  useEffect(() => {
    const favsFromCookie = Cookies.get('resourcesFavorites');
    if (favsFromCookie) {
      setFavorites(favsFromCookie.split(',').map(Number));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await resources();
        const sortedFiles = res.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
        setFiles(sortedFiles);
        setFilteredFiles(sortedFiles);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
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

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredFiles.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleFilter = (filters) => {
    const { type } = filters;
    const filtered = files.filter(item =>
      (!type.length || type.includes(item.type))
    );
    setFilteredFiles(filtered);
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <div className='container text-center mt-9'>
        <p>Loading...</p>
      </div>
    );
  }

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
                <Link className="nav-link" to="/activity" data-placement="left">
                  <i className="bi bi-activity dropdown-item-icon"></i> {t('activity')}
                </Link>
              </li>
              <li className='nav-item'>
                <Link className="nav-link active" to="/resources" data-placement="left">
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
              <SearchComponentForResources posts={files} />
            </div>
            <div className="d-grid d-sm-flex justify-content-md-end align-items-sm-center">
              <FilterForResource onFilter={handleFilter} />
              {user._isAuth ? (<AddAndSearchResources />) : (null)}
            </div>
          </div>
        </div>
        {currentPosts.length > 0 ? (
          currentPosts.map((file) => (
            <div className="my-3 p-3 rounded shadow-sm card" key={file.idResource} style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <div className="d-flex align-items-start">
                <div className="avatar avatar-sm avatar-circle me-2">
                  <span className="avatar-soft-dark" title={file.users.name}>
                    <span className="bd-placeholder-img flex-shrink-0 me-2 rounded avatar-initials">{file.users.name.charAt(0).toUpperCase()}</span>
                  </span>
                </div>
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-1">
                      <small className="text-muted">
                        <Link to={`/profile/view-profile/${file.users.idTeacher}`}>{file.users.name}</Link> | {formatDate(file.publishDate)}
                      </small>
                    </h5>
                    <i className={`bi ${favorites.includes(file.idResource) ? 'bi-bookmark-fill bookmark' : 'bi-bookmark bookmark'}`} role='button' onClick={() => toggleFavorite(file.idResource)}></i>
                  </div>
                  <div className="d-flex justify-content-between">
                    <strong className="text-gray-dark">{file.title}</strong>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-gray-dark">
                      {file.description.length > 200
                        ? `${file.description.substring(0, 200)}...`
                        : file.description}
                    </span>
                  </div>
                  <span className="badge bg-secondary mb-2">{file.type}</span>
                  {file.type === 'Ficheiro' && (
                    <div className='card p-3'>
                      <li className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-auto">
                            <img className="avatar avatar-xs avatar-4x3" src="../assets/svg/illustrations/placeholder-img-format.svg" alt="Img" />
                          </div>
                          <div className="col">
                            <h5 className="mb-0" title={t('download')}>
                              <Link to={`http://localhost:8081/api/files/${file.fileName}`} download>{file.fileName}</Link>
                            </h5>
                            <ul className="list-inline list-separator small text-body">
                              <li className="list-inline-item">{t('file_size')} {formatBytes(file.fileSize)}</li>
                            </ul>
                          </div>
                        </div>
                      </li>
                    </div>
                  )}
                  <div className="mb-2"></div>
                  <div className="d-flex align-items-center">
                    <Link to={`/resource/view-resource/${file.idResource}`} className="link">{t('more')}</Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='container text-center mt-9'>
            <img src="../assets/svg/illustrations/oc-browse-file.svg" alt="Image Description" style={{ height: '15rem' }} />
            <p>Ainda não há recursos.</p>
          </div>
        )}

        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={filteredFiles.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </main>
    </div>
  );
}
