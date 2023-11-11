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
