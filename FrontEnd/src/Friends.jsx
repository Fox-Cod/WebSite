import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function TeamList() {
    const [userProfile, setUserProfile] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8081/profile', { withCredentials: true })
            .then(res => {
                if (res.data.Status === 'Success') {
                    setUserProfile(res.data.profile);
                } else {
                    setError(res.data.Message);
                }
            })
            .catch(error => {
                console.error('Error fetching user profile:', error);
                setError('Error fetching user profile');
            });
    }, []);

    function formatDate(rawDate) {
        const dataRegistro = new Date(rawDate);
        const day = dataRegistro.getDate();
        const month = dataRegistro.toLocaleString('default', { month: 'long' });
        const year = dataRegistro.getFullYear();
        return `${day} ${month} ${year}`;
    }

    return (
        <div>
            <main id="content" role="main" className="main">
                <div className="content container-fluid">
                    <div className="row justify-content-lg-center">
                        <div className="col-lg-10">
                            <div className="profile-cover">
                                <div className="profile-cover-img-wrapper">
                                    <img className="profile-cover-img" src="../assets/img/1920x400/img1.jpg" alt="Image Description" />
                                </div>
                            </div>
                            <div className="text-center mb-5">
                                <div className="avatar avatar-xxl avatar-circle profile-cover-avatar">
                                    <img className="avatar-img" src="../assets/img/160x160/img1.jpg" alt="Image Description" />
                                    <span className="avatar-status avatar-status-success"></span>
                                </div>

                                <h1 className="page-header-title">{userProfile.nome_professor} <i className="bi-patch-check-fill fs-2 text-primary" data-bs-toggle="tooltip" data-bs-placement="top" title="Top endorsed"></i></h1>
                                <ul className="list-inline list-px-2">
                                    <li className="list-inline-item">
                                        <i className="bi-geo-alt me-1"></i>
                                        <span>{userProfile.nome_escola}</span>
                                    </li>

                                    <li className="list-inline-item">
                                        <i className="bi-building me-1"></i>
                                        <span>{userProfile.nome_grupo}</span>
                                    </li>

                                    <li className="list-inline-item">
                                        <i className="bi-calendar-week me-1"></i>
                                        <span>{formatDate(userProfile.data_registro)}</span>
                                    </li>
                                </ul>
                            </div>


                            <div className="js-nav-scroller hs-nav-scroller-horizontal mb-5">

                                <ul className="nav nav-tabs align-items-center">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/user-profile">Perfil</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/team-list">Equipa</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" to="/friends">Amigos</Link>
                                    </li>

                                    <li className="nav-item ms-auto">
                                        <div className="d-flex gap-2">


                                            <div className="dropdown nav-scroller-dropdown">
                                                <button type="button" className="btn btn-white btn-icon btn-sm" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i className="bi-three-dots-vertical"></i>
                                                </button>

                                                <div className="dropdown-menu dropdown-menu-end mt-1" aria-labelledby="profileDropdown">
                                                    <span className="dropdown-header">Definições</span>

                                                    <a className="dropdown-item" href="#">
                                                        <i className="bi-info-circle dropdown-item-icon"></i> Sugerir edições
                                                    </a>

                                                    <div className="dropdown-divider"></div>

                                                    <span className="dropdown-header">Feedback</span>

                                                    <a className="dropdown-item" href="#">
                                                        <i className="bi-flag dropdown-item-icon"></i> Relatório
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="row align-items-center mb-5">
                                <div className="col">
                                    <h3 className="mb-0">1 Amigo(s)</h3>
                                </div>

                                <div className="col-auto">
                                    <div className="form-check form-check-switch">
                                    </div>
                                    <ul className="nav nav-segment" id="profileTeamsTab" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link active" id="grid-tab" data-bs-toggle="tab" href="#grid" role="tab" aria-controls="grid" aria-selected="true" title="Column view">
                                                <i className="bi-grid"></i>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="list-tab" data-bs-toggle="tab" href="#list" role="tab" aria-controls="list" aria-selected="false" title="List view">
                                                <i className="bi-view-list"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="tab-content" id="profileTeamsTabContent">
                                <div className="tab-pane fade show active" id="grid" role="tabpanel" aria-labelledby="grid-tab">
                                    <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-3">
                                        <div className="col mb-3 mb-lg-5">
                                            <div className="card h-100">
                                                {/* <div className="card-pinned">
                                                    <div className="card-pinned-top-end">
                                                        <div className="dropdown">
                                                            <button type="button" className="btn btn-ghost-secondary btn-icon btn-sm rounded-circle" id="connectionsDropdown1" data-bs-toggle="dropdown" aria-expanded="false">
                                                                <i className="bi-three-dots-vertical"></i>
                                                            </button>

                                                            <div className="dropdown-menu dropdown-menu-sm dropdown-menu-end" aria-labelledby="connectionsDropdown1">
                                                                <a className="dropdown-item text-danger" href="#">Delete</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> */}

                                                <div className="card-body text-center">
                                                    <div className="avatar avatar-xl avatar-soft-primary avatar-circle avatar-centered mb-3">
                                                        <span className="avatar-initials">R</span>
                                                        <span className="avatar-status avatar-sm-status avatar-status-warning"></span>
                                                    </div>

                                                    <h3 className="mb-1">
                                                        <a className="text-dark" href="#">Rachel Doe</a>
                                                    </h3>

                                                    <div className="mb-3">
                                                        <i className="bi-building me-1"></i>
                                                        <span>Educacao Pre-Escolar</span>
                                                    </div>

                                                    {/* <ul className="list-inline mb-0">
                                                        <li className="list-inline-item"><a className="badge bg-soft-secondary text-secondary p-2" href="#">UI/UX</a></li>
                                                        <li className="list-inline-item"><a className="badge bg-soft-secondary text-secondary p-2" href="#">Sketch</a></li>
                                                        <li className="list-inline-item"><a className="badge bg-soft-secondary text-secondary p-2" href="#">Figma</a></li>
                                                    </ul> */}
                                                </div>

                                                <div className="card-footer">
                                                    <div className="row justify-content-between align-items-center">
                                                        <div className="col-auto py-1">
                                                            <a className="fs-6 text-body" href="#">25 Amigos</a>
                                                        </div>

                                                        <div className="col-auto py-1">
                                                            <div className="form-check form-check-switch">
                                                                <input className="form-check-input" type="checkbox" value="" id="connectionsCheckbox1" checked />
                                                                <label className="form-check-label btn btn-sm" htmlFor="connectionsCheckbox1">
                                                                    <span className="form-check-default">
                                                                        <i className="bi-person-plus-fill"></i> Subscrever
                                                                    </span>
                                                                    <span className="form-check-active">
                                                                        <i className="bi-check-lg me-2"></i> Está subscrito
                                                                    </span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="tab-pane fade" id="list" role="tabpanel" aria-labelledby="list-tab">
                                    <div className="row row-cols-1">
                                        <div className="col mb-3">
                                            <div className="card card-body">
                                                <div className="d-flex align-items-md-center">
                                                    <div className="flex-shrink-0">
                                                        <div className="avatar avatar-lg avatar-soft-primary avatar-circle">
                                                            <span className="avatar-initials">R</span>
                                                            <span className="avatar-status avatar-sm-status avatar-status-warning"></span>
                                                        </div>
                                                    </div>

                                                    <div className="flex-grow-1 ms-3">
                                                        <div className="row align-items-md-center">
                                                            <div className="col-9 col-md-4 col-lg-3 mb-2 mb-md-0">
                                                                <h4 className="mb-1">
                                                                    <a className="text-dark" href="#">
                                                                        Rachel Doe
                                                                    </a>
                                                                </h4>

                                                                <span className="d-block">
                                                                    <i className="bi-building me-1"></i>
                                                                    <span>Educacao Pre-Escolar</span>
                                                                </span>
                                                            </div>

                                                            <div className="col-3 col-md-auto order-md-last text-end ms-n3">
                                                                <div className="dropdown">
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-ghost-secondary btn-icon btn-sm rounded-circle"
                                                                        id="connectionsListDropdown1"
                                                                        data-bs-toggle="dropdown"
                                                                        aria-expanded="false"
                                                                    >
                                                                        <i className="bi-three-dots-vertical"></i>
                                                                    </button>

                                                                    <div className="dropdown-menu dropdown-menu-sm dropdown-menu-end" aria-labelledby="connectionsListDropdown1">
                                                                        <a className="dropdown-item text-danger" href="#">
                                                                            Delete
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-sm mb-2 mb-sm-0">
                                                                <ul className="list-inline mb-0">
                                                                    <li className="list-inline-item">
                                                                        <a className="badge bg-soft-secondary text-secondary p-2" href="#">
                                                                            {/* UI/UX */}
                                                                        </a>
                                                                    </li>
                                                                    <li className="list-inline-item">
                                                                        <a className="badge bg-soft-secondary text-secondary p-2" href="#">
                                                                            {/* Sketch */}
                                                                        </a>
                                                                    </li>
                                                                    <li className="list-inline-item">
                                                                        <a className="badge bg-soft-secondary text-secondary p-2" href="#">
                                                                            {/* Figma */}
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="col-sm-auto">
                                                                <div className="form-check form-check-switch">
                                                                    <input className="form-check-input" type="checkbox" value="" id="connectionsListCheckbox1" checked />
                                                                    <label className="form-check-label btn btn-sm" htmlFor="connectionsListCheckbox1">
                                                                        <span className="form-check-default">
                                                                            <i className="bi-person-plus-fill"></i> Subscrever
                                                                        </span>
                                                                        <span className="form-check-active">
                                                                            <i className="bi-check-lg me-2"></i> Está subscrito
                                                                        </span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
