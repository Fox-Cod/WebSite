import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { oneResource } from '../../api/deviceAPI';

export default function ViewResources() {
  const [dataResource, setOneResourceData] = useState({});
  const [loading, setLoading] = useState(true);

  const { resourceId } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await oneResource(resourceId);
        setOneResourceData(res);
        setLoading(false);
      } catch (error) {
        console.error('Erro durante o carregamento de dados:', error);
        setError('Erro ao carregar dados. Por favor, tente novamente.');
        setLoading(false);
      }
    }

    fetchData();
  }, [resourceId]);

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

  if (!dataResource) {
    return <div>Resource not found</div>;
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
      <main className="card card-body">
        <div className="my-3 p-3 rounded shadow-sm card" style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <div className="d-flex align-items-start">
            <div className="avatar avatar-sm avatar-circle me-2">
              <span className="avatar-soft-dark" title={dataResource.users.name}>
                <span className="bd-placeholder-img flex-shrink-0 me-2 rounded avatar-initials">{dataResource.users.name.charAt(0).toUpperCase()}</span>
              </span>
            </div>
            <div className="flex-grow-1">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-1">
                  <small className="text-muted"><Link to={`/profile/view-profile/`}>{dataResource.users.name}</Link> | {formatDate(dataResource.publishDate)} | favorites </small>
                </h5>
              </div>
              <div className="d-flex justify-content-between">
                <strong className="text-gray-dark">{dataResource.title}</strong>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-gray-dark">{dataResource.description}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="badge bg-secondary mb-2">{dataResource.type}</span>
              </div>
              {dataResource.type === 'Ficheiro' ? (
                <div className='card p-3'>
                  <li className="list-group-item">
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <img className="avatar avatar-xs avatar-4x3" src="/assets/svg/components/placeholder-img-format.svg" alt="Img" />
                      </div>
                      <div className="col">
                        <h5 className="mb-0" title={t('download')}>
                          <Link to={`http://localhost:8081/api/files/${dataResource.fileName}`} download>{dataResource.fileName}</Link>
                        </h5>
                        <ul className="list-inline list-separator small text-body">
                          <li className="list-inline-item">{t('file_size')} {formatBytes(dataResource.fileSize)}</li>
                        </ul>
                      </div>
                    </div>
                  </li>
                </div>
              ) : dataResource.type === 'Video' ? (
                <div className="d-flex justify-content-center align-items-center my-3">
                  <ReactPlayer url={dataResource.link} className="video-player" controls width="50%" />
                </div>
              ) : <div className="d-flex justify-content-end align-items-center">
                <Link to={dataResource.link} className="btn btn-outline-primary btn-sm me-2">Link</Link>
              </div>}

            </div>
          </div>
        </div>

      </main >

    </div >
  );
}

