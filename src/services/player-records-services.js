import {status, API_URL} from "../utils";

export function getPlayerRecords(params){
    const queryString = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
    return fetch(`${API_URL}/api/player-records/?${queryString}`)
        .then(status).catch( e => {console.log(e)})
}