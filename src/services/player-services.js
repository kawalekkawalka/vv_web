import {status} from "../utils";

export function getPlayer(id){
    return fetch(`http://127.0.0.1:8000/api/players/${id}/`)
        .then(status).catch( e => {console.log(e)})
}
