import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { EditTextActivity, NavForm } from './Other';

export default function ViewActivity() {
  const [data, setOneActivityData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const { activityId } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/view-activity/${activityId}`);
      console.log(response.data); 
      setOneActivityData(response.data.OneAtividades);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activityId]);

  function formatDate(rawDate) {
    if (!rawDate) return '';

    const dataRegistro = new Date(rawDate);
    const day = dataRegistro.getDate();
    const month = dataRegistro.toLocaleString('default', { month: 'long' });
    const year = dataRegistro.getFullYear();
    return `${day} ${month} ${year}`;
  }
  
  return (
    <div>
      <NavForm />
      <main className="container">
        <div className="my-2 p-3 bg-body rounded shadow-sm">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-no-gutter border-bottom pb-0 mb-0">
              <li className="breadcrumb-item"><Link className="breadcrumb-link" to="/form">Inicio</Link></li>
              <li className="breadcrumb-item"><Link className="breadcrumb-link" to="/activity">Atividades</Link></li>
              <li className="breadcrumb-item"><Link className="breadcrumb-link" to="/activity">{data.professores?.nome_professor}</Link></li>
              <li className="breadcrumb-item"><Link className="breadcrumb-link" to="/activity">{data.titulo}</Link></li>
            </ol>
          </nav>
        </div>

        {/* Display posts */}
          <div className="my-3 p-3 bg-body rounded shadow-sm" >
            <div className="d-flex text-body-secondary">
              <div className="avatar avatar-sm avatar-circle me-2" width="32" height="32">
                <span className="avatar-soft-dark" title={data.professores?.nome_professor}>
                    <span className="bd-placeholder-img flex-shrink-0 me-2 rounded avatar-initials">{data.professores?.nome_professor?.charAt(0).toUpperCase()}</span>
                </span>
              </div>
              <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                <div className="d-flex justify-content-between">
                  <h5 className="mb-1"><Link to="/view-profile">{data.professores?.nome_professor}</Link></h5>
                </div>
                <div className="d-flex justify-content-between">
                  <strong className="text-gray-dark">{data.titulo}</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-gray-dark">
                    {data.descricao}
                  </span>
                </div>
                <span className="badge bg-soft-primary text-primary rounded-pill me-1" title='Disciplina'><span className="legend-indicator bg-primary"></span>{data.disciplinas?.nome_disciplina}</span>
                <span className="badge bg-soft-primary text-success rounded-pill me-1" title='Ensino'><span className="legend-indicator bg-success"></span>{data.nivel_ensino?.nome_ensino}</span>
                <span className="badge bg-soft-primary text-warning rounded-pill" title='Ano'><span className="legend-indicator bg-warning"></span>{data.anos?.ano}</span>
              </div>        
              <EditTextActivity />
            </div>
            <div className="d-flex justify-content-between mt-1">
              <div className='d-block'>
                <h6 className="text-secondary">{formatDate(data.data_criacao)}</h6>
              </div>
              <div className='d-block text-end'>
                <Link to={data.planificacao}> Planificacao </Link> <Link to={data.presentacao}> Presentacao </Link>              
              </div>
            </div>
          </div>

          <div className="my-3 p-3 bg-body rounded shadow-sm" > 
            <div className="d-flex text-body-secondary">
              Comentarios
            </div>
          </div>

      </main>
    </div>
  );
}
