import {$authHost, $host} from "./index";

export const profile = async () => {
    const {data} = await $authHost.get('api/user/profile')
    return data
}

export const team = async (teamId) => {
    const {data} = await $authHost.get(`api/team/view-teams/${(teamId)}`)
    return data
}

export const activity = async () => {
    const {data} = await $host.get('api/activity')
    return data
}

export const resources = async () => {
    const {data} = await $host.get('api/files')
    return data
}

export const tool = async () => {
    const {data} = await $host.get('api/view-tools')
    return data
}

export const addTool = async (formData) => {
    const {data} = await $host.post('api/add-tool', formData)
    return data
}

export const sendInvite = async (teamId, inviteFormData) => {
    const { data } = await $host.post(`api/add-member-to-team/${teamId}`, inviteFormData);
    return data;
};

export const joinTeam = async (teamId, userId) => {
    const { data } = await $authHost.post(`api/join-team`, { teamId, userId });
    return data;
};

export const updateTeamActivityText = async (idActivityTeam, editedText) => {
    const { data } = await $host.post(`api/update-activity-team`, { idActivityTeam, editedText });
    return data;
};

export const fetchDevices = async (typeId, brandId, page, limit= 5) => {
    const {data} = await $host.get('api/device', {params: {
            typeId, brandId, page, limit
        }})
    return data
}

export const fetchOneDevice = async (id) => {
    const {data} = await $host.get('api/device/' + id)
    return data
}
