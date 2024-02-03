import {status} from "../utils";

export function getPlayerRecords(params){
    const queryString = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
    return fetch(`http://127.0.0.1:8000/api/player-records/?${queryString}`)
        .then(status).catch( e => {console.log(e)})
}