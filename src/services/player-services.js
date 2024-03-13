import {status, API_URL} from "../utils";

export function getPlayer(id){
    return fetch(`${API_URL}/api/players/${id}/`)
        .then(status).catch( e => {console.log(e)})
}

export function getPlayers(params){
    const queryString = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
    return fetch(`${API_URL}/api/players/?${queryString}`)
        .then(status).catch( e => {console.log(e)})
}

export function updatePlayer(data, id, token){
    return fetch(`${API_URL}/api/players/${id}/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(data)
    }).then(status).catch( e => {console.log(e)})
}

export function getPlayerByName(params){
    const queryString = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
    return fetch(`${API_URL}/api/players/get_player_by_name/?${queryString}`)
        .then(status).catch( e => {console.log(e)})
}