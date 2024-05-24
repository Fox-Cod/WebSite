import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import { Context } from '../context';
import { tool, addTool } from '../http/deviceAPI';
import SearchComponent from './component/Search';

export default function Tools() {
  const { user } = useContext(Context);
  const [toolsData, setToolsData] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    link: '',
    about: '',
    application: "Redes sociais e plataformas de ligação em rede",
    type: "Apresentações e documentos",
    state: "Sem dados",
  });

  const handleChange = ({ target: { id, value } }) => setFormData(prevData => ({ ...prevData, [id]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTool(formData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setToolsData(await tool());
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const getStatusBadge = (estado) => {
    const statusMap = {
      'Não está a funcionar': 'danger',
      'Está a funcionar': 'success',
      'Sem dados': 'warning'
    };
    const status = statusMap[estado] || 'secondary';
    return (
      <span className={`badge bg-soft-${status} text-${status} rounded-pill`}>
        <span className={`legend-indicator bg-${status}`}></span> {estado}
      </span>
    );
  };

  return (
    <div className='container mt-4'>
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
                  <Link className="nav-link" to="/resources" data-placement="left">
                    <i className="bi bi-file-earmark-arrow-down dropdown-item-icon"></i> Recursos
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className="nav-link active" to="/tools" data-placement="left">
                    <i className="bi bi-tools dropdown-item-icon"></i>Ferramentos
                  </Link>
                </li>
              </ul>

            </div>
          </nav>
        </div>
      </header>


      <main>
        <div className="card">
          <div className="card-header card-header-content-md-between">
            <SearchComponent posts={toolsData} />
            {user._defaultRole === "administrador" && (
              <button type="button" className="btn btn-white btn-sm" data-bs-toggle="modal" data-bs-target="#addTools">
                <i className="bi-plus-circle"></i> Ferramentos
              </button>
            )}
          </div>

          <div className="table-responsive">
            <table className="table table-lg table-borderless table-thead-bordered table-nowrap card-table">
              <thead className="thead-light">
                <tr>
                  <th>Ferramentas</th>
                  <th>Aplicação</th>
                  <th>Tipo</th>
                  <th>Estado</th>
                  <th>Sobre a Aplicação</th>
                </tr>
              </thead>
              <tbody>
                {toolsData.map(({ id, title, link, application, type, state, about }) => (
                  <tr key={id}>
                    <td><Link className="d-flex align-items-center" to={link}><span className="d-block h5 text-inherit mb-0">{title}</span></Link></td>
                    <td><span className="badge bg-soft-primary text-primary rounded-pill">{application}</span></td>
                    <td><span className="badge bg-soft-secondary text-secondary rounded-pill">{type}</span></td>
                    <td>{getStatusBadge(state)}</td>
                    <td title={about}>{about.slice(0, 80)}{about.length > 80 && '...'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <div className="modal fade" id="addTools" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-close">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <textarea
                  id="title"
                  className="form-control form-control-title"
                  placeholder="Nome da ferramenta"
                  value={formData.title}
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
                      id="about"
                      className="form-control"
                      placeholder="Ferramenta de montagem"
                      value={formData.about}
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
                        id="application"
                        value={formData.application}
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
                        id="type"
                        value={formData.type}
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
                        id="state"
                        value={formData.state}
                        onChange={handleChange}
                      >
                        <option>Sem dados</option>
                        <option>Está a funcionar</option>
                        <option>Não está a funcionar</option>
                      </select>
                    </div>
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
