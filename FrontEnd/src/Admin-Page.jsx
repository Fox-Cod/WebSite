import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
export default function App() {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/getData', { withCredentials: true })
            setData(response.data);
            console.log(response.data)
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <main className="container">
                <h2>Base de utilizadores</h2>
                <div className="table-responsive small" style={{ maxHeight: '800px', overflowY: 'auto' }}>
                    <div className="my-3 p-3 bg-body rounded shadow-sm">
                        <div class="js-sticky-header">
                            <div class="table-responsive">
                                <table class="table table-lg table-borderless table-thead-bordered table-nowrap table-align-middle">
                                    <thead class="thead-light ">
                                        <tr>
                                            <th scope="col">ID & Email & Name</th>
                                            <th scope="col">Nome_Escola</th>
                                            <th scope="col">Nome_Grupo</th>
                                            <th scope="col">Reg_Data</th>
                                            <th scope="col">Configurações</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {data.professors && data.professors.map((d, i) => (
                                            <tr key={i}>
                                                <td>
                                                    <a class="d-flex align-items-center" href="../user-profile.html">
                                                        <div class="avatar avatar-circle">
                                                            <span className="avatar avatar-soft-dark" data-toggle="tooltip" data-placement="top" title={d.nome_professor}>
                                                                <span className="avatar-initials">{d.nome_professor.charAt(0).toUpperCase()}</span>
                                                            </span>
                                                        </div>
                                                        <div class="flex-grow-1 ms-3">
                                                            <span class="d-block h5 text-inherit mb-0">{d.nome_professor} <i class="tio-verified text-primary" data-bs-toggle="tooltip" data-bs-placement="top" title="Top endorsed"></i></span>
                                                            <span class="d-block fs-6 text-body">{d.email_professor}</span>
                                                        </div>
                                                    </a>
                                                </td>
                                                <td><span class="d-block fs-6">{d.escola.nome_escola}</span></td>
                                                <td><span class="d-block fs-6">{d.grupo.nome_grupo}</span></td>
                                                <td><span class="d-block fs-6">{d.data_registro}</span></td>
                                                <td>
                                                    <div className="d-flex justify-content-center">
                                                        <Link className="btn btn-white btn-sm me-2" to="#">
                                                            <i className="bi bi-pencil"></i> Edit
                                                        </Link>
                                                        <Link className="btn btn-white btn-sm" to="#">
                                                            <i className="bi bi-trash"></i> Delete
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="content container-fluid">
                    <div className="row justify-content-lg-center">
                        <div className="col-lg-10">
                            <div className="js-nav-scroller hs-nav-scroller-horizontal mb-5">

                            </div>

                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="d-grid gap-3 gap-lg-5">
                                        <div className="card">
                                            <div className="card-body card-body-height" style={{ height: '22rem' }}>
                                                <strong>Ano</strong>
                                                <div class="table-responsive">
                                                    <table class="table table-lg table-borderless table-thead-bordered table-nowrap table-align-middle">
                                                        <thead class="thead-light">
                                                            <tr>
                                                                <th scope="col">ID</th>
                                                                <th scope="col">Ano</th>
                                                                <th scope="col">ID_Ensino</th>
                                                            </tr>
                                                        </thead>

                                                        <tbody>
                                                            {data.anos && data.anos.map((d, i) => (
                                                                <tr key={i}>
                                                                    <td><span class="d-block fs-6">{d.id_ano}</span></td>
                                                                    <td><span class="d-block fs-6">{d.ano}</span></td>
                                                                    <td><span class="d-block fs-6">{d.id_ensino}</span></td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                <span className="link-collapse-default">Ver mais</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4">
                                    <div className="d-grid gap-3 gap-lg-5">
                                        <div className="card">
                                            <div className="card-body card-body-height" style={{ height: '22rem' }}>
                                                <strong>Disciplina</strong>
                                                <div class="table-responsive">
                                                    <table class="table table-lg table-borderless table-thead-bordered table-nowrap table-align-middle">
                                                        <thead class="thead-light">
                                                            <tr>
                                                                <th scope="col">ID</th>
                                                                <th scope="col">Disciplina</th>
                                                            </tr>
                                                        </thead>

                                                        <tbody>
                                                            {data.disciplinas && data.disciplinas.map((d, i) => (
                                                                <tr key={i}>
                                                                    <td><span class="d-block fs-6">{d.id_disciplina}</span></td>
                                                                    <td><span class="d-block fs-6">{d.nome_disciplina}</span></td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                <span className="link-collapse-default">Ver mais</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="d-grid gap-3 gap-lg-5">
                                        <div className="card">
                                            <div className="card-body card-body-height" style={{ height: '22rem' }}>
                                                <strong>Ensino</strong>
                                                <div class="table-responsive">
                                                    <table class="table table-lg table-borderless table-thead-bordered table-nowrap table-align-middle">
                                                        <thead class="thead-light">
                                                            <tr>
                                                                <th scope="col">ID</th>
                                                                <th scope="col">Ensino</th>
                                                            </tr>
                                                        </thead>

                                                        <tbody>
                                                            {data.ensinos && data.ensinos.map((d, i) => (
                                                                <tr key={i}>
                                                                    <td><span class="d-block fs-6">{d.id_ensino}</span></td>
                                                                    <td><span class="d-block fs-6">{d.nome_ensino}</span></td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                <span className="link-collapse-default">Ver mais</span>
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
    );
}
