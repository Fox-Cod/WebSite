import React from 'react'
import { NavForm } from './component/Other';
import { Link } from "react-router-dom";

export default function Resources() {
  return (
    <div>
        <div>
        <NavForm />
        <main className="container">
        <div className="my-2 p-3 bg-body rounded shadow-sm">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-no-gutter border-bottom pb-0 mb-0">
                  <li className="breadcrumb-item"><Link className="breadcrumb-link" to="/form">Inicio</Link></li>
                  <li className="breadcrumb-item active"><Link className="breadcrumb-link" to="/resources">Recursos</Link></li>                 
                </ol>
              </nav>             
          </div>
          <Link className="btn btn-primary" to="" data-toggle="modal">
            <i className="bi-building"></i> Add Resources
          </Link>

          {/* Recursos */}
          <div className="my-3 p-3 bg-body rounded shadow-sm">
            <h6 className="border-bottom pb-2 mb-0">Recursos</h6>
            <div className="d-flex text-body-secondary pt-3">
              <img src="../assets/img/160x160/img1.jpg" alt="User Avatar" className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" />
              <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                <div className="d-flex justify-content-between">
                  <h5 className="mb-1"><Link to="/"> Bob Dean</Link></h5>
                </div>

                <div className="content">
                    <ul className="list-group">
                    {/* Item */}
                    <li className="list-group-item">
                        <div className="row align-items-center">
                        <div className="col-auto">
                            <img className="avatar avatar-xs avatar-4x3" src="/" alt="Image Description" />
                        </div>
            
                        <div className="col">
                            <h5 className="mb-0">
                            <a className="text-dark" href="#">Termos do contrato WordPress</a>
                            </h5>
                            <ul className="list-inline list-separator small text-body">
                            <li className="list-inline-item">Atualizado há 50 minutos</li>
                            <li className="list-inline-item">25kb</li>
                            </ul>
                        </div>
                        {/* End Col */}
            
                        <div className="col-auto">
                            {/* Dropdown */}
                            <div className="dropdown">
                            <button type="button" className="btn btn-white btn-sm" id="filesListDropdown1" data-bs-toggle="dropdown" aria-expanded="false">
                                <span className="d-none d-sm-inline-block me-1">Mais</span>
                                <i className="bi-chevron-down"></i>
                            </button>
            
                            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="filesListDropdown1" style={{ minWidth: '13rem' }}>
                                <span className="dropdown-header">Definições</span>
            
                                <a className="dropdown-item" href="#">
                                <i className="bi-share dropdown-item-icon"></i> Partilhar ficheiro
                                </a>
                                <a className="dropdown-item" href="#">
                                <i className="bi-folder-plus dropdown-item-icon"></i> Mover para
                                </a>
                                <a className="dropdown-item" href="#">
                                <i className="bi-pencil dropdown-item-icon"></i> Mudar o nome
                                </a>
                                <a className="dropdown-item" href="#">
                                <i className="bi-download dropdown-item-icon"></i> Descarregar
                                </a>
            
                                <div className="dropdown-divider"></div>
            
                                <a className="dropdown-item" href="#">
                                <i className="bi-chat-left-dots dropdown-item-icon"></i> Relatório
                                </a>
                                <a className="dropdown-item" href="#">
                                <i className="bi-trash dropdown-item-icon"></i> Eliminar
                                </a>
                            </div>
                            </div>
                        </div>
                        </div>
                    </li>
                    </ul>
                </div>

                <br />
              </div>
            </div>
            <small className="d-block text-end mt-3">
              <Link to="/form/activity">Ver todos</Link>
            </small>
          </div>
          </main>
          </div>
    </div>
  )
}
