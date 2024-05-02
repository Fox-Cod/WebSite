import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AddActivityTeam } from '../component/Other';
import { useParams, Link } from 'react-router-dom';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Team() {
    const [editModes, setEditModes] = useState({});
    const [editedText, setEditedText] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [teamData, setTeamData] = useState(null);
    const [teamActivity, setTeamActivity] = useState(null);
    const [teamMembers, setTeamMembers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [inviteFormData, setInviteFormData] = useState({
        email: "",
        access: "" || "Convidado",
    });

    const { teamId } = useParams();

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/api/view-teams/${(teamId)}`, { withCredentials: true });
            setTeamData(response.data.team);
            setTeamMembers(response.data.teamMembers);
            setTeamActivity(response.data.teamActivity);
            setCurrentUser(response.data.idTeacher);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [teamId]);

    const inviteUser = async () => {
        console.log(inviteFormData)
        try {
            const response = await axios.post(`http://localhost:8081/api/add-member-to-team/${(teamId)}`, { withCredentials: true }, {
                idTeam: teamId,
                ...inviteFormData,
            });
            location.reload();
            console.log('Приглашение отправлено:', response.data);

            const updatedTeam = response.data.updatedTeam;
            setTeamData(updatedTeam);

            setInviteFormData({
                email: "",
                access: "Convidado",
            });
        } catch (error) {
            console.error('Ошибка при отправке приглашения:', error.message);
        }
    };

    const handleJoinTeam = async () => {
        try {
            const response = await axios.post('http://localhost:8081/api/join-team', { teamId, currentUser }, { withCredentials: true });
            console.log(response.data);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };
    

    const handleEdit = (index, activity) => {
        // Close edit mode for all other posts
        const newEditModes = {};
        Object.keys(editModes).forEach((key) => {
            newEditModes[key] = false;
        });

        // Open edit mode for the selected post
        newEditModes[index] = true;
        setEditModes(newEditModes);
        setEditedText(activity.descriptionActivityTeam);
    };


    const handleSave = async (index) => {
        try {

            const response = await axios.post(`http://localhost:8081/api/lll/${teamId, index}`)
            console.log(response)

            setEditModes(prevState => ({
                ...prevState,
                [index]: false
            }));

        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const handleCancel = (index) => {
        setEditModes(prevState => ({
            ...prevState,
            [index]: false
        }));
    };


    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setInviteFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    function formatDate(rawDate) {
        const dataRegistro = new Date(rawDate);
        const day = dataRegistro.getDate();
        const month = dataRegistro.toLocaleString('default', { month: 'long' });
        const year = dataRegistro.getFullYear();
        return `${day} ${month} ${year}`;
    }

    const formatBytes = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    if (loading) {
        return <p>Загрузка...</p>;

    }

    if (error) {
        return <p>Ошибка: {error}</p>;
    }
    const isCurrentUserInTeam = teamMembers.some(member => member.users.idTeacher === currentUser);

    return (
        <div>
            <main id="content" role="main" className="container mt-4">
                <div className="content container-fluid my-2 bg-body rounded shadow-sm">
                    <div className="">
                        <div className="row align-items-end">
                            <div className="col-sm mb-0 mb-sm-0">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb breadcrumb-no-gutter pt-3">
                                        <li className="breadcrumb-item"><Link to={`/team/${teamData.idTeam}`}>Equipa - {teamData.idTeam}</Link></li>
                                    </ol>
                                </nav>

                                <h1 className="page-header-title">#{teamData.nameTeam}</h1>
                                <p>{teamData.descriptionTeam}</p>

                                <div className="d-flex justify-content-between align-items-center"> {/* Добавлен контейнер для кнопок */}

                                    <div>
                                        <span className="card-subtitle pb-3">Indústria: <a className="badge bg-soft-primary text-primary p-2" href="#">{teamData.areasWork}</a></span>
                                        <h6>Data de Criacao: {formatDate(teamData.CreateDate)}</h6>
                                    </div>
                                    {!isCurrentUserInTeam && (
                                        <button type="button" className="btn btn-outline-primary btn-sm" onClick={handleJoinTeam}>
                                            Entrar
                                        </button>
                                    )}

                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-4 mb-4">
                    <div className="col-lg-4">
                        <div id="accountSidebarNav"></div>

                        <div className="js-sticky-block card mb-3 mb-lg-5">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <h4 className="card-header-title mb-0">Membros</h4>
                                <div className="col-lg-auto">
                                    <div className="input-group">
                                        <button type="button" className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#shareWithPeopleModal"><i class="bi bi-plus"></i>Add user</button>
                                    </div>
                                </div>
                            </div>

                            <div className="card-body">
                                <ul className="list-unstyled list-py-2 text-dark mb-0">
                                    {teamMembers.map((member) => (
                                        <li key={member.users.idTeacher}>
                                            <div className="d-flex align-items-center">
                                                <Link className="d-flex align-items-center me-2" to={`/view-profile/${member.users.idTeacher}`}>
                                                    <div className="flex-shrink-0">
                                                        <span className="avatar avatar-soft-dark" data-toggle="tooltip" data-placement="top" title={member.users.name}>
                                                            <span className="avatar-initials">{member.users.name.charAt(0).toUpperCase()}</span>
                                                        </span>
                                                    </div>
                                                    <div className="flex-grow-1 ms-3">
                                                        <h5 className="text-hover-primary mb-0">{member.users.name}</h5>
                                                        <span className="fs-6 text-body">{member.access}</span>
                                                    </div>
                                                </Link>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>


                    <div className="col-sm-8">
                        <AddActivityTeam />
                        <div className="card h-30">
                            <div className="card-header">
                                <h4 className="card-header-title">Atividades</h4>
                            </div>
                            <div className="card-body">
                                {teamActivity.length > 0 ? (
                                    teamActivity.map((activity, index) => (
                                        <ul className="step" key={activity.users.idTeacher}>
                                            <li className="step-item">
                                                <div className="step-content-wrapper">
                                                    <div className="step-avatar">
                                                        <span className="avatar avatar-soft-dark" data-toggle="tooltip" data-placement="top" title={activity.users.name}>
                                                            <span className="avatar-initials">{activity.users.name.charAt(0).toUpperCase()}</span>
                                                        </span>
                                                    </div>

                                                    <div className="step-content">
                                                        <Link className="d-flex align-items-center me-2" to={`/view-activity/${activity.users.idTeacher}`}><h5 className="mb-1">{activity.users.name}</h5></Link>
                                                        {/* <p className="fs-5 mb-1" value={editedText} onChange={(e) => setEditedText(e.target.value)} width="32" height="32"><div dangerouslySetInnerHTML={{ __html: activity.descriptionActivityTeam }} /></p> */}
                                                        {editModes[index] ? (
                                                            <div className='quill-custom rounded'>
                                                                <ReactQuill
                                                                    value={editedText}
                                                                    onChange={(e) => setEditedText(e.target.value)}
                                                                    placeholder="Text..."
                                                                    modules={{
                                                                        toolbar: {
                                                                            container: [
                                                                                ['bold', 'italic', 'underline', 'strike'],
                                                                                [{ list: 'ordered' }, { list: 'bullet' }],
                                                                                ['link', 'image'],
                                                                            ],
                                                                        },
                                                                    }}
                                                                    formats={['bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'link', 'image']}
                                                                />
                                                            </div>
                                                        ) : (
                                                            <p className="fs-5 mb-1" width="64" height="64"><div dangerouslySetInnerHTML={{ __html: activity.descriptionActivityTeam }} /></p>
                                                        )}
                                                        {activity.fileName ? (
                                                            <ul className="list-group list-group-sm">
                                                                <li className="list-group-item list-group-item-light">
                                                                    <div className="row gx-1">

                                                                        <div className="col-sm-4">
                                                                            <div className="d-flex">
                                                                                <div className="flex-shrink-0">
                                                                                    <img className="avatar avatar-xs" src="../assets/svg/components/placeholder-img-format.svg" alt="Image Description" />
                                                                                </div>
                                                                                <div className="flex-grow-1 text-truncate ms-2">
                                                                                    <span>{activity.fileName}
                                                                                        <span className="d-block small text-muted">{formatBytes(activity.fileSize)}</span>
                                                                                        {/* <span><Link to="#">Ver </Link></span> */}

                                                                                        <span><Link to={`http://localhost:8081/api/files/${activity.filename}`} download> Download</Link></span>
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        ) : null}
                                                        <span className="d-block fs-6 text-dark text-truncate">{formatDate(activity.CreateDate)}</span>
                                                    </div>


                                                    {currentUser === activity.idTeacher && !editModes[index] ? (
                                                        <div className="btn-group">
                                                            <div>
                                                                <div style={{ display: 'inline-block', marginRight: '10px', cursor: 'pointer' }}>
                                                                    <i className="bi bi-pencil" onClick={() => handleEdit(index, activity)}></i>
                                                                </div>
                                                                <div style={{ display: 'inline-block', cursor: 'pointer' }}>
                                                                    <i className="bi bi-trash"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : null}


                                                </div>
                                                {editModes[index] ? (
                                                    <div className="btn-group mt-2">
                                                        <button className="btn btn-sm btn-success me-2" onClick={() => handleSave(index)}>
                                                            Сохранить
                                                        </button>
                                                        <button className="btn btn-sm btn-secondary" onClick={() => handleCancel(index)}>
                                                            Отмена
                                                        </button>
                                                    </div>
                                                ) : null}
                                            </li>
                                        </ul>
                                    ))
                                ) : (
                                    <div className="text-center">
                                        <img className='mb-5' src="../assets/svg/illustrations/oc-growing.svg" alt="Img NoData" style={{ height: '20rem' }} />
                                        <h5>Não tens nada.</h5>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <div className="modal fade" id="shareWithPeopleModal" tabIndex="-1" aria-labelledby="shareWithPeopleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '700px', width: '90%' }}>
                    <div className="modal-content">
                        <div className="modal-header ">
                            <h5>Partilhar ideias de especialistas</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                        </div>

                        <div className="modal-body">
                            <h5>Adicionar novos membros ao seu projeto</h5>
                            <p>As pessoas convidadas serão adicionadas à sua organização.</p>
                            <div className="mb-4">
                                <div className="input-group mb-2 mb-sm-0">
                                    <input className="form-control" type="email" id="email" value={inviteFormData.name} onChange={handleInputChange} placeholder="Procurar por e-mails" />

                                    <div className="input-group-append input-group-append-last-sm-down-none">
                                        <div className="tom-select-custom tom-select-custom-end">
                                            <select className="js-select form-select tom-select-custom-form-select-invite-user" id="access" value={inviteFormData.access} onChange={handleInputChange} >
                                                <option value="Guest">Convidado</option>
                                                <option value="Administrador">Administrador</option>
                                            </select>
                                        </div>
                                        <button className="btn btn-primary d-none d-sm-inline-block" onClick={inviteUser}>Convidar</button>
                                    </div>
                                </div>
                            </div>

                            <h5>Membros que fazem parte de {teamData.nome_equipa}</h5>
                            <p>Este equipa é público e pode ser acedido por qualquer utilizador.</p>

                            <ul className="list-unstyled list-py-2">
                                {teamMembers.map((member) => (
                                    <li key={member.id}>
                                        <div className="d-flex">
                                            <div className="flex-shrink-0">
                                                <span className="avatar avatar-soft-dark" data-toggle="tooltip" data-placement="top" title={member.users.name}>
                                                    <span className="avatar-initials">{member.users.name.charAt(0).toUpperCase()}</span>
                                                </span>
                                            </div>

                                            <div className="flex-grow-1 ms-3">
                                                <div className="row align-items-center">
                                                    <div className="col-sm">
                                                        <h5 className="text-body mb-0">{member.users.name}</h5>
                                                        <span className="d-block fs-6">{member.users.email}</span>
                                                    </div>

                                                    <div className="col-sm-auto">
                                                        <div className="tom-select-custom tom-select-custom-sm-end">
                                                            <select className="js-select form-select" id="privacyNewProjectLabel" >
                                                                {member.access === 'Administrador' ? (
                                                                    <option value="Administrador" selected disabled>Administrador</option>
                                                                ) : (
                                                                    <React.Fragment>
                                                                        <option value="Administrador">Administrador</option>
                                                                        <option value="Convidado" selected>Convidado</option>
                                                                        <option value="remove">Remover</option>
                                                                    </React.Fragment>
                                                                )}




                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <label className="row form-check form-switch" htmlFor="addTeamPreferencesNewProjectSwitch1">
                                <span className="col-8 col-sm-9 ms-0">
                                    <i className="bi-bell text-primary me-2"></i>
                                    <span className="text-dark">Informar todos os membros do projeto</span>
                                </span>
                                <span className="col-4 col-sm-3 text-end">
                                    <input type="checkbox" className="form-check-input" id="addTeamPreferencesNewProjectSwitch1" defaultChecked />
                                </span>
                            </label>
                        </div>

                        <div className="modal-footer">
                            <div className="row align-items-center flex-grow-1 mx-n2">
                                <div className="col-sm-9 mb-2 mb-sm-0">
                                    <input type="hidden" id="publicShareLinkClipboard" value="123" />

                                    <p className="modal-footer-text">O link de compartilhamento público <a className="link" href="#">configurações</a>
                                        <i className="bi-question-circle" data-bs-toggle="tooltip" data-bs-placement="top" title="O link de compartilhamento público permite que as pessoas visualizem o projeto sem conceder acesso a todas as funcionalidades de colaboração."></i>
                                    </p>
                                </div>

                                <div className="col-sm-3 text-sm-end">
                                    <a className="js-clipboard btn btn-white btn-sm text-nowrap" href="javascript:;" data-bs-toggle="tooltip" data-bs-placement="top" title="Copiar para a área de transferência!" data-hs-clipboard-options='{
                                        "type": "tooltip",
                                        "successText": "Copiado!",
                                        "contentTarget": "#publicShareLinkClipboard",
                                        "container": "#shareWithPeopleModal"
                                    }'>
                                        <i className="bi-link me-1"></i> Copiar link</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

