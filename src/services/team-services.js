import {status, API_URL} from "../utils";

export function getTeams(params){
    const queryString = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
    return fetch(`${API_URL}/api/teams/?${queryString}`)
        .then(status).catch( e => {console.log(e)})
}

export function getTeam(id){
    return fetch(`${API_URL}/api/teams/${id}/`)
        .then(status).catch( e => {console.log(e)})
}

export function joinTeam(data, token){
    return fetch(`${API_URL}/api/members/join/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(data)
    })
        .then(status).catch( e => {console.log(e)})
}

export function leaveTeam(data, token){
    return fetch(`${API_URL}/api/members/leave/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(data)
    })
        .then(status).catch( e => {console.log(e)})
}

export function createTeam(data, token){
    return fetch(`${API_URL}/api/teams/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(data)
    })
        .then(status).catch( e => {console.log(e)})
}

export function deleteTeam(id, token){
    return fetch(`${API_URL}/api/teams/${id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
    })
        .then(status).catch( e => {console.log(e)})
}

export function getTeamsNames(params){
    const queryString = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
    return fetch(`${API_URL}/api/teams/get_teams_names/?${queryString}`)
        .then(status).catch( e => {console.log(e)})
}

export function getTeamByName(params){
    const queryString = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
    return fetch(`${API_URL}/api/teams/get_team_by_name/?${queryString}`)
        .then(status).catch( e => {console.log(e)})
}