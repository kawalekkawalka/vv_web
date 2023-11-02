import {status} from "../utils";

export function sendTeamInvitation(data, token) {
    return fetch(`http://127.0.0.1:8000/api/team-invitations/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(data)
    }).then(status).catch(e => {
        console.log(e)
    })
}

export function getTeamInvitations(params){
    const queryString = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
    return fetch(`http://127.0.0.1:8000/api/team-invitations/?${queryString}`)
        .then(status).catch( e => {console.log(e)})
}

export function deleteTeamInvitation(id, token) {
    return fetch(`http://127.0.0.1:8000/api/team-invitations/delete_invitation`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(id)
    }).then(status).catch(e => {
        console.log(e)
    })
}
