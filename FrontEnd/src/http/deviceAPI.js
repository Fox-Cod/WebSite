import {$authHost, $host} from "./index";


// Profile
export const profile = async () => {
    const {data} = await $authHost.get('api/user/profile')
    return data
}

export const profileView = async (userId) => {
    const {data} = await $host.get(`api/user/profile-view/${(userId)}`)
    return data
}

export const profileUpdate = async (updatedFormData) => {
    const {data} = await $authHost.post(`api/user/update-profile`, updatedFormData)
    return data
}

// Team

export const team = async (teamId) => {
    const {data} = await $authHost.get(`api/team/view-teams/${(teamId)}`)
    return data
}

export const searchTeam = async () => {
    const {data} = await $host.get(`api/team/search-teams`)
    return data
}

export const addActivityToTeam = async (teamId, formData) => {
    const {data} = await $authHost.post(`api/team/add-activity-team/${(teamId)}`, formData)
    return data
}

export const createTeam = async (formData) => {
    const {data} = await $authHost.post(`api/team/create-team`, formData)
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

export const deleteActivityTeam = async (index, idActivityTeam) => {
    const {data} = await $host.post(`api/team/delete-activity-team`, { index, idActivityTeam })
    return data
}
export const privacy = async (teamId, newPrivacy) => {
    const {data} = await $host.put(`api/team/privacy/${(teamId)}`, { newPrivacy })
    return data
}

// Resources
export const resources = async () => {
    const {data} = await $host.get('api/files')
    return data
}

// Tool
export const tool = async () => {
    const {data} = await $host.get('api/view-tools')
    return data
}

export const addTool = async (formData) => {
    const {data} = await $host.post('api/add-tool', formData)
    return data
}

// Activity
export const activity = async () => {
    const {data} = await $host.get('api/activity')
    return data
}

export const activityView = async (activityId) => {
    const {data} = await $host.get(`api/view-activity/${(activityId)}`)
    return data
}

export const addActivity = async (formData) => {
    const {data} = await $authHost.post(`api/add-activity`, formData)
    return data
}

export const getComment = async (activityId) => {
    const {data} = await $authHost.get(`api/comments/${(activityId)}`)
    return data
}

export const addComment = async (activityId, content) => {
    const {data} = await $authHost.post(`api/add-comment/${(activityId)}`, { content })
    return data
}

export const editActivity = async (activityId, viewActivityUser) => {
    const {data} = await $authHost.post(`api/edit-activity/${activityId}`, viewActivityUser)
    return data
}

export const deleteActivity = async (activityId) => {
    const {data} = await $authHost.post(`api/delete-activity/${activityId}`)
    return data
}

// Other
export const getAllData = async () => {
    const {data} = await $host.get(`api/get-all-data`)
    return data
}

export const uploadResources = async (formData) => {
    const {data} = await $authHost.post(`api/upload`, formData)
    return data
}

// Reset Password
export const sendEmail = async (email) => {
    const {data} = await $host.post(`api/send-email`, {email})
    return data
}

export const tokenValidation = async (token) => {
    const {data} = await $host.get(`api/token-validation/${(token)}`)
    return data
}

export const resetPassword = async (token, password, confPassword) => {
    const {data} = await $host.post(`api/reset-password/${(token)}`, {password, confPassword})
    return data
}

//Admin Panel
export const adminUpdateProfile = async (currentEdit) => {
    const {data} = await $authHost.post(`api/admin-update-data-user/${(currentEdit.idTeacher)}`, currentEdit)
    return data
}

export const adminDelteProfile = async (idTeacher) => {
    const {data} = await $authHost.post(`api/admin-delete-data-user/${(idTeacher)}`)
    return data
}