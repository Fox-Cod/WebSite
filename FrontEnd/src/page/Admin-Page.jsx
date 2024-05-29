import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { getAllData, adminUpdateProfile, adminDelteProfile } from '../http/deviceAPI';

export default function App() {
    const [users, setUsers] = useState([]);
    const [schoolAndGroupData, setSchoolAndGroupData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [currentEdit, setCurrentEdit] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:8081/api/getData', { withCredentials: true });
            setUsers(response.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchViewData = async () => {
        try {
            setLoading(true);
            const res = await getAllData();
            setSchoolAndGroupData(res);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchViewData();
    }, []);

    const handleEdit = (item) => {
        setCurrentEdit(item);
        setShowModal(true);
    };

    const handleDelete = async (idTeacher) => {
        try {
            setLoading(true);
            const res = await adminDelteProfile(idTeacher)
            setUsers(res);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            const res = await adminUpdateProfile(currentEdit);
            setUsers(res);
            setShowModal(false);
            setLoading(false);
            window.location.reload(); // Обновить страницу
        } catch (err) {
            console.error(err);
            setLoading(false);
            setShowModal(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentEdit(prev => ({ ...prev, [name]: value }));
    };
    
    const formatDate = (rawDate) => {
        const date = new Date(rawDate);
        const currentDate = new Date();
        if (date.toDateString() === currentDate.toDateString()) {
            return date.toLocaleTimeString('default', { hour: 'numeric', minute: 'numeric' });
        } else {
            return date.toLocaleDateString('default', { day: 'numeric', month: 'long', year: 'numeric' });
        }
    };

    return (
        <div>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                    <span className="spinner-border" role="status" aria-hidden="true"></span>
                </div>
            ) : (
                <main className="container">
                    <h2>Base de utilizadores</h2>
                    <div className="table-responsive small" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                        <div className="my-3 p-3 bg-body rounded shadow-sm">
                            <div className="js-sticky-header">
                                <div className="table-responsive">
                                    <table className="table table-lg table-borderless table-thead-bordered table-nowrap table-align-middle">
                                        <thead className="thead-light">
                                            <tr>
                                                <th scope="col">ID & Email & Name</th>
                                                <th scope="col">Nome_Escola</th>
                                                <th scope="col">Nome_Grupo</th>
                                                <th scope="col">Reg_Data</th>
                                                <th scope="col">Configurações</th>
                                                <th scope="col">Configurações</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {users.professors && users.professors.map((d, i) => (
                                                <tr key={i}>
                                                    <td>
                                                        <a className="d-flex align-items-center" href="../user-profile.html">
                                                            <div className="avatar avatar-circle">
                                                                <span className="avatar avatar-soft-dark" data-toggle="tooltip" data-placement="top" title={d.name}>
                                                                    <span className="avatar-initials">{d.name.charAt(0).toUpperCase()}</span>
                                                                </span>
                                                            </div>
                                                            <div className="flex-grow-1 ms-3">
                                                                <span className='text-form'>{d.idTeacher}</span>
                                                                <span className="d-block h5 text-inherit mb-0">{d.name} <i className="tio-verified text-primary" data-bs-toggle="tooltip" data-bs-placement="top" title="Top endorsed"></i></span>
                                                                <span className="d-block fs-6 text-body">{d.email}</span>
                                                            </div>
                                                        </a>
                                                    </td>
                                                    <td><span className="d-block fs-6">{d.schools.nameSchool}</span></td>
                                                    <td><span className="d-block fs-6">{d.groups.nameGroup}</span></td>
                                                    <td><span className="d-block fs-6">{formatDate(d.СreateDate)}</span></td>
                                                    <td>
                                                        <button className="btn btn-white btn-sm me-2" onClick={() => handleEdit(d)}>
                                                            <i className="bi bi-pencil"></i> Edit
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-white btn-sm" onClick={() => handleDelete(d.idTeacher)}>
                                                            <i className="bi bi-trash"></i> Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            )}

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={currentEdit.name || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={currentEdit.email || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formSchool">
                            <Form.Label>School (Obrigatório)</Form.Label>
                            <Form.Control
                                as="select"
                                name="nameSchool"
                                value={currentEdit.nameSchool || ''}
                                onChange={handleChange}
                            >
                                <option disabled>-- Select School --</option>
                                {schoolAndGroupData.schools && schoolAndGroupData.schools.map((school, index) => (
                                    <option key={index} value={school.idSchool}>
                                        {school.nameSchool}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formGroup">
                            <Form.Label>Group (Obrigatório)</Form.Label>
                            <Form.Control
                                as="select"
                                name="nameGroup"
                                value={currentEdit.nameGroup || ''}
                                onChange={handleChange}
                            >
                                <option disabled>-- Select Group --</option>
                                {schoolAndGroupData.groups && schoolAndGroupData.groups.map((group, index) => (
                                    <option key={index} value={group.idGroup}>
                                        {group.codGroup} {group.nameGroup}
                                    </option>
                                ))}
                                
                            </Form.Control>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

