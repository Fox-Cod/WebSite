import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AddActivityTeam } from '../component/Other';
import { useParams, Link } from 'react-router-dom';
import moment from 'moment';

export default function Team() {
    const [teamData, setTeamData] = useState(null);
    const [teamActivity, setTeamActivity] = useState(null);
    const [teamMembers, setTeamMembers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [inviteFormData, setInviteFormData] = useState({
        nome_professor: "",
        nivel_de_acesso: "" || "Guest",
    });

    const { teamId } = useParams();
    console.log('Team ID:', teamId);


    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/api/view-teams/${(teamId)}`);
            setTeamData(response.data.team);
            setTeamMembers(response.data.teamMembers);
            setTeamActivity(response.data.teamActivity);
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
            const response = await axios.post(`http://localhost:8081/api/add-member-to-team/${(teamId)}`, {
                id_equipa: teamId,
                ...inviteFormData,
            });
            location.reload();
            console.log('Приглашение отправлено:', response.data);

            const updatedTeam = response.data.updatedTeam;
            setTeamData(updatedTeam);

            setInviteFormData({
                nome_professor: "",
                nivel_de_acesso: "guest",
            });
        } catch (error) {
            console.error('Ошибка при отправке приглашения:', error.message);
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInviteFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    if (loading) {
        return <p>Загрузка...</p>;

    }

    if (error) {
        return <p>Ошибка: {error}</p>;
    }
    function formatTimeDifference(creationTime) {
        const creationMoment = moment(creationTime);

        const today = moment();
        const isSameYear = creationMoment.isSame(today, 'year');

        if (isSameYear) {
            return creationMoment.format('Do MMMM HH:mm');
        } else {
            return creationMoment.format('Do MMMM YYYY HH:mm');
        }
    }


    return (
        <div>
            <main id="content" role="main" className="container mt-4">
                <div className="content container-fluid my-2 bg-body rounded shadow-sm">
                    <div className="">
                        <div className="row align-items-end">
                            <div className="col-sm mb-0 mb-sm-0">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb breadcrumb-no-gutter pt-3">
                                        <li className="breadcrumb-item"><Link to={`/team/${teamData.id_equipa}`}>Equipa - {teamData.id_equipa}</Link></li>
                                    </ol>
                                </nav>

                                <h1 className="page-header-title">#{teamData.nome_equipa}</h1>
                            </div>
                            <div className="col-lg-auto">
                                <div class="input-group">

                                    <a class="btn btn-primary btn-icon rounded-circle" href="javascript:;" data-bs-toggle="modal" data-bs-target="#shareWithPeopleModal">
                                        <i class="bi-share-fill"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <span className="card-subtitle pb-3">Indústria: <a className="badge bg-soft-primary text-primary p-2" href="#">{teamData.industria}</a></span>
                </div>
                <div className="row mt-4 mb-4">
                    <div className="col-lg-4">
                        <div id="accountSidebarNav"></div>

                        <div className="js-sticky-block card mb-3 mb-lg-5">
                            <div className="card-header">
                                <h4 className="card-header-title">Membros</h4>
                            </div>


                            <div className="card-body">
                                <ul className="list-unstyled list-py-2 text-dark mb-0">
                                    {teamMembers.map((member) => (
                                        <li key={member.professores.id_professor}>
                                            <div className="d-flex align-items-center">
                                                <Link className="d-flex align-items-center me-2" to={`/view-profile/${member.professores.id_professor}`}>
                                                    <div className="flex-shrink-0">
                                                        <span className="avatar avatar-soft-dark" data-toggle="tooltip" data-placement="top" title={member.professores.nome_professor}>
                                                            <span className="avatar-initials">{member.professores.nome_professor.charAt(0).toUpperCase()}</span>
                                                        </span>
                                                    </div>
                                                    <div className="flex-grow-1 ms-3">
                                                        <h5 className="text-hover-primary mb-0">{member.professores.nome_professor}</h5>
                                                        <span className="fs-6 text-body">{member.nivel_de_acesso}</span>
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
                        <div className="card h-100">
                            <div className="card-header">
                                <h4 className="card-header-title">Atividades</h4>
                            </div>
                            <div className="card-body">
                                {teamActivity.length > 0 ? (
                                    teamActivity.map((activity) => (
                                        <ul className="step" key={activity.professores.id_professor}>

                                            {/* <li className="step-item">
                                            <div className="step-content-wrapper">
                                                <small className="step-divider">{formatTimeDifference(activity.data_criacao)}</small>
                                            </div>
                                        </li> */}

                                            <li className="step-item">
                                                <div className="step-content-wrapper">
                                                    <div className="step-avatar">
                                                        <span className="avatar avatar-soft-dark" data-toggle="tooltip" data-placement="top" title={activity.professores.nome_professor}>
                                                            <span className="avatar-initials">{activity.professores.nome_professor.charAt(0).toUpperCase()}</span>
                                                        </span>
                                                    </div>
                                                    <div className="step-content">
                                                        <Link className="d-flex align-items-center me-2" to={`/view-profile/${activity.professores.id_professor}`}><h5 className="mb-1">{activity.professores.nome_professor}</h5></Link>
                                                        <p className="fs-5 mb-1" width="32" height="32"><div dangerouslySetInnerHTML={{ __html: activity.descricao }} /></p>
                                                        {activity.filedata ? (
                                                            <ul className="list-group list-group-sm">
                                                                <li className="list-group-item list-group-item-light">
                                                                    <div className="row gx-1">
                                                                        <div className="col-sm-4">
                                                                            <div className="d-flex">
                                                                                <div className="flex-shrink-0">
                                                                                    <img className="avatar avatar-xs" src="../assets/svg/brands/excel-icon.svg" alt="Image Description" />
                                                                                </div>
                                                                                <div className="flex-grow-1 text-truncate ms-2">
                                                                                    <Link to={`data:application/octet-stream;base64,${activity.filedata}`} download={activity.filename}>
                                                                                        <span className="d-block fs-6 text-dark text-truncate">{activity.filename}</span>
                                                                                        <span className="d-block small text-muted">12kb</span>
                                                                                    </Link>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        ) : null}
                                                    </div>
                                                </div>
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
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="shareWithPeopleModalLabel">Convidar usuários</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                        </div>

                        <div className="modal-body">
                            <div className="mb-4">
                                <div className="input-group mb-2 mb-sm-0">
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="nome_professor"
                                        value={inviteFormData.nome_professor}
                                        onChange={handleInputChange}
                                        placeholder="Procurar por nome ou e-mails"
                                    />

                                    <div className="input-group-append input-group-append-last-sm-down-none">
                                        <div className="tom-select-custom tom-select-custom-end">
                                            <select className="js-select form-select tom-select-custom-form-select-invite-user"
                                                name="nivel_de_acesso"
                                                value={inviteFormData.nivel_de_acesso}
                                                onChange={handleInputChange}
                                            >
                                                <option value="Guest">Convidado</option>
                                                <option value="Administrator">Administrator</option>
                                            </select>
                                        </div>

                                        <button className="btn btn-primary d-none d-sm-inline-block" onClick={inviteUser}>Convidar</button>
                                    </div>
                                </div>
                            </div>
                            <ul className="list-unstyled list-py-2">
                                {teamMembers.map((member) => (
                                    <li key={member.id}>
                                        <div className="d-flex">
                                            <div className="flex-shrink-0">
                                                <span className="avatar avatar-soft-dark" data-toggle="tooltip" data-placement="top" title={member.professores.nome_professor}>
                                                    <span className="avatar-initials">{member.professores.nome_professor.charAt(0).toUpperCase()}</span>
                                                </span>
                                            </div>

                                            <div className="flex-grow-1 ms-3">
                                                <div className="row align-items-center">
                                                    <div className="col-sm">
                                                        <h5 className="text-body mb-0">{member.professores.nome_professor}</h5>
                                                        <span className="d-block fs-6">{member.professores.email_professor}</span>
                                                    </div>

                                                    <div className="col-sm-auto">
                                                        <div className="tom-select-custom tom-select-custom-sm-end">
                                                            <select className="js-select form-select form-select-borderless tom-select-custom-form-select-invite-user tom-select-form-select-ps-0" autoComplete="off" data-hs-tom-select-options='{
                                                                    "searchInDropdown": false,
                                                                    "hideSearch": true,
                                                                    "dropdownWidth": "11rem"
                                                                }'>
                                                                {member.nivel_de_acesso == 'Administrator' && <option value="Administrator" selected>Administrator</option>}
                                                                {member.nivel_de_acesso == 'Guest' && <option value="Guest" selected>Guest</option>}
                                                                {member.nivel_de_acesso !== 'Administrator' && <option value="Administrator" >Administrator</option>}

                                                                <option value="remove" data-option-template='<div className="text-danger">Remover</div>'>Remover</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                                {/* {teamMembers.map((member) => (
                                    <li key={member.id}>
                                        <div className="d-flex">
                                        <div className="flex-shrink-0">
                                            <span className="avatar avatar-soft-dark" data-toggle="tooltip" data-placement="top" title={member.professores.nome_professor}>
                                            <span className="avatar-initials">{member.professores.nome_professor.charAt(0).toUpperCase()}</span>
                                            </span>
                                        </div>

                                        <div className="flex-grow-1 ms-3">
                                            <div className="row align-items-center">
                                            <div className="col-sm">
                                                <h5 className="text-body mb-0">{member.professores.nome_professor}</h5>
                                                <span className="d-block fs-6">{member.professores.email_professor}</span>
                                            </div>

                                            <div className="col-sm-auto">
                                                {isAdmin && member.id !== currentUser.id && member.nivel_de_acesso !== 'Administrator' ? (
                                                <div className="tom-select-custom tom-select-custom-sm-end">
                                                    <select
                                                    className="js-select form-select form-select-borderless tom-select-custom-form-select-invite-user tom-select-form-select-ps-0"
                                                    autoComplete="off"
                                                    data-hs-tom-select-options='{
                                                        "searchInDropdown": false,
                                                        "hideSearch": true,
                                                        "dropdownWidth": "11rem"
                                                    }'
                                                    value={member.nivel_de_acesso}
                                                    onChange={(e) => handleAccessChange(member.id, e.target.value)}
                                                    >
                                                    <option value="Guest" selected={member.nivel_de_acesso === 'Guest'}>Convidado</option>
                                                    <option value="Administrator" selected={member.nivel_de_acesso === 'Administrator'}>Administrator</option>
                                                    <option value="remove" data-option-template='<div className="text-danger">Remover</div>'>Remover</option>
                                                    </select>
                                                </div>
                                                ) : (
                                                <span>{member.nivel_de_acesso}</span>
                                                )}
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </li>
                                    ))} */}
                            </ul>
                            {/* <label className="row form-check form-switch" htmlFor="addTeamPreferencesNewProjectSwitch1">
                                <span className="col-8 col-sm-9 ms-0">
                                    <i className="bi-bell text-primary me-2"></i>
                                    <span className="text-dark">Informar todos os membros do projeto</span>
                                </span>
                                <span className="col-4 col-sm-3 text-end">
                                    <input type="checkbox" className="form-check-input" id="addTeamPreferencesNewProjectSwitch1" defaultChecked />
                                </span>
                            </label> */}
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

