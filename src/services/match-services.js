import {status, API_URL} from "../utils";

export function getMatches(params){
    const queryString = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
    return fetch(`${API_URL}/api/matches/?${queryString}`)
        .then(status).catch( e => {console.log(e)})
}

export function getMatch(id){
    return fetch(`${API_URL}/api/matches/${id}/`)
        .then(status).catch( e => {console.log(e)})
}

export function updateMatch(data, token, id){
    return fetch(`${API_URL}/api/matches/${id}/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(data)
    })
        .then(status).catch( e => {console.log(e)})
}

export function getMatchParticipants(params){
    const queryString = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
    return fetch(`${API_URL}/api/matches/get_match_participants/?${queryString}`)
        .then(status).catch( e => {console.log(e)})
}

export function createMatch(data, token){
    return fetch(`${API_URL}/api/matches/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(data)
    })
        .then(status).catch( e => {console.log(e)})
}

export function deleteMatch(id, token){
    return fetch(`${API_URL}/api/matches/${id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
    })
        .then(status).catch( e => {console.log(e)})
}

export function getUserFriendsMatches(params){
    const queryString = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
    return fetch(`${API_URL}/api/matches/get_user_friends_matches/?${queryString}`)
        .then(status).catch( e => {console.log(e)})
}