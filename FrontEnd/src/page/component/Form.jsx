import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { activity, resources } from "../../http/deviceAPI";

export default function Form() {
  const [data, setData] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [filesData, activityData] = await Promise.all([resources(), activity()]);
        const sortedActivityData = activityData.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
        setFiles(filesData);
        setData(sortedActivityData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  
  function formatDate(rawDate) {
    const dataRegistro = new Date(rawDate);
    const day = dataRegistro.getDate();
    const month = dataRegistro.toLocaleString("default", { month: "long" });
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
                  <Link className="nav-link active" to="/form" data-placement="left">
                    <i className="bi bi-house dropdown-item-icon"></i> Inicio
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className="nav-link" to="/activity" data-placement="left">
                    <i className="bi bi-activity dropdown-item-icon"></i> Atividades
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className="nav-link" to="/resources" data-placement="left">
                    <i className="bi bi-file-earmark-arrow-down dropdown-item-icon"></i> Recursos
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className="nav-link" to="/tools" data-placement="left">
                    <i className="bi bi-tools dropdown-item-icon"></i> Ferramentas
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
      <main>
        {data.slice(0, 3).map((d, i) => (
          <div className="my-3 p-3 bg-body rounded shadow-sm" key={i} style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <div className="d-flex align-items-start">
              <div className="avatar avatar-sm avatar-circle me-2">
                <span className="avatar-soft-dark" title={d.users.name}>
                  <span className="bd-placeholder-img flex-shrink-0 me-2 rounded avatar-initials">{d.users.name.charAt(0).toUpperCase()}</span>
                </span>
              </div>
              <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-1">
                    <Link to={`/view-profile/${d.users.idTeacher}`} className="text-decoration-none">{d.users.name}</Link>
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
                  <small className="text-muted">{formatDate(d.publishDate)}</small>
                  <Link to={`/view-activity/${d.idActivity}`} className="btn btn-outline-primary btn-sm">Mais</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        {files.slice(0, 3).map((file, i) => (
          <div className="my-3 p-3 bg-body rounded shadow-sm" key={i} style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <div className="d-flex align-items-start">
              <div className="avatar avatar-sm avatar-circle me-2">
                <span className="avatar-soft-dark" title={file.users.name}>
                  <span className="bd-placeholder-img flex-shrink-0 me-2 rounded avatar-initials">{file.users.name.charAt(0).toUpperCase()}</span>
                </span>
              </div>
              <div className="flex-grow-1">
                <h5 className="mb-1">
                  <Link to={`/view-profile/${file.users.idTeacher}`} className="text-decoration-none">{file.users.name}</Link>
                </h5>
                <h6 className="fw-bold mt-2">{file.title}</h6>
                <ul className="list-group">
                  <li className="list-group-item">
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
                    </div>
                  </li>
                </ul>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <small className="text-muted">{formatDate(file.publishDate)}</small>
                  <Link to={`http://localhost:8081/api/files/${file.fileName}`} className="btn btn-outline-primary btn-sm">Baixar</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
