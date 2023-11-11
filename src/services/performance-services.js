import {status} from "../utils";

export function getPerformances(params){
    const queryString = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
    return fetch(`http://127.0.0.1:8000/api/match-performances/?${queryString}`)
        .then(status).catch( e => {console.log(e)})
}

