import React, { useState, useEffect } from 'react';
import { AddAndSearchResources, Pagination } from './component/Other';
import { Link } from "react-router-dom";
import { resources } from '../http/deviceAPI';
import { useTranslation } from 'react-i18next';

export default function Resources() {
  const [files, setFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await resources();
        setFiles(res);
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

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = files.slice(indexOfFirstPost, indexOfLastPost);

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
                  <Link className="nav-link " to="/activity" data-placement="left">
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
        <AddAndSearchResources />

        {/* Recursos */}
        {currentPosts.map((file) => (
          <div className="my-3 p-3 rounded shadow-sm card">
            <div className="d-flex text-body-secondary pt-3">
              <div className="avatar avatar-sm avatar-circle me-2" width="32" height="32">
                <span className="avatar-soft-dark" title={file.users.name}>
                  <span className="bd-placeholder-img flex-shrink-0 me-2 rounded avatar-initials">{file.users.name.charAt(0).toUpperCase()}</span>
                </span>
              </div>
              <div className="pb-3 small lh-sm border-bottom w-100">

                <div className="content">
                  <ul className="list-group">
                    <h5 className="mb-1"><Link to={`/view-profile/${file.users.idTeacher}`}>{file.users.name}</Link></h5>
                    <h5>{file.title}</h5>
                    <li key={file.id} className="list-group-item">
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <img className="avatar avatar-xs avatar-4x3" src="../assets/svg/components/placeholder-img-format.svg" alt="Img" />
                        </div>

                        <div className="col">
                          <h5 className="mb-0" title={t('download')}>
                            <Link to={`http://localhost:8081/api/files/${file.fileName}`} download>{file.fileName}</Link>
                          </h5>
                          <ul className="list-inline list-separator small text-body">
                            <li className="list-inline-item">{t('date_published')} {formatDate(file.publishDate)}</li>
                            <li className="list-inline-item">{t('file_size')} {formatBytes(file.fileSize)}</li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}

        <Pagination
          dataPerPage={postsPerPage}
          totalDatas={files.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </main>
    </div>
  )
}
