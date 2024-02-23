import {status, API_URL} from "../utils";

export function auth(credentials){
    return fetch(`${API_URL}/api/authenticate/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(status).catch( e => {console.log(e)})
}

export function changePassword(userData, userId, token){
    return fetch(`${API_URL}/api/users/${userId}/change_pass/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(userData)
    }).then(status).catch( e => {console.log(e)})
}

export function register(userData){
    return fetch(`${API_URL}/api/users/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    }).then(status).catch( e => {console.log(e)})
}

export function uploadAvatar(playerId, data, token){
    return fetch(`${API_URL}/api/players/${playerId}/`, {
        method: 'PUT',
        headers: {
            'Authorization': `Token ${token}`
        },
        body: data
    }).then(status).catch( e => {console.log(e)})
}
