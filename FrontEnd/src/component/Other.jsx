import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Link, useParams } from 'react-router-dom';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from 'axios';

export const EditTextActivity = () => {
  const [userProfile, setUserProfile] = useState({});
  const [viewActivityUser, setViewActivityUser] = useState([]);
  const { activityId } = useParams();
  const [dataActivity, setDataActivity] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!viewActivityUser.titulo || viewActivityUser.titulo.length < 4) {
      errors.titulo = 'O título deve ter pelo menos 4 caracteres.';
    }

    if (!viewActivityUser.descricao || viewActivityUser.descricao.length < 4) {
      errors.descricao = 'A descrição deve ter pelo menos 4 caracteres.';
    }

    if (!viewActivityUser.presentacao) {
      errors.presentacao = 'O campo Presentacao é obrigatório.';
    }

    if (!viewActivityUser.planificacao) {
      errors.planificacao = 'O campo Planificacao é obrigatório.';
    }

    if (!viewActivityUser.id_disciplina || viewActivityUser.id_disciplina === 'Qualquer') {
      errors.id_disciplina = 'Selecione uma disciplina válida.';
    }

    if (!viewActivityUser.id_ensino || viewActivityUser.id_ensino === 'Qualquer') {
      errors.id_ensino = 'Selecione um nível válido.';
    }

    if (!viewActivityUser.id_ano || viewActivityUser.id_ano === 'Qualquer') {
      errors.id_ano = 'Selecione um ano de estudo válido.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const fetchUserProfile = () => {
    return axios.get('http://localhost:8081/api/profile', { withCredentials: true })
      .then(res => {
        if (res.data.Status === 'Success') {
          setUserProfile(res.data.profile);
        } else {
          console.log('error');
        }
      })
  };

  const handleChange = (event) => { const { id, value } = event.target; setViewActivityUser((prevFormData) => ({ ...prevFormData, [id]: value, })); };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post(`http://localhost:8081/api/edit-activity/${activityId}`, viewActivityUser, { withCredentials: true });
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log('Форма не прошла валидацию. Не отправляем данные на сервер.');
    }
  };



  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/view-data-activity');
      setDataActivity(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchData2 = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/view-activity/${activityId}`);
      console.log(response.data);
      setViewActivityUser(response.data.OneAtividades);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchUserProfile();
    fetchData2();
    fetchData();
  }, [activityId]);
  return (
    <div>
      {userProfile && userProfile.id_professor === viewActivityUser?.id && (
        <div className="dropdown">
          <button type="button" className="btn btn-ghost-secondary btn-icon btn-sm rounded-circle" id="teamsListDropdown1" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="bi-three-dots-vertical"></i>
            <div className="dropdown-menu dropdown-menu-sm dropdown-menu-end" aria-labelledby="teamsListDropdown1" data-bs-toggle="modal" data-bs-target="#addActivity">
              <a className="dropdown-item">Editar o texto</a>
              <a className="dropdown-item text-danger">Delete</a>
            </div>
          </button>
        </div>
      )}

      <div className="modal fade" id="addActivity" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-close">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleSubmit}>

              <div className="modal-body">
                <label htmlFor="eventTitleLabel" className="visually-hidden form-label">Titulo</label>
                <textarea
                  id="titulo"
                  className={`form-control form-control-title ${formErrors.titulo ? 'is-invalid' : ''}`}
                  placeholder="Add title"
                  value={viewActivityUser.titulo}
                  onChange={handleChange}
                ></textarea>
                <span className="invalid-feedback">{formErrors.titulo}</span>

                <div className="row mb-4">
                  <div className="col-sm-3 mb-2 mb-sm-0">
                    <div className="d-flex align-items-center mt-2">
                      <i className="bi-text-left nav-icon"></i>
                      <div className="flex-grow-1">Descrição</div>
                    </div>
                  </div>

                  <div className="col-sm">
                    <label htmlFor="eventDescriptionLabel" className="visually-hidden form-label">
                      Add description
                    </label>
                    <textarea
                      id="descricao"
                      className={`form-control ${formErrors.descricao ? 'is-invalid' : ''}`}
                      placeholder="Add description"
                      value={viewActivityUser.descricao}
                      onChange={handleChange}
                    ></textarea>
                    <span className="invalid-feedback">{formErrors.descricao}</span>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-sm-3 mb-2 mb-sm-0">
                    <div className="d-flex align-items-center mt-2">
                      <i className="bi-list-ul nav-icon"></i>
                      <div className="flex-grow-1">Ligações</div>
                    </div>
                  </div>

                  <div className="col-sm">
                    <input
                      type="text"
                      className={`form-control ${formErrors.presentacao ? 'is-invalid' : ''}`}
                      id="presentacao"
                      placeholder="https://example.com/word/"
                      value={viewActivityUser.presentacao}
                      onChange={handleChange}
                    />
                    <span className="invalid-feedback">{formErrors.presentacao}</span>
                  </div>
                  <div className="col-sm">
                    <label htmlFor="eventLocationLabel" className="visually-hidden form-label">
                      Add Planificacao
                    </label>
                    <input
                      type="text"
                      className={`form-control ${formErrors.planificacao ? 'is-invalid' : ''}`}
                      id="planificacao"
                      placeholder="https://example.com/excel/"
                      value={viewActivityUser.planificacao}
                      onChange={handleChange}
                    />
                    <span className="invalid-feedback">{formErrors.planificacao}</span>
                  </div>
                </div>

                <div className="row mb-4">

                  <div className="col-sm-3 mb-2 mb-sm-0">
                    <div className="d-flex align-items-center mt-2">
                      <i className="bi bi-book nav-icon"></i>
                      <div className="flex-grow-1">Tipo de evento</div>
                    </div>
                  </div>

                  <div className="col-sm">
                    <div className="tom-select-custom">
                      <select
                        className="js-select form-select"
                        autoComplete="off"
                        id="id_disciplina"
                        value={viewActivityUser.id_disciplina}
                        onChange={handleChange}
                      >
                        <option>Qualquer</option>
                        {dataActivity.disciplinas && dataActivity.disciplinas.map((disciplina) => (
                          <option key={disciplina.id_disciplina} value={disciplina.id_disciplina}>{disciplina.nome_disciplina}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-sm">
                    <div className="tom-select-custom">
                      <select
                        className="js-select form-select"
                        autoComplete="off"
                        id="id_ensino"
                        value={viewActivityUser.id_ensino}
                        onChange={handleChange}
                      >
                        <option>Qualquer</option>
                        {dataActivity.ensino && dataActivity.ensino.map((item) => (
                          <option key={item.id_ensino} value={item.id_ensino}>{item.nome_ensino}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                </div>

                <div className="row mb-4">
                  <div className="col-sm-3 mb-2 mb-sm-0">
                    <div className="d-flex align-items-center mt-2">
                      <i className="bi-text-left nav-icon"></i>
                      <div className="flex-grow-1">Ano de estudo</div>
                    </div>
                  </div>

                  <div className="col-sm">
                    <select
                      className="js-select form-select"
                      autoComplete="off"
                      id="id_ano"
                      value={viewActivityUser.id_ano}
                      onChange={handleChange}
                    >
                      {dataActivity.anos && dataActivity.anos.map((ano) => (
                        <option key={ano.id_ano} value={ano.id_ano}>{ano.ano}</option>
                      ))}
                    </select>
                  </div>
                </div>

              </div>


              <div className="modal-footer gap-3">
                <button
                  type="button"
                  id="discardFormt"
                  className="btn btn-white"
                  data-bs-dismiss="modal"
                >
                  Abolir
                </button>
                <button type="button" id="processEvent" className="btn btn-primary" onClick={handleSubmit}>
                  Atualização
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export const NavForm = () => {
  return (
    <div>
      <header id="header" className="navbar navbar-expand-lg navbar-bordered navbar-spacer-y-0 flex-lg-column">
        <div className="container">
          <nav className="js-mega-menu flex-grow-1">
            <div className="collapse navbar-collapse" id="navbarDoubleLineContainerNavDropdown">

              <ul className="navbar-nav">
                <li>
                  <Link className="nav-link " to="/form" data-placement="left">
                    <i className="bi bi-house dropdown-item-icon"></i> Inicio
                  </Link>
                </li>
                <li>
                  <Link className="nav-link " to="/activity" data-placement="left">
                    <i className="bi bi-activity dropdown-item-icon"></i> Atividades
                  </Link>
                </li>
                <li>
                  <Link className="nav-link " to="/resources" data-placement="left">
                    <i className="bi bi-file-earmark-arrow-down dropdown-item-icon"></i> Recursos
                  </Link>
                </li>
                <li>
                  <Link className="nav-link " to="/tools" data-placement="left">
                    <i className="bi bi-tools dropdown-item-icon"></i>Ferramentos
                  </Link>
                </li>
              </ul>

            </div>
          </nav>
        </div>
      </header>
    </div>
  )
}

export const AddAndSearchActivity = () => {
  const [data, setData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    presentacao: '',
    planificacao: '',
    id_disciplina: '',
    id_ano: '',
    id_ensino: '',
  });


  const validateForm = () => {
    const errors = {};

    if (!formData.titulo || formData.titulo.length < 4) {
      errors.titulo = 'O título deve ter pelo menos 4 caracteres.';
    }

    if (!formData.descricao || formData.descricao.length < 4) {
      errors.descricao = 'A descrição deve ter pelo menos 4 caracteres.';
    }

    if (!formData.presentacao) {
      errors.presentacao = 'O campo Presentacao é obrigatório.';
    }

    if (!formData.planificacao) {
      errors.planificacao = 'O campo Planificacao é obrigatório.';
    }

    if (!formData.id_disciplina || formData.id_disciplina === 'Qualquer') {
      errors.id_disciplina = 'Selecione uma disciplina válida.';
    }

    if (!formData.id_ensino || formData.id_ensino === 'Qualquer') {
      errors.id_ensino = 'Selecione um nível válido.';
    }

    if (!formData.id_ano || formData.id_ano === 'Qualquer') {
      errors.id_ano = 'Selecione um ano de estudo válido.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (event) => { const { id, value } = event.target; setFormData((prevFormData) => ({ ...prevFormData, [id]: value, })); };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:8081/api/add-activity', formData, { withCredentials: true });
        console.log(response.data);
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log('Форма не прошла валидацию. Не отправляем данные на сервер.');
    }
  };



  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/view-data-activity');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div>
      <div className="card">
        <div className="card-header card-header-content-md-between">
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
                  placeholder="Procurar"
                  aria-label="Procurar"
                />
              </div>
            </form>

          </div>

          <div className="d-grid d-sm-flex justify-content-md-end align-items-sm-center gap-2">
            <div className="dropdown">
              <button
                type="button"
                className="btn btn-white btn-sm w-100"
                id="usersFilterDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi-filter me-1"></i> Filtro{' '}
                <span className="badge bg-soft-dark text-dark rounded-circle ms-1"></span>
              </button>

              <div
                className="dropdown-menu dropdown-menu-sm-end dropdown-card card-dropdown-filter-centered"
                aria-labelledby="usersFilterDropdown"
                style={{ minWidth: '22rem' }}
              >
                <div className="card">
                  <div className="card-header card-header-content-between">
                    <h5 className="card-header-title">Filtrar por categoria</h5>

                    <button type="button" className="btn btn-ghost-secondary btn-icon btn-sm ms-2">
                      <i className="bi-x-lg"></i>
                    </button>
                  </div>

                  <div className="card-body">
                    <form>
                      <div className="row">

                        <div className="col-sm mb-4">
                          <small className="text-cap text-body">Disciplina</small>

                          <div className="tom-select-custom">
                            <select className="js-select js-datatable-filter form-select form-select-sm">
                              <option value="">Qualquer</option>
                              <option value="">"Disciplina"</option>
                            </select>
                          </div>

                        </div>

                        <div className="col-sm mb-4">
                          <small className="text-cap text-body">Nivel</small>

                          <div className="tom-select-custom">
                            <select className="js-select js-datatable-filter form-select form-select-sm">
                              <option value="">Qualquer</option>
                              <option value="">"Nivel"</option>
                            </select>
                          </div>

                        </div>

                        <div className="col-sm mb-4">
                          <small className="text-cap text-body">Ano</small>

                          <div className="tom-select-custom">
                            <select className="js-select js-datatable-filter form-select form-select-sm">
                              <option value="">Qualquer</option>
                              <option value="">"Ano"</option>
                            </select>
                          </div>

                        </div>
                      </div>

                      <div className="d-grid">
                        <a className="btn btn-primary">Aplicar</a>
                      </div>
                    </form>

                  </div>
                </div>
              </div>
            </div>

            <div className="dropdown">
              <button type="button" className="btn btn-white btn-sm w-100" data-bs-toggle="modal" data-bs-target="#addActivity">
                <i className="bi-plus me-1"></i> Novos atividades
                <span className="badge bg-soft-dark text-dark rounded-circle ms-1"></span>
              </button>
            </div>

          </div>
        </div>
      </div>

      <div className="modal fade" id="addActivity" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-close">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleSubmit}>

              <div className="modal-body">
                <label htmlFor="eventTitleLabel" className="visually-hidden form-label">Titulo</label>
                <textarea
                  id="titulo"
                  className={`form-control form-control-title ${formErrors.titulo ? 'is-invalid' : ''}`}
                  placeholder="Add title"
                  value={formData.titulo}
                  onChange={handleChange}
                ></textarea>
                <span className="invalid-feedback">{formErrors.titulo}</span>

                <div className="row mb-4">
                  <div className="col-sm-3 mb-2 mb-sm-0">
                    <div className="d-flex align-items-center mt-2">
                      <i className="bi-text-left nav-icon"></i>
                      <div className="flex-grow-1">Descrição</div>
                    </div>
                  </div>

                  <div className="col-sm">
                    <label htmlFor="eventDescriptionLabel" className="visually-hidden form-label">
                      Add description
                    </label>
                    <textarea
                      id="descricao"
                      className={`form-control ${formErrors.descricao ? 'is-invalid' : ''}`}
                      placeholder="Add description"
                      value={formData.descricao}
                      onChange={handleChange}
                    ></textarea>
                    <span className="invalid-feedback">{formErrors.descricao}</span>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-sm-3 mb-2 mb-sm-0">
                    <div className="d-flex align-items-center mt-2">
                      <i className="bi-list-ul nav-icon"></i>
                      <div className="flex-grow-1">Ligações</div>
                    </div>
                  </div>

                  <div className="col-sm">
                    <input
                      type="text"
                      className={`form-control ${formErrors.presentacao ? 'is-invalid' : ''}`}
                      id="presentacao"
                      placeholder="https://example.com/word/"
                      value={formData.presentacao}
                      onChange={handleChange}
                    />
                    <span className="invalid-feedback">{formErrors.presentacao}</span>
                  </div>
                  <div className="col-sm">
                    <label htmlFor="eventLocationLabel" className="visually-hidden form-label">
                      Add Planificacao
                    </label>
                    <input
                      type="text"
                      className={`form-control ${formErrors.planificacao ? 'is-invalid' : ''}`}
                      id="planificacao"
                      placeholder="https://example.com/excel/"
                      value={formData.planificacao}
                      onChange={handleChange}
                    />
                    <span className="invalid-feedback">{formErrors.planificacao}</span>
                  </div>
                </div>

                <div className="row mb-4">

                  <div className="col-sm-3 mb-2 mb-sm-0">
                    <div className="d-flex align-items-center mt-2">
                      <i className="bi bi-book nav-icon"></i>
                      <div className="flex-grow-1">Tipo de evento</div>
                    </div>
                  </div>

                  <div className="col-sm">
                    <div className="tom-select-custom">
                      <select
                        className="js-select form-select"
                        autoComplete="off"
                        id="id_disciplina"
                        value={formData.id_disciplina}
                        onChange={handleChange}
                      >
                        <option>Qualquer</option>
                        {data.disciplinas && data.disciplinas.map((disciplina) => (
                          <option key={disciplina.id_disciplina} value={disciplina.id_disciplina}>{disciplina.nome_disciplina}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-sm">
                    <div className="tom-select-custom">
                      <select
                        className="js-select form-select"
                        autoComplete="off"
                        id="id_ensino"
                        value={formData.id_ensino}
                        onChange={handleChange}
                      >
                        <option>Qualquer</option>
                        {data.ensino && data.ensino.map((item) => (
                          <option key={item.id_ensino} value={item.id_ensino}>{item.nome_ensino}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                </div>

                <div className="row mb-4">
                  <div className="col-sm-3 mb-2 mb-sm-0">
                    <div className="d-flex align-items-center mt-2">
                      <i className="bi-text-left nav-icon"></i>
                      <div className="flex-grow-1">Ano de estudo</div>
                    </div>
                  </div>

                  <div className="col-sm">
                    <select
                      className="js-select form-select"
                      autoComplete="off"
                      id="id_ano"
                      value={formData.id_ano}
                      onChange={handleChange}
                    >
                      {data.anos && data.anos.map((ano) => (
                        <option key={ano.id_ano} value={ano.id_ano}>{ano.ano}</option>
                      ))}
                    </select>
                  </div>
                </div>

              </div>


              <div className="modal-footer gap-3">
                <button
                  type="button"
                  id="discardFormt"
                  className="btn btn-white"
                  data-bs-dismiss="modal"
                >
                  Descartar
                </button>
                <button type="button" id="processEvent" className="btn btn-primary" onClick={handleSubmit}>
                  Criar atividade
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export const AddAndSearchResources = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');

  const onDrop = useCallback(acceptedFiles => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleDeleteFile = () => { setFile(null) };

  const handleTitleChange = (e) => { setTitle(e.target.value) };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const fileContent = file ? (
    <div className="selected-file">
      <div className="file-info">
        <img src="../assets/svg/components/placeholder-img-format.svg" alt="File Icon" className="file-icon" width="58" height="58" />
        <div className="file-details">
          <p>{file.name}</p>
          <p>{formatBytes(file.size)}</p>
        </div>
      </div>
      <button type="button" className="btn btn-danger" onClick={handleDeleteFile}>Delete</button>
    </div>
  ) : (
    <p>Drag 'n' drop some files here, or click to select files</p>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);

    try {
      await axios.post('http://localhost:8081/api/upload', formData, { withCredentials: true });
      alert('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file: ', error);
      alert('Error uploading file');
    }
  };

  return (
    <div>
      <div className="card">
        <div className="card-header card-header-content-md-between">
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
                  placeholder="Procurar"
                  aria-label="Procurar"
                />
              </div>
            </form>
          </div>
          <div className="d-grid d-sm-flex justify-content-md-end align-items-sm-center gap-2">
            <div className="dropdown">
              <button type="button" className="btn btn-white btn-sm w-100" data-bs-toggle="modal" data-bs-target="#addActivity">
                <i className="bi-plus me-1"></i> Novos recursos
                <span className="badge bg-soft-dark text-dark rounded-circle ms-1"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="addActivity" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-close">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <label htmlFor="eventTitleLabel" className="visually-hidden form-label">Titulo</label>
                <textarea
                  id="title"
                  className='form-control form-control-title'
                  placeholder="Add title"
                  value={title}
                  onChange={handleTitleChange}
                ></textarea>
                <div {...getRootProps()} style={dropzoneStyles}>
                  <input {...getInputProps()} />
                  {fileContent}
                </div>
              </div>
              <div className="modal-footer gap-3">
                <button
                  type="button"
                  id="discardFormt"
                  className="btn btn-white"
                  data-bs-dismiss="modal"
                >
                  Descartar
                </button>
                <button type="submit" className="btn btn-primary"> Adicionar ficheiro </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AddActivityTeam = () => {
  const { teamId } = useParams();
  const [file, setFile] = useState(null);
  const [descricao, setDescricao] = useState('');

  useEffect(() => {
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      setFile(file);
    };

    const quill = document.querySelector('.js-quill .ql-editor');
    const input = quill.querySelector('input[type=file]');
    if (input) {
      input.addEventListener('change', handleFileChange);
    }

    return () => {
      if (input) {
        input.removeEventListener('change', handleFileChange);
      }
    };
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('descricao', descricao);
      formData.append('id_equipa', teamId);
      if (file) {
        formData.append('file', file);
      }

      const response = await axios.post(
        `http://localhost:8081/api/add-activity-team/${teamId}`,
        formData,
        { withCredentials: true }
      );

      console.log(response.data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuillChange = (content) => {
    setDescricao(content);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  return (
    <div>
      <div className="col mb-4">
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <input type="hidden" id="autor" name="autor" value="" />
              <div className="modal-body">
                <div className="row">
                  <div className="col">
                    <div className='quill-custom'>
                      <div className="js-quill">
                        <ReactQuill
                          value={descricao}
                          onChange={handleQuillChange}
                          placeholder="Descricao..."
                          modules={{
                            toolbar: {
                              container: [
                                ['bold', 'italic', 'underline', 'strike'],
                                [{ list: 'ordered' }, { list: 'bullet' }],
                                ['link'
                                // 'image'
                              ],
                              ],
                            },
                          }}
                          formats={['bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'link', 'html']}
                        />
                        <input type="file" onChange={handleFileChange} />
                      </div>
                    </div>
                  </div>
                  <div className="col-auto d-flex align-items-center">
                    <button type="submit" className="btn btn-primary btn-icon rounded-circle">
                      <i className="bi bi-airplane"></i>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


export const AddTeam = () => {
  const [customDiscipline, setCustomDiscipline] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    teamName: '',
    teamDescription: '' || 'Somos uma equipa de entusiastas que está pronta para criar algo novo e conquistar o topo!',
    selectedOption: 'Qualquer',
    customDiscipline: '',
  });

  const validateForm = () => {
    const errors = {};

    if (!formData.teamName || formData.teamName.length < 3) {
      errors.teamName = 'O nome deve ter pelo menos 3 caracteres.';
    }

    if (formData.selectedOption === "Qualquer") {
      errors.selectedOption = 'Algo de errado.';
    }

    if (formData.selectedOption === 'Outros' && (!formData.customDiscipline || formData.customDiscipline.length < 3)) {
      errors.customDiscipline = 'Algo errado.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };


  const handleOptionChange = (event) => {
    const value = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      selectedOption: value,
      customDiscipline: value === 'Outros' ? formData.customDiscipline : '',
    }));
  };


  const handleCreateTeam = async () => {
    console.log(formData)
    if (validateForm()) {
      try {
        // Отправка данных на бэкенд
        const response = await axios.post('http://localhost:8081/api/create-team', formData, { withCredentials: true });

        if (response.status === 400) {
          console.log('Team creation failed:', response.data.error);
          alert('Команда с таким именем уже существует');
          return false;
        }

        console.log('Team created successfully:', response.data.team);
        location.reload();
        return true;
      } catch (error) {
        console.error('Error creating team:', error);
      }
    } else {
      console.log('Team creation failed');
    }
  };
  return (
    <div>
      <div className="form-check form-check-switch me-2">
        <input className="form-check-input" type="checkbox" value="" id="connectCheckbox" />
        <button className="btn btn-white btn-sm w-100" data-bs-toggle="modal" data-bs-target="#addEventToCalendarModal">
          <span className="form-check-default">
            <i className="bi bi-cup-hot"></i> Criar Equipa
          </span>
        </button>
      </div>


      <div className="modal fade" id="addEventToCalendarModal" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-close">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form >
              <input type="hidden" id="autor" name="autor" />

              <div className="modal-body">
                <label htmlFor="eventTitleLabel" className="visually-hidden form-label">Nome da Equipa</label>
                <textarea
                  id="titulo"
                  className={`form-control form-control-title ${formErrors.teamName ? 'is-invalid' : ''}`}
                  placeholder="Nome da equipa"
                  value={formData.teamName}
                  onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}

                ></textarea>

                <div className="row mb-4">
                  <div className="col-sm-3 mb-2 mb-sm-0">
                    <div className="d-flex align-items-center mt-2">
                      <i className="bi-text-left nav-icon"></i>
                      <div className="flex-grow-1">Adicionar descrição</div>
                    </div>
                  </div>

                  <div className="col-sm">
                    <textarea
                      id="descricao"
                      className="form-control"
                      placeholder="Não Necessariamente"
                      value={formData.teamDescription}
                      onChange={(e) => setFormData({ ...formData, teamDescription: e.target.value })}
                    ></textarea>
                    <span className="invalid-feedback"></span>
                  </div>
                </div>


                <div className="row mb-4">
                  <div className="col-sm-3 mb-2 mb-sm-0">
                    <div className="d-flex align-items-center mt-2">
                      <i className="bi bi-book nav-icon"></i>
                      <div className="flex-grow-1">Qual é o objetivo da sua equipa?</div>
                    </div>
                  </div>

                  <div className="col-sm">
                    <div className="tom-select-custom">
                      <select
                        className={`form-js-select form-select ${formErrors.selectedOption ? 'is-invalid' : ''}`}
                        autoComplete="off"
                        id="disciplina"
                        onChange={handleOptionChange}
                        value={formData.selectedOption}
                      >
                        <option>Qualquer</option>
                        <option>Desenvolvimento de produtos</option>
                        <option>Marketing e publicidade</option>
                        <option>Serviço ao cliente</option>
                        <option>Aprendizagem e desenvolvimento</option>
                        <option>Investigação e desenvolvimento</option>
                        <option>Finanças e orçamento</option>
                        <option>Parcerias e colaborações</option>
                        <option>Outros</option>
                      </select>
                    </div>
                  </div>

                </div>
                {formData.selectedOption === 'Outros' && (
                  <div className="js-add-field row mb-4">
                    <div className="col-sm-3 mb-2 mb-sm-0">
                      <div className="d-flex align-items-center mt-2">
                        <i className="bi bi-book nav-icon"></i>
                        <div className="flex-grow-1">Outro objetivo</div>
                      </div>
                    </div>

                    <div className="col-sm-9">
                      <input
                        type="text"
                        className={`form-control ${formErrors.customDiscipline ? 'is-invalid' : ''}`}
                        id="customDiscipline"
                        placeholder="Especifique o objetivo"
                        value={customDiscipline}
                        onChange={(e) => {
                          setCustomDiscipline(e.target.value);
                          setFormData(prevState => ({ ...prevState, customDiscipline: e.target.value }));
                        }}
                      />
                      {formErrors.customDiscipline && <div className="invalid-feedback">{formErrors.customDiscipline}</div>}
                    </div>
                  </div>

                )}
              </div>


              <div className="modal-footer gap-3">
                <button type="button" id="discardFormt" className="btn btn-white" data-bs-dismiss="modal">
                  Descartar
                </button>
                <button type="button" id="processEvent" className="btn btn-primary" onClick={handleCreateTeam}>
                  Criar equipa
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

const dropzoneStyles = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '90px',
  textAlign: 'center',
  cursor: 'pointer',
};