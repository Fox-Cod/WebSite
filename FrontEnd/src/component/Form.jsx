import React, { useEffect, useState } from "react";
import { NavForm } from './Other';
import { Link } from "react-router-dom";
import axios from "axios";

export default function Form() {
  const [data, setData] = useState([]);
  const [files, setFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/activity");
      setData(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchFiles = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/files');
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching files: ', error);
    }
  };


  useEffect(() => {
    fetchData();
    fetchFiles();
  }, []);

  function formatDate(rawDate) {
    const dataRegistro = new Date(rawDate);
    const day = dataRegistro.getDate();
    const month = dataRegistro.toLocaleString("default", { month: "long" });
    const year = dataRegistro.getFullYear();
    return `${day} ${month} ${year}`;
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div>
      <NavForm />
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

        <div className="my-3 p-3 bg-body rounded shadow-sm">
          <h6 className="border-bottom pb-2 mb-0">Atividades - Novo!</h6>
        </div>

        {currentPosts.slice(0, 3).map((d, i) => (
          <div className="my-3 p-3 bg-body rounded shadow-sm" key={i}>
            <div className="d-flex text-body-secondary">
              <div className="avatar avatar-sm avatar-circle me-2" width="32" height="32">
                <span className="avatar-soft-dark" title={d.professores.nome_professor}>
                  <span className="bd-placeholder-img flex-shrink-0 me-2 rounded avatar-initials">{d.professores.nome_professor.charAt(0).toUpperCase()}</span>
                </span>
              </div>
              <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                <div className="d-flex justify-content-between">
                  <h5 className="mb-1">
                    <Link to={`/view-profile/${d.professores.id_professor}`}>
                      {d.professores.nome_professor}
                    </Link>
                  </h5>
                </div>
                <div className="d-flex justify-content-between">
                  <strong className="text-gray-dark">{d.titulo}</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-gray-dark">
                    {d.descricao.length > 200
                      ? `${d.descricao.substring(0, 200)}...`
                      : d.descricao}
                  </span>
                </div>
                <span
                  className="badge bg-soft-primary text-primary rounded-pill me-1"
                  title="Disciplina"
                >
                  <span className="legend-indicator bg-primary"></span>
                  {d.disciplinas.nome_disciplina}
                </span>
                <span
                  className="badge bg-soft-primary text-success rounded-pill me-1"
                  title="Ensino"
                >
                  <span className="legend-indicator bg-success"></span>
                  {d.nivel_ensino.nome_ensino}
                </span>
                <span
                  className="badge bg-soft-primary text-warning rounded-pill"
                  title="Ano"
                >
                  <span className="legend-indicator bg-warning"></span>
                  {d.anos.ano}
                </span>
                <br />
              </div>
            </div>
            <div className="d-flex justify-content-between mt-1">
              <div className='d-block'>
                <h6 className="text-secondary">{formatDate(d.data_criacao)}</h6>
              </div>
              <div className='d-block text-end'>
                <Link to={`/view-activity/${d.id}`}>Mais</Link>
              </div>
            </div>
          </div>
        ))}

        {files.slice(0, 3).map((file) => (
          <div className="my-3 p-3 bg-body rounded shadow-sm">
            <div className="d-flex text-body-secondary pt-3">
              <div className="avatar avatar-sm avatar-circle me-2" width="32" height="32">
                <span className="avatar-soft-dark" title={file.professores.nome_professor}>
                  <span className="bd-placeholder-img flex-shrink-0 me-2 rounded avatar-initials">{file.professores.nome_professor.charAt(0).toUpperCase()}</span>
                </span>
              </div>
              <div className="pb-3 mb-0 small lh-sm border-bottom w-100">

                <div className="content">
                  <ul className="list-group">
                    <h5 className="mb-1"><Link to={`/view-profile/${file.professores.id_professor}`}>{file.professores.nome_professor}</Link></h5>
                    <h6>{file.title}</h6>
                    <li key={file.id} className="list-group-item">
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <img className="avatar avatar-xs avatar-4x3" src="../assets/svg/components/placeholder-img-format.svg" alt="Img" />
                        </div>

                        <div className="col">
                          <h5 className="mb-0">
                            <Link to={`http://localhost:8081/api/files/${file.filename}`} download>{file.filename}</Link>
                          </h5>
                          <ul className="list-inline list-separator small text-body">
                            <li className="list-inline-item">Data de publicação: {formatDate(file.publishDate)}</li>
                            <li className="list-inline-item">Tamanho do ficheiro: {formatBytes(file.fileSize)}</li>
                          </ul>
                        </div>

                        <div className="col-auto">
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
