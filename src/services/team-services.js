import {status} from "../utils";

export function getTeam(id){
    return fetch(`http://127.0.0.1:8000/api/teams/${id}/`)
        .then(status).catch( e => {console.log(e)})
}

export function joinTeam(data, token){
    return fetch(`http://127.0.0.1:8000/api/members/join/`, {
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
    return fetch(`http://127.0.0.1:8000/api/members/leave/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(data)
    })
        .then(status).catch( e => {console.log(e)})
}