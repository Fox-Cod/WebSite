import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SearchComponent({ posts }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    const results = posts.filter(post =>
      post.title.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(results);
    setIsOpen(true);
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
  <div className="dropdown-menu dropdown-menu-end navbar-dropdown-menu navbar-dropdown-menu-borderless navbar-dropdown-account show" style={{ width: '50rem' }}>
    <div className="dropdown-item-text">
      <ul className="list-unstyled">
        {searchResults.length > 0 ? (
          searchResults.map(post => (
            <li key={post.id} className="mb-2">
              {post.idActivity ? (
                <Link to={`/view-activity/${post.idActivity}`}> {post.title} </Link>
              ) : (
                <Link to='#'> {post.title} </Link>
              )}
              <p>{post.description}</p>
            </li>
          ))
        ) : (
          <li className="mb-2">
            <p>Não foram encontrados resultados.</p>
          </li>
        )}
      </ul>
    </div>
  </div>
)}

    </div>
  );
}

export default SearchComponent;
