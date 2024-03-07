import React, { useEffect, useState } from 'react';
import axios from 'axios';
export default function App() {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/view-users')
            setData(response.data);
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
                                        <thead class="thead-light">
                                            <tr>
                                                <th scope="col">ID & Email & Name</th>
                                                <th scope="col">Nome_Escola</th>
                                                <th scope="col">Nome_Grupo</th>
                                                <th scope="col">Reg_Data</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {data.map((d, i) => (
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
                                            </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
