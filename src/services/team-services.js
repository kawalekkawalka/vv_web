export function getTeam(id){
    return fetch(`http://127.0.0.1:8000/api/teams/${id}/`)
        .then(resp => resp.json())
        .catch( e => {
            console.log(e);
        })
}