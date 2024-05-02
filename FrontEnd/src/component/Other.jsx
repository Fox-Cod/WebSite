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

    if (!viewActivityUser.title || viewActivityUser.title.length < 4) {
      errors.title = 'O título deve ter pelo menos 4 caracteres.';
    }

    if (!viewActivityUser.description || viewActivityUser.description.length < 4) {
      errors.description = 'A descrição deve ter pelo menos 4 caracteres.';
    }

    if (!viewActivityUser.presentation) {
      errors.presentation = 'O campo Presentacao é obrigatório.';
    }

    if (!viewActivityUser.planning) {
      errors.planning = 'O campo Planificacao é obrigatório.';
    }

    if (!viewActivityUser.idEducation || viewActivityUser.idEducation === 'Qualquer') {
      errors.idEducation = 'Selecione uma disciplina válida.';
    }

    if (!viewActivityUser.idSubject || viewActivityUser.idSubject === 'Qualquer') {
      errors.idSubject = 'Selecione um nível válido.';
    }

    if (!viewActivityUser.idYear || viewActivityUser.idYear === 'Qualquer') {
      errors.idYear = 'Selecione um ano de estudo válido.';
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
      setViewActivityUser(response.data.oneActivity);
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
                  id="title"
                  className={`form-control form-control-title ${formErrors.title ? 'is-invalid' : ''}`}
                  placeholder="Add title"
                  value={viewActivityUser.title}
                  onChange={handleChange}
                ></textarea>
                <span className="invalid-feedback">{formErrors.title}</span>

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
                      id="description"
                      className={`form-control ${formErrors.description ? 'is-invalid' : ''}`}
                      placeholder="Add description"
                      value={viewActivityUser.description}
                      onChange={handleChange}
                    ></textarea>
                    <span className="invalid-feedback">{formErrors.description}</span>
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
                      className={`form-control ${formErrors.presentation ? 'is-invalid' : ''}`}
                      id="presentation"
                      placeholder="https://example.com/word/"
                      value={viewActivityUser.presentation}
                      onChange={handleChange}
                    />
                    <span className="invalid-feedback">{formErrors.presentation}</span>
                  </div>
                  <div className="col-sm">
                    <label htmlFor="eventLocationLabel" className="visually-hidden form-label">
                      Add Planificacao
                    </label>
                    <input
                      type="text"
                      className={`form-control ${formErrors.planning ? 'is-invalid' : ''}`}
                      id="planning"
                      placeholder="https://example.com/excel/"
                      value={viewActivityUser.planning}
                      onChange={handleChange}
                    />
                    <span className="invalid-feedback">{formErrors.planning}</span>
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
                        id="idSubject"
                        value={viewActivityUser.idSubject}
                        onChange={handleChange}
                      >
                        <option>Qualquer</option>
                        {dataActivity.subject && dataActivity.subject.map((index) => (
                          <option key={index.idSubject} value={index.idSubject}>{index.nameSubject}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-sm">
                    <div className="tom-select-custom">
                      <select
                        className="js-select form-select"
                        autoComplete="off"
                        id="idEducation"
                        value={viewActivityUser.idEducation}
                        onChange={handleChange}
                      >
                        <option>Qualquer</option>
                        {dataActivity.education && dataActivity.education.map((index) => (
                          <option key={index.idEducation} value={index.idEducation}>{index.nameEducation}</option>
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
                      id="idYear"
                      value={viewActivityUser.idYear}
                      onChange={handleChange}
                    >
                      {dataActivity.years && dataActivity.years.map((index) => (
                        <option key={index.idYear} value={index.idYear}>{index.year}</option>
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
    </div>
  )
}

export const AddAndSearchActivity = () => {
  const [data, setData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    presentation: '',
    planning: '',
    idSubject: '',
    idYear: '',
    idEducation: '',
  });


  const validateForm = () => {
    const errors = {};

    if (!formData.title || formData.title.length < 4) {
      errors.title = 'O título deve ter pelo menos 4 caracteres.';
    }

    if (!formData.description || formData.description.length < 4) {
      errors.description = 'A descrição deve ter pelo menos 4 caracteres.';
    }

    if (!formData.presentation) {
      errors.presentation = 'O campo Presentacao é obrigatório.';
    }

    if (!formData.planning) {
      errors.planning = 'O campo Planificacao é obrigatório.';
    }

    if (!formData.idSubject || formData.idSubject === 'Qualquer') {
      errors.idSubject = 'Selecione uma disciplina válida.';
    }

    if (!formData.idEducation || formData.idEducation === 'Qualquer') {
      errors.idEducation = 'Selecione um nível válido.';
    }

    if (!formData.idYear || formData.idYear === 'Qualquer') {
      errors.idYear = 'Selecione um ano de estudo válido.';
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
                  id="title"
                  className={`form-control form-control-title ${formErrors.title ? 'is-invalid' : ''}`}
                  placeholder="Add title"
                  value={formData.title}
                  onChange={handleChange}
                ></textarea>
                <span className="invalid-feedback">{formErrors.title}</span>

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
                      id="description"
                      className={`form-control ${formErrors.description ? 'is-invalid' : ''}`}
                      placeholder="Add description"
                      value={formData.description}
                      onChange={handleChange}
                    ></textarea>
                    <span className="invalid-feedback">{formErrors.description}</span>
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
                    Presentação
                    <input
                      type="text"
                      className={`form-control ${formErrors.presentation ? 'is-invalid' : ''}`}
                      id="presentation"
                      placeholder="https://example.com/word/"
                      value={formData.presentation}
                      onChange={handleChange}
                    />
                    <span className="invalid-feedback">{formErrors.presentation}</span>
                  </div>
                  <div className="col-sm">
                    Planificação
                    <input
                      type="text"
                      className={`form-control ${formErrors.planning ? 'is-invalid' : ''}`}
                      id="planning"
                      placeholder="https://example.com/excel/"
                      value={formData.planning}
                      onChange={handleChange}
                    />
                    <span className="invalid-feedback">{formErrors.planning}</span>
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
                    Ano
                    <select
                      className="js-select form-select"
                      autoComplete="off"
                      id="idYear"
                      value={formData.idYear}
                      onChange={handleChange}
                    >
                      {data.years && data.years.map((index) => (
                        <option key={index.idYear} value={index.idYear}>{index.year}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-sm">
                    Ensino
                    <div className="tom-select-custom">
                      <select
                        className="js-select form-select"
                        autoComplete="off"
                        id="idEducation"
                        value={formData.idEducation}
                        onChange={handleChange}
                      >
                        <option>Qualquer</option>
                        {data.educations && data.educations.map((index) => (
                          <option key={index.idEducation} value={index.idEducation}>{index.nameEducation}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                </div>

                <div className="row mb-4">
                  <div className="col-sm-3 mb-2 mb-sm-0">
                    <div className="d-flex align-items-center mt-2">
                      <i className="bi-text-left nav-icon"></i>
                      <div className="flex-grow-1">Objeto</div>
                    </div>
                  </div>

                  <div className="col-sm">
                    Disciplina
                    <div className="tom-select-custom">
                      <select
                        className="js-select form-select"
                        autoComplete="off"
                        id="idSubject"
                        value={formData.idSubject}
                        onChange={handleChange}
                      >
                        <option>Qualquer</option>
                        {data.subjects && data.subjects.map((index) => (
                          <option key={index.idSubject} value={index.idSubject}>{index.nameSubject}</option>
                        ))}
                      </select>
                    </div>
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
      <button type="button" className="btn btn-danger" onClick={handleDeleteFile}>Eliminar</button>
    </div>
  ) : (
    <p>Arraste e largue alguns ficheiros aqui, ou clique para selecionar ficheiros</p>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Seleccione um ficheiro');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);

    console.log(file)

    try {
      await axios.post('http://localhost:8081/api/upload', formData, { withCredentials: true });
      alert('Ficheiro carregado com sucesso');
    } catch (error) {
      console.error('Erro ao carregar o ficheiro: ', error);
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
                  placeholder="Título (Não necessariamente)"
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
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const validateForm = () => {
    if (!descricao && !file) {
      setErrorMessage('Pelo menos um dos campos (comentário ou ficheiro) deve ser preenchido');
      return false;
    }
    return true;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!validateForm()) {
        return;
      }

      const formData = new FormData();
      formData.append('descricao', descricao);
      formData.append('id_equipa', teamId);
      formData.append('file', file);
      const response = await axios.post(
        `http://localhost:8081/api/add-activity-team/${teamId}`,
        formData,
        { withCredentials: true }
      );
      window.location.reload();
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuillChange = (content) => {
    setDescricao(content);
  };

  return (
    <div className="col mb-4">
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleFormSubmit}>
            <input type="hidden" id="autor" name="autor" value="" />
            <div className="modal-body">
              <div className="row">
                <div className="col">
                  <div className='quill-custom rounded'>
                    <ReactQuill
                      value={descricao}
                      onChange={handleQuillChange}
                      placeholder="Text..."
                      modules={{
                        toolbar: {
                          container: [
                            ['bold', 'italic', 'underline', 'strike'],
                            [{ list: 'ordered' }, { list: 'bullet' }],
                            ['link', 'image'],
                          ],
                        },
                      }}
                      formats={['bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'link', 'image']}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <label htmlFor="fileInput" className="form-label">Escolher ficheiro</label>
                <input
                  id="fileInput"
                  className="form-control"
                  type="file"
                  onChange={handleFileChange}
                />
                <div className="form-text">Não necessariamente.</div>
              </div>
              <div className="d-grid mt-3">
                <button type="submit" className="btn btn-primary btn-lg">Enviar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
};

export const AddTeam = () => {
  const [customDiscipline, setCustomDiscipline] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    nameTeam: '',
    descriptionTeam: '' || 'Somos uma equipa de entusiastas que está pronta para criar algo novo e conquistar o topo!',
    selectedOption: 'Qualquer',
    customDiscipline: '',
  });

  const validateForm = () => {
    const errors = {};

    if (!formData.nameTeam || formData.nameTeam.length < 3) {
      errors.nameTeam = 'O nome deve ter pelo menos 3 caracteres.';
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
      console.log('Team creation failed 401');
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
                  id="title"
                  className={`form-control form-control-title ${formErrors.nameTeam ? 'is-invalid' : ''}`}
                  placeholder="Nome da equipa"
                  value={formData.nameTeam}
                  onChange={(e) => setFormData({ ...formData, nameTeam: e.target.value })}

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
                      id="descriptionTeam"
                      className="form-control"
                      placeholder="Não Necessariamente"
                      value={formData.descriptionTeam}
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