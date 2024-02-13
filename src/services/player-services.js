import {status} from "../utils";

export function getPlayer(id){
    return fetch(`http://127.0.0.1:8000/api/players/${id}/`)
        .then(status).catch( e => {console.log(e)})
}

export function getPlayers(params){
    const queryString = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
    return fetch(`http://127.0.0.1:8000/api/players/?${queryString}`)
        .then(status).catch( e => {console.log(e)})
}

export function updatePlayer(data, id, token){
    return fetch(`http://localhost:8000/api/players/${id}/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(data)
    }).then(status).catch( e => {console.log(e)})
}