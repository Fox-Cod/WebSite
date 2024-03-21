import React, { useEffect, useState } from 'react';
import { NavForm, AddAndSearchActivity } from './component/Other';
import { Link } from "react-router-dom";
import axios from 'axios';

export default function Activity() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/activity');
      const sortedData = response.data.sort((a, b) => new Date(b.data_criacao) - new Date(a.data_criacao));
      setData(sortedData);
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
      // Добавьте обработку ошибки, например, уведомление пользователю или логирование
    }
  };
  
  useEffect(() => {
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
      <NavForm />
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
                <span className="avatar-soft-dark" title={d.professores.nome_professor}>
                    <span className="bd-placeholder-img flex-shrink-0 me-2 rounded avatar-initials">{d.professores.nome_professor.charAt(0).toUpperCase()}</span>
                </span>
              </div>
              <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                <div className="d-flex justify-content-between">
                  <h5 className="mb-1"><Link to={`/view-profile/${d.professores.id_professor}`}>{d.professores.nome_professor}</Link></h5>
                </div>
                <div className="d-flex justify-content-between">
                  <strong className="text-gray-dark">{d.titulo}</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-gray-dark">
                    {d.descricao.length > 200 ? `${d.descricao.substring(0, 200)}...` : d.descricao}
                  </span>
                </div>
                <span className="badge bg-soft-primary text-primary rounded-pill me-1" title='Disciplina'><span className="legend-indicator bg-primary"></span>{d.disciplinas.nome_disciplina}</span>
                <span className="badge bg-soft-primary text-success rounded-pill me-1" title='Ensino'><span className="legend-indicator bg-success"></span>{d.nivel_ensino.nome_ensino}</span>
                <span className="badge bg-soft-primary text-warning rounded-pill" title='Ano'><span className="legend-indicator bg-warning"></span>{d.anos.ano}</span>
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
