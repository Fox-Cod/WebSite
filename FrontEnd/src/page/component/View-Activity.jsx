import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { EditTextActivity, AddComment } from './Other';
import { activityView, getComment } from '../../http/deviceAPI';
import { Context } from '../../context';

export default function ViewActivity() {
  const { user } = useContext(Context);
  const [dataActivity, setOneActivityData] = useState({});
  const [dataComment, setComment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 10;
  const { activityId } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await activityView(activityId);
        setOneActivityData(res);
        setLoading(false);
      } catch (error) {
        console.error('Erro durante o carregamento de dados:', error);
        setError('Erro ao carregar dados. Por favor, tente novamente.');
        setLoading(false);
      }
    }

    fetchData();
  }, [activityId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getComment(activityId);
        setComment(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [activityId]);

  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    const currentDate = new Date();
    if (date.toDateString() === currentDate.toDateString()) {
      return date.toLocaleTimeString('default', { hour: 'numeric', minute: 'numeric' });
    } else {
      return date.toLocaleDateString('default', { day: 'numeric', month: 'long', year: 'numeric' });
    }
  };

  if (loading) {
    return <div className="d-flex justify-content-center mt-5"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Загрузка...</span></div></div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-5" role="alert">{error}</div>;
  }

  const canEdit = user && (user._defaultRole === 'administrador' || user._userId === dataActivity.users.idTeacher);

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = dataComment.slice(indexOfFirstComment, indexOfLastComment);

  const totalPages = Math.ceil(dataComment.length / commentsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-4">
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
      <main className="mt-4 card card-body">
        <div className="my-3 p-3 rounded shadow-sm card" style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <div className="d-flex align-items-start">
            <div className="avatar avatar-sm avatar-circle me-2">
              <span className="avatar-soft-dark" title={dataActivity.users.name}>
                <span className="bd-placeholder-img flex-shrink-0 me-2 rounded avatar-initials">{dataActivity.users.name.charAt(0).toUpperCase()}</span>
              </span>
            </div>
            <div className="flex-grow-1">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-1">
                  <small className="text-muted"><Link to={`/view-profile/${dataActivity.users.idTeacher}`}>{dataActivity.users.name}</Link> | {formatDate(dataActivity.publishDate)}</small>
                </h5>
                {canEdit && <EditTextActivity />}
              </div>
              <div className="d-flex justify-content-between">
                <strong className="text-gray-dark">{dataActivity.title}</strong>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-gray-dark">{dataActivity.description}</span>
              </div>
              <div className="mb-2">
                <span className="badge bg-primary me-1">{dataActivity.subjects.nameSubject}</span>
                <span className="badge bg-success me-1">{dataActivity.educations.nameEducation}</span>
                <span className="badge bg-warning">{dataActivity.years.year}</span>
              </div>
              <div className="d-flex justify-content-end align-items-center">
                <Link to={dataActivity.planning} className="btn btn-outline-primary btn-sm me-2">Planificacao</Link>
                <Link to={dataActivity.presentation} className="btn btn-outline-secondary btn-sm">Presentacao</Link>
              </div>

            </div>
          </div>
        </div>

        {user._isAuth ? (
          <div className='mt-2'>
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <div className="accordion-item">
                  <div className="accordion-header collapsed" id="headingOne">
                    <a className="accordion-button" role="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                      Add Commentarios
                    </a>
                  </div>
                  <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      <AddComment activityId={dataActivity.idActivity} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (null)}

        <div className="card card-body mt-3">
          {dataComment.length > 0 ? (
            <ul className="step step-icon-xs mb-0">
              {currentComments.map((d, i) => (
                <li className="step-item" key={i}>
                  <div className="step-content-wrapper">
                    <div className="step-avatar">
                      <span className="avatar avatar-soft-dark" data-toggle="tooltip" data-placement="top" title={d.users.name}>
                        <span className="avatar-initials">{d.users.name.charAt(0).toUpperCase()}</span>
                      </span>
                    </div>
                    <div className="step-content">
                      <Link className="d-flex align-items-center me-2" to={`/view-profile/${d.users.idTeacher}`}>
                        <h5 className="mb-1">{d.users.name}</h5>
                      </Link>
                      <p className="fs-5">
                        <div dangerouslySetInnerHTML={{ __html: d.content }} />
                      </p>
                      <span className="text-muted small text-uppercase">{formatDate(d.created_at)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            user._isAuth ? (
              <div className="text-center">
                <h5>Não tens nada.</h5>
                <Link className='link' data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                  Queres acrescentar alguma coisa?
                </Link>
              </div>
            ) : (
              <div className="accordion-body">
                Para adicionar comentários, <Link className='link' to='/sign-in'>inicie sessão</Link>.
              </div>
            )
          )}
        </div>


        {dataComment.length > commentsPerPage && (
          <nav aria-label="Page navigation example" className="mt-3">
            <ul className="pagination justify-content-center">
              {[...Array(totalPages)].map((_, index) => (
                <li className={`page-item ${index + 1 === currentPage ? 'active' : ''}`} key={index}>
                  <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </main >
    </div >
  );
}
