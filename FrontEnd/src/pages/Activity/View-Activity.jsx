import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { EditTextActivity, AddComment } from '../../components/Other';
import { activityView, getComment } from '../../api/deviceAPI';
import { Context } from '../../contexts/context';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

export default function ViewActivity() {
  const { user } = useContext(Context);
  const [dataActivity, setOneActivityData] = useState({});
  const [dataComment, setComment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 10;
  const { activityId } = useParams();

  console.log(dataActivity)

  const { t } = useTranslation();

  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    let updatedFavorites = [...favorites];
    if (favorites.includes(id)) {
      updatedFavorites = updatedFavorites.filter((favId) => favId !== id);
    } else {
      updatedFavorites.push(id);
    }
  
    setFavorites(updatedFavorites);
    Cookies.set('activityFavorites', updatedFavorites.join(','), { expires: 365 });
  };

  useEffect(() => {
    const favsFromCookie = Cookies.get('activityFavorites');
    if (favsFromCookie) {
      setFavorites(favsFromCookie.split(',').map(Number));
    }
  }, []);


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
      <header id="header" className="navbar navbar-expand-lg navbar-spacer-y-0 flex-lg-column">
          <nav className="js-mega-menu flex-grow-1">
            <div className="collapse navbar-collapse" id="navbarDoubleLineContainerNavDropdown">
              <ul className="nav nav-tabs align-items-center">
                <li className='nav-item'>
                  <Link className="nav-link" to="/form" data-placement="left">
                    <i className="bi bi-house dropdown-item-icon"></i> {t('home')}
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className="nav-link active" to="/activity" data-placement="left">
                    <i className="bi bi-activity dropdown-item-icon"></i> {t('activity')}
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className="nav-link" to="/resources" data-placement="left">
                    <i className="bi bi-file-earmark-arrow-down dropdown-item-icon"></i> {t('resources')}
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className="nav-link" to="/tools" data-placement="left">
                    <i className="bi bi-tools dropdown-item-icon"></i> {t('tool')}
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
      </header>
      <main className="card card-body">
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
                  <small className="text-muted"><Link to={`/profile/view-profile/${dataActivity.users.idTeacher}`}>{dataActivity.users.name}</Link> | {formatDate(dataActivity.publishDate)} | <i className={`bi ${favorites.includes(dataActivity.idActivity) ? 'bi-bookmark-fill bookmark' : 'bi-bookmark bookmark'}`} role='button' onClick={() => toggleFavorite(dataActivity.idActivity)}></i></small> 
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
                <Link to={dataActivity.planning} className="btn btn-outline-primary btn-sm me-2">{t('planning')}</Link>
                <Link to={dataActivity.presentation} className="btn btn-outline-secondary btn-sm">{t('presentation')}</Link>
              </div>

            </div>
          </div>
        </div>

        {user._isAuth ? (
            <div className="card" id="accordionExample">
              <div className="accordion-header collapsed" id="headingOne">
                <a className="accordion-button link" role="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                   <i class="bi bi-chat"></i>  {t('add_comments')} 
                </a>
              </div>
              <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <AddComment activityId={dataActivity.idActivity} />
                </div>
              </div>
            </div>
        ) : (null)}

        <div className="card card-body mt-3">
          {dataComment.length > 0 ? (
            <ul className="step">
              {currentComments.map((d, i) => (
                <li className="step-item" key={i}>
                  <div className="step-content-wrapper">
                    <div className="step-avatar">
                      <span className="avatar avatar-soft-dark" data-toggle="tooltip" data-placement="top" title={d.users.name}>
                        <span className="avatar-initials">{d.users.name.charAt(0).toUpperCase()}</span>
                      </span>
                    </div>
                    <div className="step-content">
                    <small className="text-muted"><Link className='link' to={`/profile/view-profile/${d.users.idTeacher}`}>{d.users.name}</Link> | {formatDate(d.created_at)}</small>
                      <p className="fs-5">
                        <div dangerouslySetInnerHTML={{ __html: d.content }} />
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            user._isAuth ? (
              <div className="text-center">
                <h5>{t('text_info_no_comments_1')}</h5>
                <Link className='link' data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                {t('text_info_no_comments_2')}
                </Link>
              </div>
            ) : (
              <div className="accordion-body">
                {t('text_info_no_comments_3')}, <Link className='link' to='/sign-in'>{t('log_in')}</Link>.
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
