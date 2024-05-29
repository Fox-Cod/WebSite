import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
                            <Link className="text-dark" to={`/view-activity/${post.idActivity}`}>{post.title}</Link>
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
        <input id="datatableSearch"type="search"className="form-control" placeholder="Procurar"aria-label="Procurar" value={searchTerm} onChange={handleChange} />
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
        <input id="datatableSearch"type="search"className="form-control" placeholder="Procurar"aria-label="Procurar" value={searchTerm} onChange={handleChange} />
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
