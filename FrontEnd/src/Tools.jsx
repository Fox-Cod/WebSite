import React, { useState, useEffect } from 'react';
import { NavForm } from './component/Other';
import { Link } from "react-router-dom";
import axios from "axios";

export default function Tools() {
  const [toolsData, setToolsData] = useState([]);
  const [formData, setFormData] = useState({
    titulo: '',
    link: '',
    sobre: '',
    aplicacao: '' || "Redes sociais e plataformas de ligação em rede",
    tipo: '' || "Apresentações e documentos",
    estado: '' || "Sem dados",
    icone: null,
  });

  const handleChange = (e) => {
    const { id, value, type } = e.target;
  
    if (type === 'file') {
      const file = e.target.files[0];
      setFormData((prevData) => ({ ...prevData, [id]: file }));
    } else {
      setFormData((prevData) => ({ ...prevData, [id]: value }));
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formDataToSend = new FormData();

      for (const key in formData) {
        if (key === 'icone') {
          formDataToSend.append(key, formData[key], formData[key].name);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }
      
  
      const response = await axios.post('http://localhost:8081/api/add-tool', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log(response.data); // Посмотрите, что возвращает сервер
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/view-tools')
      setToolsData(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);


  const getStatusBadge = (estado) => {
    switch (estado) {
      case 'Não está a funcionar':
        return (
          <span className="badge bg-soft-danger text-danger rounded-pill">
            <span className="legend-indicator bg-danger"></span> {estado}
          </span>
        );
      case 'Está a funcionar':
        return (
          <span className="badge bg-soft-success text-success rounded-pill">
            <span className="legend-indicator bg-success"></span> {estado}
          </span>
        );
      case 'Sem dados':
        return (
          <span className="badge bg-soft-warning text-warning rounded-pill">
            <span className="legend-indicator bg-warning"></span> {estado}
          </span>
        );
      default:
        return (
          <span className="badge bg-secondary text-dark rounded-pill">
            {estado}
          </span>
        );
    }
  };
  return (
    <div>
      <div>
        <NavForm />
        <main className="container p-3">
          <div className="my-2 p-3 bg-body rounded shadow-sm">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb breadcrumb-no-gutter border-bottom pb-0 mb-0">
                <li className="breadcrumb-item">
                  <Link className="breadcrumb-link" to="/form">
                    Inicio
                  </Link>
                </li>
                <li className="breadcrumb-item active">
                  <Link className="breadcrumb-link" to="/tools">
                    Ferramentos
                  </Link>
                </li>
              </ol>
            </nav>
          </div>

          <div className="card ">
            <div className="card-header card-header-content-md-between ">
              <div className="mb-2 mb-md-0">
                <form>
                  <div className="input-group input-group-merge input-group-flush">
                    <div className="input-group-prepend input-group-text">
                      <i className="bi-search"></i>
                    </div>
                    <input
                      id="datatableSearch"
                      type="search"
                      className="form-control"
                      placeholder="Pesquisar usuários"
                      aria-label="Pesquisar usuários"
                    />
                  </div>
                </form>
              </div>

              <div className="d-grid d-sm-flex justify-content-md-end align-items-sm-center gap-2">
                <div id="datatableCounterInfo" style={{ display: "none" }}>
                  <div className="d-flex align-items-center">
                    <span className="fs-5 me-3">
                      <span id="datatableCounter">0</span>
                      Selecionados
                    </span>
                    <a
                      className="btn btn-outline-danger btn-sm"
                    >
                      <i className="bi-trash"></i> Excluir
                    </a>
                  </div>
                </div>

                <div className="dropdown">
                  <button
                    type="button"
                    className="btn btn-white btn-sm w-100"
                    data-bs-toggle="modal"
                    data-bs-target="#addTools"
                  >
                    <i className="bi-plus-circle"></i> Add Ferramentos{" "}
                    <span className="badge bg-soft-dark text-dark rounded-circle ms-1"></span>
                  </button>
                </div>
              </div>
            </div>

            <div className="table-responsive datatable-custom">
              <table id="datatable" className="table table-lg table-borderless table-thead-bordered table-nowrap table-align-middle card-table">
                <thead className="thead-light">
                  <tr>
                    <th>Ferramentas</th>
                    <th>Aplicação</th>
                    <th>Tipo</th>
                    <th>Estado</th>
                    <th>Sobre a Aplicação</th>
                    {/* <th>Data de Vencimento</th> */}
                  </tr>
                </thead>
              {toolsData.map(tool => (
                <tbody key={tool.id}>
                  <tr>
                    <td>
                      <Link className="d-flex align-items-center" to={tool.link}>
                        {tool.iconeURL && <img src={tool.iconeURL} alt="Img" width="40" height="50" className="img-fluid" />}
                        <div className="ms-3">
                          <span className="d-block h5 text-inherit mb-0"> {tool.titulo} </span>
                        </div>
                      </Link>
                    </td>

                    <td>
                      <span className="badge bg-soft-primary text-primary rounded-pill">
                        <span className="legend-indicator bg-primary"></span> {tool.aplicacao} </span>  
                    </td>

                    <td><span className="badge bg-soft-secondary text-secondary rounded-pill">
                      <span className="legend-indicator bg-secondary"></span>{tool.tipo} </span>
                    </td>

                    <td>{getStatusBadge(tool.estado)}</td>

                    <td title={tool.sobre}>
                      {tool.sobre.slice(0, 60)}{tool.sobre.length > 30 && '...'}
                    </td>
                    
                    {/* <td>05 de junho</td> */}
                  </tr>
                </tbody>
                ))}
              </table>
            </div>
          </div>
        </main>
      </div>

      <div className="modal fade" id="addTools" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-close">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <textarea
                  id="titulo"
                  className="form-control form-control-title"
                  placeholder="Nome da ferramenta"
                  value={formData.name}
                  onChange={handleChange}
                ></textarea>

                <div className="row mb-4">
                  <div className="col-sm-3 mb-2 mb-sm-0">
                    <div className="d-flex align-items-center mt-2">
                      <i className="bi bi-link nav-icon"></i>
                      <div className="flex-grow-1">Link</div>
                    </div>
                  </div>

                  <div className="col-sm">
                    <input
                      id="link"
                      className="form-control"
                      placeholder="https:/example.com/"
                      value={formData.link}
                      onChange={handleChange}
                    ></input>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-sm-3 mb-2 mb-sm-0">
                    <div className="d-flex align-items-center mt-2">
                      <i className="bi-text-left nav-icon"></i>
                      <div className="flex-grow-1">Sobre</div>
                    </div>
                  </div>

                  <div className="col-sm">
                    <textarea
                      id="sobre"
                      className="form-control"
                      placeholder="Ferramenta de montagem"
                      value={formData.sobre}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-sm-3 mb-2 mb-sm-0">
                    <div className="d-flex align-items-center mt-2">
                      <i className="bi bi-book nav-icon"></i>
                      <div className="flex-grow-1">Text</div>
                    </div>
                  </div>

                  <div className="col-sm">
                    <div className="tom-select-custom">
                      Aplicação
                      <select
                        className="js-select form-select"
                        autoComplete="off"
                        id="aplicacao"
                        value={formData.aplicacao}
                        onChange={handleChange}
                      >
                        <option>Redes sociais e plataformas de ligação em rede</option>
                        <option>Computação em nuvem e armazenamento de dados</option>
                        <option>Educação e formação em linha</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-sm">
                    <div className="tom-select-custom">
                      Tipo
                      <select
                        className="js-select form-select"
                        autoComplete="off"
                        id="tipo"
                        value={formData.tipo}
                        onChange={handleChange}
                      >
                        <option>Apresentações e documentos</option>
                        <option>Design gráfico e edição de imagens</option>
                        <option>Vídeo e montagem</option>
                        <option>Colaboração em linha e gestão de projectos</option>
                        <option>Áudio e Podcasting</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-sm">
                    <div className="tom-select-custom">
                      Estado
                      <select
                        className="js-select form-select"
                        autoComplete="off"
                        id="estado"
                        value={formData.estado}
                        onChange={handleChange}
                      >
                        <option>Sem dados</option>
                        <option>Está a funcionar</option>
                        <option>Não está a funcionar</option>
                      </select>
                    </div>
                  </div>
                </div>


                <div className="row mb-4">
                  <div className="col-sm-3 mb-2 mb-sm-0">
                    <div className="d-flex align-items-center mt-2">
                      <i className="bi bi-image nav-icon"></i>
                      <div className="flex-grow-1">Ícone</div>
                    </div>
                  </div>

                  <div className="col-sm">
                    <input type="file" id="icone" onChange={handleChange} class="form-control" />
                  </div>
                </div>
              </div>

              <div className="modal-footer gap-3">
                <button type="button" id="discardFormt" className="btn btn-white" data-bs-dismiss="modal" > Descartar </button>
                <button type="button" id="processEvent" className="btn btn-primary" onClick={handleSubmit}> Adicionar uma ferramenta </button>

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
