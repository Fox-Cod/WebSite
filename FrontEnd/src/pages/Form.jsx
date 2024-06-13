import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { activity, resources } from "../api/deviceAPI";
import { useTranslation } from 'react-i18next';

export default function Form() {
  const [data, setData] = useState([]);
  const [files, setFiles] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [filesData, activityData] = await Promise.all([resources(), activity()]);
        const sortedActivityData = activityData.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
        const sortedResourceData = filesData.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
        setFiles(sortedResourceData);
        setData(sortedActivityData);
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

  if (isLoading) {
    return (
      <div className="container text-center mt-9">
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
                <Link className="nav-link active" to="/form" data-placement="left">
                  <i className="bi bi-house dropdown-item-icon"></i> {t('home')}
                </Link>
              </li>
              <li className='nav-item'>
                <Link className="nav-link" to="/activity" data-placement="left">
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
      <main className="card card-body">
        {data.length === 0 && files.length === 0 && (
          <div className="container text-center mt-9">
            <img src="../assets/svg/illustrations/oc-browse-file.svg" alt="Image Description" style={{ height: '15rem' }} />
            <p>Ainda não há dados.</p>
          </div>
        )}
        {data.slice(0, 3).map((d, i) => (
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
                    <small className="text-muted"><Link to={`/profile/view-profile/${d.users.idTeacher}`}>{d.users.name}</Link> | {formatDate(d.publishDate)}</small>
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
                <div className="d-flex justify-content-between align-items-center">
                  <Link to={`/activity/view-activity/${d.idActivity}`} className="link">{t('more')}</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        {files.slice(0, 3).map((file) => (
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
        ))}
      </main>
    </div>
  );
}
