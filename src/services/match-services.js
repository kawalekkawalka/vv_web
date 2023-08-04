import {status} from "../utils";

export function getTeamMatches(id){
    return fetch(`http://127.0.0.1:8000/api/matches/${id}/`)
        .then(status).catch( e => {console.log(e)})
}