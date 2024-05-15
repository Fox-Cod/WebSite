import React, { useEffect, useState } from 'react';
import { AddAndSearchActivity } from './component/Other';
import { Link } from "react-router-dom";
import { activity } from '../http/deviceAPI';

export default function Activity() {
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  useEffect(() => {
    const fetchData = async () => {
      try {
          const res = await activity();
          setData(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);


  function formatDate(rawDate) {
    const dataRegistro = new Date(rawDate);
    const day = dataRegistro.getDate();
    const month = dataRegistro.toLocaleString('default', { month: 'long' });
    const year = dataRegistro.getFullYear();
    return `${day} ${month} ${year}`;
  }

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <div>
      <header id="header" className="navbar navbar-expand-lg navbar-bordered navbar-spacer-y-0 flex-lg-column">
        <div className="container">
          <nav className="js-mega-menu flex-grow-1">
            <div className="collapse navbar-collapse" id="navbarDoubleLineContainerNavDropdown">

              <ul className="nav nav-tabs align-items-center">
                <li className='nav-item'>
                  <Link className="nav-link" to="/form" data-placement="left">
                    <i className="bi bi-house dropdown-item-icon"></i> Inicio
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className="nav-link active" to="/activity" data-placement="left">
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
              <li className="breadcrumb-item"><Link className="breadcrumb-link" to="/form">Inicio</Link></li>
              <li className="breadcrumb-item active"><Link className="breadcrumb-link" to="/activity">Atividades</Link></li>
            </ol>
          </nav>
        </div>
        <AddAndSearchActivity />

        {/* Display posts */}
        {currentPosts.map((d) => (
          <div className="my-3 p-3 bg-body rounded shadow-sm">
            <div className="d-flex text-body-secondary">
              <div className="avatar avatar-sm avatar-circle me-2" width="32" height="32">
                <span className="avatar-soft-dark" title={d.users.name}>
                  <span className="bd-placeholder-img flex-shrink-0 me-2 rounded avatar-initials">{d.users.name.charAt(0).toUpperCase()}</span>
                </span>
              </div>
              <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                <div className="d-flex justify-content-between">
                  <h5 className="mb-1"><Link to={`/view-profile/${d.users.idTeacher}`}>{d.users.name}</Link></h5>
                </div>
                <div className="d-flex justify-content-between">
                  <strong className="text-gray-dark">{d.title}</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-gray-dark">
                    {d.description.length > 200 ? `${d.description.substring(0, 200)}...` : d.description}
                  </span>
                </div>
                <span className="badge bg-soft-primary text-primary rounded-pill me-1" title='Disciplina'><span className="legend-indicator bg-primary"></span>{d.subjects.nameSubject}</span>
                <span className="badge bg-soft-primary text-success rounded-pill me-1" title='Ensino'><span className="legend-indicator bg-success"></span>{d.educations.nameEducation}</span>
                <span className="badge bg-soft-primary text-warning rounded-pill" title='Ano'><span className="legend-indicator bg-warning"></span>{d.years.year}</span>
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

        {/* Pagination */}
        <nav className="d-flex justify-content-center">
          <ul className="pagination">
            {[...Array(Math.ceil(data.length / postsPerPage)).keys()].map((number) => (
              <li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                <button onClick={() => paginate(number + 1)} className="page-link">
                  {number + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </main>
    </div>
  );
}
