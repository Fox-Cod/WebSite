import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { getAllData, adminUpdateProfile, adminDelteProfile } from '../../api/deviceAPI';
import AddRecordModal from './AddRecordModal';

export default function App() {
    const [data, setData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [currentEdit, setCurrentEdit] = useState({});
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("years");
    const [userData, setUserData] = useState(null);

    const [modalShow, setModalShow] = useState(false);


    const { t, i18n } = useTranslation();

    const fetchViewData = async () => {
        try {
            setLoading(true);
            const res = await getAllData();
            setData(res);
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

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    }



    const generateRandomUserData = () => {
        const randomName = generateRandomString();
        const randomEmail = `${randomName.toLowerCase()}@example.com`;
        const randomPassword = generateRandomString();
        const randomGroupId = Math.floor(Math.random() * 35); // Генерация случайного id группы
        const randomSchoolId = Math.floor(Math.random() * 6); // Генерация случайного id школы

        setUserData({
            name: randomName,
            email: randomEmail,
            password: randomPassword,
            idGroup: randomGroupId,
            idSchool: randomSchoolId
        });
    };

    const generateRandomString = () => {
        return Math.random().toString(36).substring(7);
    };

    const handleConfirm = () => {
        // Добавить код для отправки данных в БД
        console.log("Данные подтверждены:", userData);
    };



    return (
        <div>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                    <span className="spinner-border" role="status" aria-hidden="true"></span>
                </div>
            ) : (
                <main className="container">
                    <h2>{t('text_info_admin_page_1')}</h2>
                    <div className="row">
                        <div className="col-md-8">
                            <a className="link" role='button' onClick={generateRandomUserData}>{t('text_info_admin_page_2')}</a>
                            {userData ? (
                                <div className="" role="alert">
                                    {`Name: ${userData.name}, Email: ${userData.email}, Password: ${userData.password}, Group ID: ${userData.idGroup}, School ID: ${userData.idSchool}`}
                                    <br />
                                    <a className="link link-success" role='button' onClick={handleConfirm}>{t('confirm')}</a>
                                </div>
                            ) : (null)}
                        </div>
                    </div>
                    <div className="table-responsive small" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                        <div className="my-3 p-3 card rounded shadow-sm">
                            <div className="js-sticky-header">
                                <div className="table-responsive">
                                    <table className="table table-lg table-borderless table-thead-bordered table-nowrap table-align-middle">
                                        <thead className="thead-light">
                                            <tr>
                                                <th scope="col">Id</th>
                                                <th scope="col">{t('email')}</th>
                                                <th scope="col">{t('password')}</th>
                                                <th scope="col">{t('school')}</th>
                                                <th scope="col">{t('group')}</th>
                                                <th scope="col">Reg_Data</th>
                                                <th scope="col">{t('settings')}</th>
                                                <th scope="col">{t('settings')}</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {data.teachers && data.teachers.map((d, i) => (
                                                <tr key={i}>
                                                    <td><span className='text-form'>{d.idTeacher}</span></td>
                                                    <td>
                                                        <a className="d-flex align-items-center" href="../user-profile.html">
                                                            <div className="avatar avatar-circle">
                                                                <span className="avatar avatar-soft-dark" data-toggle="tooltip" data-placement="top" title={d.name}>
                                                                    <span className="avatar-initials">{d.name.charAt(0).toUpperCase()}</span>
                                                                </span>
                                                            </div>
                                                            <div className="flex-grow-1 ms-3">
                                                                <span className="d-block h5 text-inherit mb-0">{d.name} <i className="tio-verified text-primary" data-bs-toggle="tooltip" data-bs-placement="top" title="Top endorsed"></i></span>
                                                                <span className="d-block fs-6 text-body">{d.email}</span>
                                                            </div>
                                                        </a>
                                                    </td>
                                                    <td><span title={d.password} className="d-block fs-6">{d.password?.length > 30 ? d?.password?.slice(0, 30) + '...' : d?.password}</span></td>
                                                    <td><span className="d-block fs-6">{d?.schools?.nameSchool}</span></td>
                                                    <td><span className="d-block fs-6">{d?.groups?.nameGroup}</span></td>
                                                    <td><span className="d-block fs-6">{formatDate(d.СreateDate)}</span></td>
                                                    <td>
                                                        <button className="btn btn-white btn-sm me-2" onClick={() => handleEdit(d)}>
                                                            <i className="bi bi-pencil"></i> {t('edit')}
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-white btn-sm" onClick={() => handleDelete(d.idTeacher)}>
                                                            <i className="bi bi-trash"></i> {t('delete')}
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
            <main className="container">
                <h2>{t('text_info_admin_page_3')}</h2>
                <p>{t('text_info_admin_page_4')}</p>
                <header id="header" className="navbar navbar-expand-lg navbar-spacer-y-0 flex-lg-column">
                    <nav className="js-mega-menu flex-grow-1">
                        <div className="collapse navbar-collapse" id="navbarDoubleLineContainerNavDropdown">
                            <ul className="nav nav-tabs align-items-center">
                                <li className='nav-item'>
                                    <a className={`nav-link ${activeTab === "years" ? "active" : ""}`} role='button' onClick={() => handleTabClick("years")}>
                                        <i className="bi bi-123 dropdown-item-icon"></i> Years
                                    </a>
                                </li>
                                <li className='nav-item'>
                                    <a className={`nav-link ${activeTab === "schools" ? "active" : ""}`} role='button' onClick={() => handleTabClick("schools")}>
                                        <i className="bi bi-backpack2-fill dropdown-item-icon"></i> Schools
                                    </a>
                                </li>
                                <li className='nav-item'>
                                    <a className={`nav-link ${activeTab === "educations" ? "active" : ""}`} role='button' onClick={() => handleTabClick("educations")}>
                                        <i className="bi bi-alphabet-uppercase dropdown-item-icon"></i> Educations
                                    </a>
                                </li>
                                <li className='nav-item'>
                                    <a className={`nav-link ${activeTab === "subjects" ? "active" : ""}`} role='button' onClick={() => handleTabClick("subjects")}>
                                        <i className="bi-lightbulb dropdown-item-icon"></i> Subjects
                                    </a>
                                </li>
                                <li className='nav-item'>
                                    <a className={`nav-link ${activeTab === "groups" ? "active" : ""}`} role='button' onClick={() => handleTabClick("groups")}>
                                        <i className="bi-people dropdown-item-icon"></i> Groups
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>

                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div class="accordion-header mt-0">
                                <button class="btn btn-white btn-sm w-100 link" onClick={() => setModalShow(true)}>
                                    Adicione uma anotação
                                </button>
                                <AddRecordModal
                                    show={modalShow}
                                    handleClose={() => setModalShow(false)}
                                />
                            </div>
                            <div className={`card mb-3 mb-lg-5 ${activeTab === "years" ? "show" : "d-none"}`} style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                <div className="card-header">
                                    <h4 className="card-header-title">Years (Anos)</h4>
                                </div>
                                <div className="card-body overflow-auto">
                                    <table className="table table-lg table-borderless table-thead-bordered table-nowrap table-align-middle">
                                        <thead className="thead-light">
                                            <tr>
                                                <th scope="col">id_Year</th>
                                                <th scope="col">year</th>
                                                {/* <th scope="col">{t('edit')}</th>
                                                <th scope="col">{t('delete')}</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.years && data.years.map((d, i) => (
                                                <tr key={i}>
                                                    <td><span className='text-form'>{d.idYear}</span></td>
                                                    <td><span className="d-block fs-6">{d.year}</span></td>
                                                    {/* <td>
                                                        <button className="btn btn-white btn-sm me-2">
                                                            <i className="bi bi-pencil"></i> {t('edit')}
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-white btn-sm">
                                                            <i className="bi bi-trash"></i> {t('delete')}
                                                        </button>
                                                    </td> */}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className={`card mb-3 mb-lg-5 ${activeTab === "schools" ? "show" : "d-none"}`} style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                <div className="card-header">
                                    <h4 className="card-header-title">Schools (Escolas)</h4>
                                </div>
                                <div className="card-body overflow-auto">
                                    <table className="table table-lg table-borderless table-thead-bordered table-nowrap table-align-middle">
                                        <thead className="thead-light">
                                            <tr>
                                                <th scope="col">id_School</th>
                                                <th scope="col">name_School</th>
                                                {/* <th scope="col">{t('edit')}</th>
                                                <th scope="col">{t('delete')}</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.schools && data.schools.map((d, i) => (
                                                <tr key={i}>
                                                    <td><span className='text-form'>{d.idSchool}</span></td>
                                                    <td><span className="d-block fs-6">{d.nameSchool}</span></td>
                                                    {/* <td>
                                                        <button className="btn btn-white btn-sm me-2">
                                                            <i className="bi bi-pencil"></i> {t('edit')}
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-white btn-sm">
                                                            <i className="bi bi-trash"></i> {t('delete')}
                                                        </button>
                                                    </td> */}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className={`card mb-3 mb-lg-5 ${activeTab === "educations" ? "show" : "d-none"}`} style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                <div className="card-header">
                                    <h4 className="card-header-title">Education (Níveis)</h4>
                                </div>
                                <div className="card-body overflow-auto">
                                    <table className="table table-lg table-borderless table-thead-bordered table-nowrap table-align-middle">
                                        <thead className="thead-light">
                                            <tr>
                                                <th scope="col">id_Education</th>
                                                <th scope="col">name_Education</th>
                                                {/* <th scope="col">{t('edit')}</th>
                                                <th scope="col">{t('delete')}</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.educations && data.educations.map((d, i) => (
                                                <tr key={i}>
                                                    <td><span className='text-form'>{d.idEducation}</span></td>
                                                    <td><span className="d-block fs-6">{d.nameEducation}</span></td>
                                                    {/* <td>
                                                        <button className="btn btn-white btn-sm me-2">
                                                            <i className="bi bi-pencil"></i> {t('edit')}
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-white btn-sm">
                                                            <i className="bi bi-trash"></i> {t('delete')}
                                                        </button>
                                                    </td> */}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className={`card mb-3 mb-lg-5 ${activeTab === "subjects" ? "show" : "d-none"}`} style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                <div className="card-header">
                                    <h4 className="card-header-title">Subject (Disciplinas)</h4>
                                </div>
                                <div className="card-body overflow-auto">
                                    <table className="table table-lg table-borderless table-thead-bordered table-nowrap table-align-middle">
                                        <thead className="thead-light">
                                            <tr>
                                                <th scope="col">id_Subject</th>
                                                <th scope="col">name_Subject</th>
                                                {/* <th scope="col">{t('edit')}</th>
                                                <th scope="col">{t('delete')}</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.subjects && data.subjects.map((d, i) => (
                                                <tr key={i}>
                                                    <td><span className='text-form'>{d.idSubject}</span></td>
                                                    <td><span className="d-block fs-6">{d.nameSubject}</span></td>
                                                    {/* <td>
                                                        <button className="btn btn-white btn-sm me-2">
                                                            <i className="bi bi-pencil"></i> {t('edit')}
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-white btn-sm">
                                                            <i className="bi bi-trash"></i> {t('delete')}
                                                        </button>
                                                    </td> */}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className={`card mb-3 mb-lg-5 ${activeTab === "groups" ? "show" : "d-none"}`} style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                <div className="card-header">
                                    <h4 className="card-header-title">Groups (Grupos)</h4>
                                </div>
                                <div className="card-body overflow-auto">
                                    <table className="table table-lg table-borderless table-thead-bordered table-nowrap table-align-middle">
                                        <thead className="thead-light">
                                            <tr>
                                                <th scope="col">id_Groups</th>
                                                <th scope="col">cod_Group</th>
                                                <th scope="col">name_Group</th>
                                                {/* <th scope="col">{t('edit')}</th>
                                                <th scope="col">{t('delete')}</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.groups && data.groups.map((d, i) => (
                                                <tr key={i}>
                                                    <td><span className='text-form'>{d.idGroup}</span></td>
                                                    <td><span className="d-block fs-6">{d.codGroup}</span></td>
                                                    <td><span className="d-block fs-6">{d.nameGroup}</span></td>
                                                    {/* <td>
                                                        <button className="btn btn-white btn-sm me-2">
                                                            <i className="bi bi-pencil"></i> {t('edit')}
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-white btn-sm">
                                                            <i className="bi bi-trash"></i> {t('delete')}
                                                        </button>
                                                    </td> */}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

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
                                {data.schools && data.schools.map((school, index) => (
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
                                {data.groups && data.groups.map((group, index) => (
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

