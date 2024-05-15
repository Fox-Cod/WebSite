import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AddActivityTeam } from '../component/Other';
import { useParams, Link } from 'react-router-dom';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { team, sendInvite, joinTeam, updateTeamActivityText } from '../../http/deviceAPI';
import { Context } from '../../context';

export default function Team() {
    const auth = useContext(Context);
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
    const userId = auth.user._userId;

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (auth.user._isAuth) {
                    const res = await team(teamId);
                    setTeamData(res.team);
                    setTeamMembers(res.teamMembers);
                    setTeamActivity(res.teamActivity);
                    setCurrentUser(res.idTeacher);
                    setLoading(false);
                    console.log("User is authenticated");
                } else {
                    setLoading(false)
                    console.log("User is not authenticated");
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    const handleInviteButtonClick = async () => {
        try {
            const res = await sendInvite(teamId, inviteFormData);
            console.log(res);
            location.reload();
        } catch (error) {
            console.error('Ошибка при отправке приглашения:', error.message);
        }
    };

    const handleJoinTeamButtonClick = async () => {
        try {
            const res = await joinTeam(teamId, userId);
            console.log(res);
            location.reload();

        } catch (error) {
            console.error(error, res);
        }
    };

    const updateTeamPrivacy = async (teamId, newPrivacy) => {
        try {
            const response = await axios.put(`http://localhost:8081/api/team/${teamId}/privacy`, { newPrivacy }, { withCredentials: true });
            console.log(response);
            location.reload();
        } catch (error) {
            console.error('Ошибка при обновлении статуса команды:', error.message);
        }
    };

    const handlePrivacyChange = async (event) => {
        const newPrivacy = event.target.checked ? 1 : 0;
        await updateTeamPrivacy(teamId, newPrivacy); // Замените teamId на идентификатор вашей команды
    };


    const handleCancel = (index) => {
        setEditModes(prevState => ({
            ...prevState,
            [index]: false
        }));
    };

    // Обработчик для кнопки "Редактировать"
    const handleEditClick = (index, activity) => {
        console.log("Index comm", activity, editedText)
        const newEditModes = {};
        Object.keys(editModes).forEach((key) => {
            newEditModes[key] = false;
        });
        newEditModes[index] = true;
        setEditModes(newEditModes);
        setEditedText(activity.descriptionActivityTeam);
    };

    // Обработчик для кнопки "Удалить"
    const handleDeleteClick = (index) => {
        const newTeamActivity = [...teamActivity];
        newTeamActivity.splice(index, 1); // Удалить элемент из массива
        const newEditModes = [...editModes];
        newEditModes.splice(index, 1); // Удалить соответствующий флаг редактирования
        setTeamActivity(newTeamActivity);
        setEditModes(newEditModes);
    };

    const handleSave = async (idActivityTeam) => {
        try {
            const res = await updateTeamActivityText(idActivityTeam, editedText)
            console.log(res.data);
        } catch (error) {
            console.error('Ошибка при сохранении обновлённой деятельности:', error);
        }
    };

    const handleEditorChange = (content) => {
        setEditedText(content);
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
        return <p>Loading...</p>;

    }

    if (error) {
        return <p>Error: {error}</p>;
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
                                        <li className="breadcrumb-item">
                                            <Link to={`/team/${teamData.idTeam}`}>Equipa - {teamData.idTeam}</Link>
                                        </li>
                                    </ol>
                                </nav>

                                <h1 className="page-header-title">#{teamData.nameTeam}</h1>
                                <p>{teamData.descriptionTeam}</p>

                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="text-dark pb-3">O estado atual da sua equipa:
                                        <div className={`form-text badge bg-soft-primary text-${teamData.privacy === 1 ? 'success' : 'danger'} rounded-pill me-1`}>
                                            {teamData.privacy === 1 ? 'Publico' : 'Privado'} <i className={`bi bi-${teamData.privacy === 1 ? 'globe2' : 'lock'}`}></i>
                                        </div>
                                    </span>

                                    <span className="card-subtitle pb-3">Indústria: <a className="form-text badge bg-soft-primary text-primary rounded-pill me-1" href="#">{teamData.areasWork}</a></span>
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
                                        <button type="button" className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#shareWithPeopleModal">
                                            <i className="bi bi-plus"></i>Add user
                                        </button>
                                        {!isCurrentUserInTeam && (teamData.privacy === 1 && (
                                            <button type="button" className="btn btn-outline-primary btn-sm" onClick={handleJoinTeamButtonClick}>
                                                Entrar
                                            </button>
                                        ))}

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
                        {isCurrentUserInTeam && <AddActivityTeam />}
                        <div className="card h-30">
                            <div className="card-header">
                                <h4 className="card-header-title">Atividades</h4>
                            </div>
                            <div className="card-body">
                                {teamActivity.length > 0 ? (
                                    teamActivity.map((activity, index) => (
                                        <ul className="step" key={activity.idActivityTeam}>
                                            <form className="step-item" onSubmit={(event) => handleSave(activity.idActivityTeam)}>
                                                <li className="step-item">
                                                    <div className="step-content-wrapper">
                                                        <div className="step-avatar">
                                                            <span className="avatar avatar-soft-dark" data-toggle="tooltip" data-placement="top" title={activity.users.name}>
                                                                <span className="avatar-initials">{activity.users.name.charAt(0).toUpperCase()}</span>
                                                            </span>
                                                        </div>

                                                        <div className="step-content">
                                                            <Link className="d-flex align-items-center me-2" to={`/view-activity/${activity.users.idTeacher}`}>
                                                                <h5 className="mb-1">{activity.users.name}</h5>
                                                            </Link>
                                                            {editModes[index] ? (
                                                                <div className='quill-custom rounded'>
                                                                    <ReactQuill
                                                                        value={editedText}
                                                                        onChange={handleEditorChange}
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
                                                            {activity.fileName && (
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
                                                                                            <span><Link to={`http://localhost:8081/api/files/${activity.fileName}`} download> Download</Link></span>
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            )}
                                                            <span className="d-block fs-6 text-dark text-truncate">{formatDate(activity.CreateDate)}</span>
                                                        </div>

                                                        {currentUser === activity.idTeacher && !editModes[index] && (
                                                            <div className="btn-group">
                                                                <div>
                                                                    <div style={{ display: 'inline-block', marginRight: '10px', cursor: 'pointer' }} onClick={() => handleEditClick(index, activity)}>
                                                                        <i className="bi bi-pencil"></i>
                                                                    </div>
                                                                    <div style={{ display: 'inline-block', cursor: 'pointer' }} onClick={() => handleDeleteClick(index)}>
                                                                        <i className="bi bi-trash"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    {editModes[index] && (
                                                        <div className="btn-group mt-2">
                                                            <button className="btn btn-sm btn-success me-2" type='submit'>
                                                                Сохранить
                                                            </button>
                                                            <button className="btn btn-sm btn-secondary" onClick={() => handleCancel(index)}>
                                                                Отмена
                                                            </button>
                                                        </div>
                                                    )}
                                                </li>
                                            </form>
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
                                                <option value="Convidado">Convidado</option>
                                                <option value="Administrador">Administrador</option>
                                            </select>
                                        </div>
                                        <button className="btn btn-primary d-none d-sm-inline-block" onClick={handleInviteButtonClick}>Convidar</button>
                                    </div>
                                </div>
                            </div>

                            <h5>Membros que fazem parte de {teamData.nome_equipa}</h5>
                            <p>Este equipa é público e pode ser acedido por qualquer utilizador.</p>

                            <ul className="list-unstyled list-py-2">
                                {teamMembers.map((member, index) => (
                                    <li key={`${member.id}-${index}`}>
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
                                                                    <>
                                                                        <option value="Administrador">Administrador</option>
                                                                        <option value="Convidado" selected>Convidado</option>
                                                                        <option value="remove">Remover</option>
                                                                    </>
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
                                    <i className="bi bi-gear text-primary me-2"></i>
                                    <span className="text-dark">O estado atual da sua equipa:
                                        <div className={`form-text badge bg-soft-primary text-${teamData.privacy === 1 ? 'success' : 'danger'} rounded-pill me-1`}>
                                            {teamData.privacy === 1 ? 'Publico' : 'Privado'} <i className={`bi bi-${teamData.privacy === 1 ? 'globe2' : 'lock'}`}></i>
                                        </div>
                                    </span>
                                </span>
                                <span className="col-4 col-sm-3 text-end">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="addTeamPreferencesNewProjectSwitch1"
                                        defaultChecked={teamData.privacy === 1}
                                        onChange={handlePrivacyChange}
                                    />
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

