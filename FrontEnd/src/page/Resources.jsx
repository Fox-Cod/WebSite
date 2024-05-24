import React, { useState, useEffect } from 'react';
import { AddAndSearchResources } from './component/Other';
import { Link } from "react-router-dom";
import { resources } from '../http/deviceAPI';

export default function Resources() {
  const [files, setFiles] = useState([]);

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
    <div className="container mt-4">
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
      <main>
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
                              <span className="d-none d-sm-inline-block"></span>
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
  )
}
