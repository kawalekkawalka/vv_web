import {status} from "../utils";

export function getMatches(params){
    const queryString = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
    return fetch(`http://127.0.0.1:8000/api/matches/?${queryString}`)
        .then(status).catch( e => {console.log(e)})
}

export function getMatch(id){
    return fetch(`http://127.0.0.1:8000/api/matches/${id}/`)
        .then(status).catch( e => {console.log(e)})
}

export function updateMatch(data, token, id){
    return fetch(`http://127.0.0.1:8000/api/matches/${id}/`, {
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
    return fetch(`http://127.0.0.1:8000/api/matches/get_match_participants/?${queryString}`)
        .then(status).catch( e => {console.log(e)})
}

export function createMatch(data, token){
    return fetch(`http://127.0.0.1:8000/api/matches/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(data)
    })
        .then(status).catch( e => {console.log(e)})
}