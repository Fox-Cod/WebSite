import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AddActivityTeam } from '../../components/Other';
import { team, sendInvite, joinTeam, updateTeamActivityText, deleteActivityTeam, privacy } from '../../api/deviceAPI';
import { Context } from '../../contexts/context';
import { useTranslation } from 'react-i18next';

export default function Team() {
    const auth = useContext(Context);
    const { teamId } = useParams();
    const { t } = useTranslation();
    const userId = auth.user._userId;

    const [state, setState] = useState({
        editModes: {},
        editedText: '',
        teamData: null,
        teamActivity: null,
        teamMembers: null,
        loading: true,
        error: null,
        inviteFormData: { email: "", access: "Convidado" }
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (auth.user._isAuth) {
                    const res = await team(teamId);
                    setState(prevState => ({
                        ...prevState,
                        teamData: res.team,
                        teamMembers: res.teamMembers,
                        teamActivity: res.teamActivity,
                        loading: false
                    }));
                } else {
                    setState(prevState => ({ ...prevState, loading: false }));
                }
            } catch (err) {
                setState(prevState => ({ ...prevState, error: err.message, loading: false }));
            }
        };
        fetchData();
    }, [auth.user._isAuth, teamId]);



    const handleInviteButtonClick = async () => {
        const { email } = state.inviteFormData;
        if (!email.trim()) {
            alert('Por favor, insira um endereço de e-mail válido.');
            return;
        }

        try {
            await sendInvite(teamId, state.inviteFormData);
            window.location.reload();
        } catch (error) {
            console.error('Erro ao enviar o convite:', error.message);
        }
    };

    const handleJoinTeamButtonClick = async () => {
        try {
            await joinTeam(teamId, userId);
            window.location.reload();
        } catch (error) {
            console.error(error.message);
        }
    };

    const handlePrivacyChange = async (event) => {
        try {
            await privacy(teamId, event.target.checked ? 1 : 0);
            window.location.reload();
        } catch (error) {
            console.error('Erro ao atualizar o estado da equipa:', error.message);
        }
    };

    const handleCancel = (index) => setState(prevState => ({
        ...prevState,
        editModes: { ...prevState.editModes, [index]: false }
    }));

    const handleEditClick = (index, activity) => setState(prevState => ({
        ...prevState,
        editModes: { [index]: true },
        editedText: activity.descriptionActivityTeam
    }));

    const handleDeleteClick = async (idActivityTeam) => {
        try {
            await deleteActivityTeam(idActivityTeam);
            window.location.reload();
        } catch (error) {
            console.error('Erro ao eliminar membro da equipa:', error.message);
        }
    };

    const handleSave = async (idActivityTeam) => {
        try {
            await updateTeamActivityText(idActivityTeam, state.editedText);
            window.location.reload();
        } catch (error) {
            console.error('Erro ao guardar atividade actualizada:', error.message);
        }
    };

    const handleEditorChange = (content) => setState(prevState => ({ ...prevState, editedText: content }));
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setState(prevState => ({ ...prevState, inviteFormData: { ...prevState.inviteFormData, [id]: value } }));
    };

    const formatDate = (rawDate) => {
        const date = new Date(rawDate);
        return date.toDateString() === new Date().toDateString() ?
            date.toLocaleTimeString('default', { hour: 'numeric', minute: 'numeric' }) :
            date.toLocaleDateString('default', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    const formatBytes = (bytes) => {
        const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${units[i]}`;
    };

    if (state.loading) return <p>Loading...</p>;
    if (state.error) return <p>Error: {state.error}</p>;

    const sortedActivities = state.teamActivity?.slice().sort((a, b) => new Date(b.CreateDate) - new Date(a.CreateDate)) || [];
    const administrators = state.teamMembers?.filter(member => member.access === 'Administrador') || [];
    const isCurrentUserInTeam = state.teamMembers?.some(member => member.users.idTeacher === userId);
    const isAdministrator = state.teamMembers?.some(member => member.users.idTeacher === userId && member.access === 'Administrador');

    return (
        <div>
            <main id="content" role="main" className="container mt-4">
                <div className="content container-fluid my-2 card rounded shadow-sm">
                    <div className="row align-items-end">
                        <div className="col-sm">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb breadcrumb-no-gutter pt-3">
                                    <li className="breadcrumb-item">
                                        <Link to={`/team/${state.teamData.idTeam}`}>{t('teams')} - {state.teamData.idTeam}</Link>
                                    </li>
                                </ol>
                            </nav>
                            <h1 className="page-header-title">#{state.teamData.nameTeam}</h1>
                            <p>{state.teamData.descriptionTeam}</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <span className="text-dark pb-3">
                                    {t('team_status')}
                                    <div className={`form-text badge bg-soft-primary text-${state.teamData.privacy === 1 ? 'success' : 'danger'} rounded-pill me-1`}>
                                        {state.teamData.privacy === 1 ? 'Publico' : 'Privado'} <i className={`bi bi-${state.teamData.privacy === 1 ? 'globe2' : 'lock'}`}></i>
                                    </div>
                                </span>
                                <span className="card-subtitle pb-3">{t('industry')} <a className="form-text badge bg-soft-primary text-primary rounded-pill me-1" href="#">{state.teamData.areasWork}</a></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-4 mb-4">
                    <div className="col-lg-4">
                        <div className="js-sticky-block card mb-3 mb-lg-5">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <h4 className="card-header-title mb-0">{t('members')}</h4>
                                <div className="col-lg-auto">
                                    <div className="input-group">
                                        {isAdministrator && (
                                            <button type="button" className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#settingsModal">
                                                <i className="bi bi-plus"></i>{t('settings')}
                                            </button>
                                        )}
                                        {!isCurrentUserInTeam && state.teamData.privacy === 1 && (
                                            <button type="button" className="btn btn-outline-primary btn-sm" onClick={handleJoinTeamButtonClick}>
                                                {t('join_the_team')}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <ul className="list-unstyled list-py-2 text-dark mb-0">
                                    {administrators.map(member => (
                                        <li key={member.users.idTeacher}>
                                            <div className="d-flex align-items-center">
                                                <Link className="d-flex align-items-center me-2" to={`/profile/view-profile/${member.users.idTeacher}`}>
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
                                    {state.teamMembers.filter(member => member.access !== 'Administrador').map(member => (
                                        <li key={member.users.idTeacher}>
                                            <div className="d-flex align-items-center">
                                                <Link className="d-flex align-items-center me-2" to={`/profile/view-profile/${member.users.idTeacher}`}>
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
                        <div class="card">
                            <div class="accordion-header" id="headingOne">
                                <button class="btn btn-white btn-sm w-100" role="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                    Add Activity
                                </button>
                            </div>
                            <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    {isCurrentUserInTeam && <AddActivityTeam />}
                                </div>
                            </div>
                        </div>
                        <div className="card h-30">
                            <div className="card-header">
                                <h4 className="card-header-title">{t('activity')}</h4>
                            </div>
                            <div className="card-body">
                                <ul className="step step-icon-xs mb-3">
                                    {sortedActivities.length > 0 ? sortedActivities.map((activity, index) => (
                                        <li key={activity.idActivityTeam} className="step-item">
                                            <div className="step-content-wrapper">
                                                <span className="step-icon">
                                                    <div className="flex-shrink-0">
                                                        <span className="avatar avatar-soft-dark">
                                                            <span className="avatar-initials">{activity.users.name.charAt(0).toUpperCase()}</span>
                                                        </span>
                                                    </div>
                                                </span>
                                                <div className="flex-grow-1 ms-3">
                                                    <h5 className="mb-1">
                                                        <small className="text-muted"><Link className="text-dark" to={`/profile/view-profile/${activity.users.idTeacher}`}>{activity.users.name}</Link> | {formatDate(activity.CreateDate)}</small>
                                                    </h5>
                                                    <div className="mt-1 text-dark">
                                                        {state.editModes[index] && activity.users.idTeacher === auth.user._userId ? (
                                                            <>
                                                                <div className='quill-custom rounded'>
                                                                    <ReactQuill
                                                                        value={state.editedText}
                                                                        onChange={handleEditorChange}
                                                                        placeholder="Text.."
                                                                        modules={{
                                                                            toolbar: {
                                                                                container: [
                                                                                    ['bold', 'italic', 'underline', 'strike'],
                                                                                    [{ list: 'ordered' }, { list: 'bullet' }],
                                                                                    ['link'],
                                                                                ],
                                                                            },
                                                                        }}
                                                                        formats={['bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'link']}
                                                                    />
                                                                </div>
                                                                <button className="btn btn-primary btn-xs ms-2 mt-2" onClick={() => handleSave(activity.idActivityTeam)}>{t('save')}</button>
                                                                <button className="btn btn-ghost-secondary btn-xs ms-2 mt-2" onClick={() => handleCancel(index)}>{t('cancel')}</button>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div dangerouslySetInnerHTML={{ __html: activity.descriptionActivityTeam }} />
                                                                {activity.fileName && (
                                                                    <ul className="list-group list-group-sm">
                                                                        <li className="list-group-item list-group-item-light">
                                                                            <div className="row gx-1">
                                                                                <div className="col-sm-4">
                                                                                    <div className="d-flex">
                                                                                        <div className="flex-shrink-0">
                                                                                            <img className="avatar avatar-xs" src="../assets/svg/illustrations/placeholder-img-format.svg" alt="Image Description" />
                                                                                        </div>
                                                                                        <div className="flex-grow-1 text-truncate ms-2">
                                                                                            <span>{activity.fileName}
                                                                                                <span className="d-block small text-muted">{formatBytes(activity.fileSize)}</span>
                                                                                                <span><Link to={`http://localhost:8081/api/files/${activity.fileName}`} download> {t('download')}</Link></span>
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                )}
                                                                {activity.users.idTeacher === auth.user._userId ? (
                                                                    <div className="d-flex justify-content-end">
                                                                        <button type="button" className="btn btn-outline-primary btn-xs mt-2" onClick={() => handleEditClick(index, activity)}>{t('edit')}</button>
                                                                        <button type="button" className="btn btn-outline-danger btn-xs ms-2 mt-2" onClick={() => handleDeleteClick(index, activity.idActivityTeam)}>{t('delete')}</button>
                                                                    </div>
                                                                ) : null}

                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    )) : <div className='container text-center'>
                                        <img src="../assets/svg/illustrations/oc-project-development.svg" alt="Image Description" style={{ height: '20rem' }}/>
                                        <p>{t('no_team_activity_data')}</p>
                                    </div>}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <div className="modal fade" id="settingsModal" tabIndex="-1" role="dialog" aria-labelledby="settingsModalTitle" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 id="settingsModalTitle" className="modal-title">{t('settings')}</h3>
                            <button type="button" className="btn btn-ghost-secondary btn-icon btn-sm" data-bs-dismiss="modal" aria-label="Close">
                                <i className="bi-x-lg"></i>
                            </button>
                        </div>
                        <div className="modal-body">
                            <h5>{t('text_info_setiting_team_1')}</h5>
                            <p>{t('text_info_setiting_team_2')}</p>
                            <div className="mb-4">
                                <div className="input-group mb-2 mb-sm-0">
                                    <input className="form-control" type="email" id="email" value={state.inviteFormData.name} onChange={handleInputChange} placeholder="Search for emails" />
                                    <div className="input-group-append input-group-append-last-sm-down-none">
                                        <div className="tom-select-custom tom-select-custom-end">
                                            <select className="js-select form-select tom-select-custom-form-select-invite-user" id="access" value={state.inviteFormData.access} onChange={handleInputChange} >
                                                <option value="Convidado">{t('guest')}</option>
                                                <option value="Administrador">{t('administrator')}</option>
                                            </select>
                                        </div>
                                        <button className="btn btn-primary d-none d-sm-inline-block" onClick={handleInviteButtonClick}>{t('invite')}</button>
                                    </div>
                                </div>
                            </div>

                            <h5>{t('text_info_setiting_team_3')} {state.teamData.nameTeam}</h5>
                            <p>{t('text_info_setiting_team_4')}</p>

                            <ul className="list-unstyled list-py-2">
                                {state.teamMembers.map((member, index) => (
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
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            {isAdministrator ? (
                                <label className="row form-check form-switch" htmlFor="addTeamPreferencesNewProjectSwitch1">
                                    <span className="col-8 col-sm-9 ms-0">
                                        <i className="bi bi-gear text-primary me-2"></i>
                                        <span className="text-dark">{t('team_status')}
                                            <div className={`form-text badge bg-soft-primary text-${state.teamData.privacy === 1 ? 'success' : 'danger'} rounded-pill me-1`}>
                                                {state.teamData.privacy === 1 ? `${t('public')}` : `${t('private')}`} <i className={`bi bi-${state.teamData.privacy === 1 ? 'globe2' : 'lock'}`}></i>
                                            </div>
                                        </span>
                                    </span>
                                    <span className="col-4 col-sm-3 text-end">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="addTeamPreferencesNewProjectSwitch1"
                                            defaultChecked={state.teamData.privacy === 1}
                                            onChange={handlePrivacyChange}
                                        />
                                    </span>
                                </label>
                            ) : (null)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

