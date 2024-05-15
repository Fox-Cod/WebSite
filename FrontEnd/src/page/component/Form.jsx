import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { activity, resources } from "../../http/deviceAPI";

export default function Form() {
  const [data, setData] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [filesRes, activityRes] = await Promise.all([resources(), activity()]);
  
        setFiles(filesRes);
        setData(activityRes);
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
    <div>
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
                  <Link className="nav-link " to="/activity" data-placement="left">
                    <i className="bi bi-activity dropdown-item-icon"></i> Atividades
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className="nav-link " to="/resources" data-placement="left">
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
              <li className="breadcrumb-item active">
                <a className="breadcrumb-link">Inicio</a>
              </li>
            </ol>
          </nav>
        </div>
        {data.slice(0, 3).map((d, i) => (
          <div className="my-3 p-3 bg-body rounded shadow-sm" key={i}>
            <div className="d-flex text-body-secondary">
              <div className="avatar avatar-sm avatar-circle me-2" width="32" height="32">
                <span className="avatar-soft-dark" title={d.users.name}>
                  <span className="bd-placeholder-img flex-shrink-0 me-2 rounded avatar-initials">{d.users.name.charAt(0).toUpperCase()}</span>
                </span>
              </div>
              <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                <div className="d-flex justify-content-between">
                  <h5 className="mb-1">
                    <Link to={`/view-profile/${d.users.idTeacher}`}>
                      {d.users.name}
                    </Link>
                  </h5>
                </div>
                <div className="d-flex justify-content-between">
                  <strong className="text-gray-dark">{d.title}</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-gray-dark">
                    {d.description.length > 200
                      ? `${d.description.substring(0, 200)}...`
                      : d.description}
                  </span>
                </div>
                <span
                  className="badge bg-soft-primary text-primary rounded-pill me-1"
                  title="Disciplina"
                >
                  <span className="legend-indicator bg-primary"></span>
                  {d.subjects.nameSubject}
                </span>
                <span
                  className="badge bg-soft-primary text-success rounded-pill me-1"
                  title="Ensino"
                >
                  <span className="legend-indicator bg-success"></span>
                  {d.educations.nameEducation}
                </span>
                <span
                  className="badge bg-soft-primary text-warning rounded-pill"
                  title="Ano"
                >
                  <span className="legend-indicator bg-warning"></span>
                  {d.years.year}
                </span>
                <br />
              </div>
            </div>
            <div className="d-flex justify-content-between mt-1">
              <div className='d-block'>
                <h6 className="text-secondary">{formatDate(d.publishDate)}</h6>
              </div>
              <div className='d-block text-end'>
                <Link to={`/view-activity/${d.idActivity}`}>Mais</Link>
              </div>
            </div>
          </div>
        ))}

        {files.slice(0, 3).map((file) => (
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
  );
}
