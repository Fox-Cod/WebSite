import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AddAndSearchResources } from './component/Other';
import { Link } from "react-router-dom";

export default function Resources() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Получаем список файлов при загрузке компонента
    const fetchFiles = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/files');
        setFiles(response.data);
      } catch (error) {
        console.error('Error fetching files: ', error);
      }
    };

    fetchFiles();
  }, []);

  const getIconPath = fileType => {
    const fileExtension = fileType.split('/')[1];
    return `/assets/svg/brands/${fileExtension}.svg`;
  };

  function formatDate(rawDate) {
    const dataRegistro = new Date(rawDate);
    const day = dataRegistro.getDate();
    const month = dataRegistro.toLocaleString('default', { month: 'long' });
    const year = dataRegistro.getFullYear();
    return `${day} ${month} ${year}`;
  }

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };


  return (
    <div>
      <div>
      <header id="header" className="navbar navbar-expand-lg navbar-bordered navbar-spacer-y-0 flex-lg-column">
        <div className="container">
          <nav className="js-mega-menu flex-grow-1">
            <div className="collapse navbar-collapse" id="navbarDoubleLineContainerNavDropdown">

              <ul className="nav nav-tabs align-items-center">
                <li className='nav-item'>
                  <Link className="nav-link " to="/form" data-placement="left">
                    <i className="bi bi-house dropdown-item-icon"></i> Inicio
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className="nav-link " to="/activity" data-placement="left">
                    <i className="bi bi-activity dropdown-item-icon"></i> Atividades
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className="nav-link active" to="/resources" data-placement="left">
                    <i className="bi bi-file-earmark-arrow-down dropdown-item-icon"></i> Recursos
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className="nav-link " to="/tools" data-placement="left">
                    <i className="bi bi-tools dropdown-item-icon"></i>Ferramentos
                  </Link>
                </li>
              </ul>

            </div>
          </nav>
        </div>
      </header>
        <main className="container">
          <div className="my-2 p-3 bg-body rounded shadow-sm">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb breadcrumb-no-gutter border-bottom pb-0 mb-0">
                <li className="breadcrumb-item"><Link className="breadcrumb-link" to="/form">Inicio</Link></li>
                <li className="breadcrumb-item active"><Link className="breadcrumb-link" to="/resources">Recursos</Link></li>
              </ol>
            </nav>
          </div>
          <AddAndSearchResources />

          {/* Recursos */}
          {files.map((file) => (
            <div className="my-3 p-3 bg-body rounded shadow-sm">
              <div className="d-flex text-body-secondary pt-3">
                <div className="avatar avatar-sm avatar-circle me-2" width="32" height="32">
                  <span className="avatar-soft-dark" title={file.users.name}>
                    <span className="bd-placeholder-img flex-shrink-0 me-2 rounded avatar-initials">{file.users.name.charAt(0).toUpperCase()}</span>
                  </span>
                </div>
                <div className="pb-3 mb-0 small lh-sm border-bottom w-100">

                  <div className="content">
                    <ul className="list-group">
                      <h5 className="mb-1"><Link to={`/view-profile/${file.users.idTeacher}`}>{file.users.name}</Link></h5>
                      <h6>{file.title}</h6>
                      <li key={file.id} className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-auto">
                            <img className="avatar avatar-xs avatar-4x3" src="../assets/svg/components/placeholder-img-format.svg" alt="Img" />
                          </div>

                          <div className="col">
                            <h5 className="mb-0">
                              <Link to={`http://localhost:8081/api/files/${file.fileName}`} download>{file.fileName}</Link>
                            </h5>
                            <ul className="list-inline list-separator small text-body">
                              <li className="list-inline-item">Data de publicação: {formatDate(file.publishDate)}</li>
                              <li className="list-inline-item">Tamanho do ficheiro: {formatBytes(file.fileSize)}</li>
                            </ul>
                          </div>

                          {/* <div className="col-auto">
                            <div className="dropdown">
                              <button type="button" className="btn btn-white btn-sm" id="filesListDropdown1" data-bs-toggle="dropdown" aria-expanded="false">
                                <span className="d-none d-sm-inline-block me-1">Mais</span>
                                <i className="bi-chevron-down"></i>
                              </button>

                              <div className="dropdown-menu dropdown-menu-end" aria-labelledby="filesListDropdown1" style={{ minWidth: '13rem' }}>
                                <span className="dropdown-header">Definições</span>

                                <a className="dropdown-item" href="#">
                                  <i className="bi-download dropdown-item-icon"></i> Descarregar
                                </a>

                                <div className="dropdown-divider"></div>

                                <a className="dropdown-item" href="#">
                                  <i className="bi-trash dropdown-item-icon"></i> Eliminar
                                </a>
                              </div>
                            </div>
                          </div> */}
                        </div>
                      </li>

                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  )
}
