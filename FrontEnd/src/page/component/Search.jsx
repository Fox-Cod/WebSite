import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { getAllData } from '../../http/deviceAPI';

const formatBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export function SearchComponentForActivities({ posts }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term.trim() === '') {
      setSearchResults([]);
      setIsOpen(false);
    } else {
      const results = posts.filter(post =>
        post.title.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
      setIsOpen(results.length > 0);
    }
  };

  return (
    <div className="dropdown">
      <div className="input-group input-group-merge input-group-flush">
        <div className="input-group-prepend input-group-text">
          <i className="bi bi-search"></i>
        </div>
        <input
          id="datatableSearch"
          type="search"
          className="form-control"
          placeholder="Procurar"
          aria-label="Procurar"
          value={searchTerm}
          onChange={handleChange}
        />
      </div>

      {isOpen && (
        <div className="dropdown-menu dropdown-menu-end navbar-dropdown-menu navbar-dropdown-menu-borderless navbar-dropdown-account show" style={{ width: '40rem' }}>
          <div className="d-grid gap-3 gap-lg-5">
            <div className="card">
              {searchResults.length > 0 ? (
                <div className="card-body">
                  <ul className="step step-icon-xs mb-0">
                    {searchResults.map(post => (
                      <li className="step-item" key={post.idActivity}>
                        <div className="step-content-wrapper">
                          <span className="step-icon step-icon-pseudo step-icon-soft-dark"></span>
                          <div className="step-content">
                            <Link className="text-dark" to={`/activity/view-activity/${post.idActivity}`}>{post.title}</Link>
                            <p className="fs-5 mb-1">
                              {post.description}<br />
                              <span className="badge bg-soft-primary text-primary rounded-pill"><span className="legend-indicator bg-primary"></span>{post.subjects.nameSubject}</span>
                              <span className="badge bg-soft-primary text-success rounded-pill"><span className="legend-indicator bg-success"></span>{post.educations.nameEducation}</span>
                              <span className="badge bg-soft-primary text-warning rounded-pill"><span className="legend-indicator bg-warning"></span>{post.years.year}</span>
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className='card-body'>Não foram encontrados resultados.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function SearchComponentForResources({ posts }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term.trim() === '') {
      setSearchResults([]);
      setIsOpen(false);
    } else {
      const results = posts.filter(post =>
        post.title.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
      setIsOpen(results.length > 0);
    }
  };

  return (
    <div className="dropdown">
      <div className="input-group input-group-merge input-group-flush">
        <div className="input-group-prepend input-group-text">
          <i className="bi bi-search"></i>
        </div>
        <input id="datatableSearch" type="search" className="form-control" placeholder="Procurar" aria-label="Procurar" value={searchTerm} onChange={handleChange} />
      </div>

      {isOpen && (
        <div className="dropdown-menu dropdown-menu-end navbar-dropdown-menu navbar-dropdown-menu-borderless navbar-dropdown-account show" style={{ width: '40rem' }}>
          <div className="d-grid gap-3 gap-lg-5">
            <div className="card">
              {searchResults.length > 0 ? (
                <div className="card-body">
                  <ul className="step step-icon-xs mb-0">
                    {searchResults.map(post => (
                      <li className="step-item" key={post.idResources}>
                        <div className="step-content-wrapper">
                          <span className="step-icon step-icon-pseudo step-icon-soft-dark"></span>
                          <div className="step-content">
                            <Link className="text-dark" to='#' >{post.title}</Link>
                            <div className="col">
                              <h5 className="mb-0">
                                <Link to={`http://localhost:8081/api/files/${post.fileName}`} download>{post.fileName}</Link>
                              </h5>
                              <ul className="list-inline list-separator small text-body">
                                <li className="list-inline-item">Tamanho do ficheiro: {formatBytes(post.fileSize)}</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className='card-body'>Não foram encontrados resultados.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function SearchComponentForTools({ posts }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term.trim() === '') {
      setSearchResults([]);
      setIsOpen(false);
    } else {
      const results = posts.filter(post =>
        post.title.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
      setIsOpen(results.length > 0);
    }
  };

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
    <div className="dropdown">
      <div className="input-group input-group-merge input-group-flush">
        <div className="input-group-prepend input-group-text">
          <i className="bi bi-search"></i>
        </div>
        <input id="datatableSearch" type="search" className="form-control" placeholder="Procurar" aria-label="Procurar" value={searchTerm} onChange={handleChange} />
      </div>

      {isOpen && (
        <div className="dropdown-menu dropdown-menu-end navbar-dropdown-menu navbar-dropdown-menu-borderless navbar-dropdown-account show" style={{ width: '40rem' }}>
          <div className="d-grid gap-3 gap-lg-5">
            <div className="card">
              {searchResults.length > 0 ? (
                <div className="card-body">
                  <ul className="step step-icon-xs mb-0">
                    {searchResults.map(post => (
                      <li className="step-item" key={post.idTool}>
                        <div className="step-content-wrapper">
                          <span className="step-icon step-icon-pseudo step-icon-soft-dark"></span>
                          <div className="step-content">
                            <Link className="text-dark" to={post.link} >{post.title}</Link>
                            <p>{post.about}</p>
                            <span className="badge bg-soft-secondary text-secondary rounded-pill">{post.type}</span>
                            <span className="badge bg-soft-primary text-primary rounded-pill">{post.application}</span>
                            {getStatusBadge(post.state)}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className='card-body'>Não foram encontrados resultados.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function FilterForActivity({ onFilter }) {
  const [subjects, setSubjects] = useState([]);
  const [years, setYears] = useState([]);
  const [educations, setEducations] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedEducations, setSelectedEducations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllData();
        setSubjects(data.subjects || []);
        setYears(data.years || []);
        setEducations(data.educations || []);
      } catch (error) {
        console.error('Error fetching data for filter:', error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (selectedOptions, setSelected) => {
    setSelected(selectedOptions ? selectedOptions.map(option => option.value) : []);
  };

  const applyFilters = () => {
    onFilter({
      subjects: selectedSubjects,
      years: selectedYears,
      educations: selectedEducations
    });
  };

  const formatOptions = (items) => {
    return items.map(item => ({ value: item.nameSubject || item.year || item.nameEducation, label: item.nameSubject || item.year || item.nameEducation }));
  };

  return (
    <div>
      <div class="dropdown">
        <button type="button" class="btn btn-white btn-sm w-100" id="FilterDropdown" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
          <i class="bi-filter me-1"></i> Filter <span class="badge bg-soft-dark text-dark rounded-circle ms-1"></span>
        </button>

        <div class="dropdown-menu dropdown-menu-sm-end dropdown-card card-dropdown-filter-centered" aria-labelledby="FilterDropdown" style={{ minWidth: '52rem' }}
        >
          <div class="card">
            <div class="card-header card-header-content-between">
              <h5 class="card-header-title">Filter</h5>

            </div>

            <div class="card-body">
              <form>
                <div class="row">
                  <div class="col-sm mb-4">
                    <small class="text-cap text-body">Disciplina</small>

                    <div class="tom-select-custom">
                      <Select
                        options={formatOptions(subjects)}
                        isMulti
                        onChange={(selectedOptions) => handleChange(selectedOptions, setSelectedSubjects)}
                      />
                    </div>

                  </div>
                  <div class="col-sm mb-4">
                    <small class="text-cap text-body">Níveis</small>

                    <div class="tom-select-custom">
                      <Select
                        options={formatOptions(educations)}
                        isMulti
                        onChange={(selectedOptions) => handleChange(selectedOptions, setSelectedEducations)}
                      />
                    </div>

                  </div>
                  <div class="col-sm mb-4">
                    <small class="text-cap text-body">Anos</small>

                    <div class="tom-select-custom">
                      <Select
                        options={formatOptions(years)}
                        isMulti
                        onChange={(selectedOptions) => handleChange(selectedOptions, setSelectedYears)}
                      />
                    </div>

                  </div>
                </div>
              </form>
              <button className="btn btn-primary" onClick={applyFilters}>Aplicar filtros</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FilterForResource({ onFilter }) {
  const [typeOptions] = useState(['Qualquer', 'Video', 'Ficheiro', 'Audio', 'Outros']);
  const [selectedType, setSelectedType] = useState([]);

  const handleChange = (selectedOptions) => {
    setSelectedType(selectedOptions ? selectedOptions.map(option => option.value) : []);
  };

  const applyFilters = () => {
    onFilter({
      type: selectedType,
    });
  };

  const formatOptions = (items) => {
    return items.map(item => ({ value: item, label: item }));
  };

  return (
    <div>
      <div className="dropdown">
        <button type="button" className="btn btn-white btn-sm w-100" id="FilterDropdown" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
          <i className="bi-filter me-1"></i> Filter <span className="badge bg-soft-dark text-dark rounded-circle ms-1"></span>
        </button>

        <div className="dropdown-menu dropdown-menu-sm-end dropdown-card card-dropdown-filter-centered" aria-labelledby="FilterDropdown" style={{ minWidth: '20rem' }}>
          <div className="card">
            <div className="card-header card-header-content-between">
              <h5 className="card-header-title">Filter</h5>
            </div>

            <div className="card-body">
              <form>
                <div className="row">
                  <div className="col-sm mb-4">
                    <small className="text-cap text-body">Tipo</small>
                    <div className="tom-select-custom">
                      <Select
                        options={formatOptions(typeOptions)}
                        isMulti
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </form>
              <button className="btn btn-primary" onClick={applyFilters}>Aplicar filtros</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FilterForTool({ onFilter }) {
  const [applicationOptions] = useState(['Redes sociais e plataformas de ligação em rede', 'Computação em nuvem e armazenamento de dados', 'Educação e formação em linha']);
  const [selectedApplication, setSelectedApplication] = useState([]);
  const [typeOptions] = useState(['Apresentações e documentos', 'Design gráfico e edição de imagens', 'Vídeo e montagem', 'Colaboração em linha e gestão de projectos', 'Áudio e Podcasting']);
  const [selectedType, setSelectedType] = useState([]);
  
  const handleApplicationChange = (selectedOptions) => {
    setSelectedApplication(selectedOptions ? selectedOptions.map(option => option.value) : []);
  };

  const handleTypeChange = (selectedOptions) => {
    setSelectedType(selectedOptions ? selectedOptions.map(option => option.value) : []);
  };

  const applyFilters = () => {
    onFilter({
      application: selectedApplication,
      type: selectedType,
    });
  };

  const formatOptions = (items) => {
    return items.map(item => ({ value: item, label: item }));
  };

  return (
    <div>
      <div className="dropdown">
        <button type="button" className="btn btn-white btn-sm w-100" id="FilterDropdown" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
          <i className="bi-filter me-1"></i> Filter <span className="badge bg-soft-dark text-dark rounded-circle ms-1"></span>
        </button>

        <div className="dropdown-menu dropdown-menu-sm-end dropdown-card card-dropdown-filter-centered" aria-labelledby="FilterDropdown" style={{ minWidth: '50rem' }}>
          <div className="card">
            <div className="card-header card-header-content-between">
              <h5 className="card-header-title">Filter</h5>
            </div>

            <div className="card-body">
              <form>
                <div className="row">
                  <div className="col-sm mb-4">
                    <small className="text-cap text-body">Application</small>
                    <div className="tom-select-custom">
                      <Select
                        options={formatOptions(applicationOptions)}
                        isMulti
                        onChange={handleApplicationChange}
                      />
                    </div>
                  </div>

                  <div className="col-sm mb-4">
                    <small className="text-cap text-body">Type</small>
                    <div className="tom-select-custom">
                      <Select
                        options={formatOptions(typeOptions)}
                        isMulti
                        onChange={handleTypeChange}
                      />
                    </div>
                  </div>
                </div>
              </form>
              <button type="button" className="btn btn-primary" onClick={applyFilters}>Aplicar filtros</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

