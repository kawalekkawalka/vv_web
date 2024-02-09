import {status} from "../utils";

export function sendFriendInvitation(data, token) {
    return fetch(`http://127.0.0.1:8000/api/user-friendship-invitations/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(data)
    }).then(status).catch(e => {
        console.log(e)
    })
}

// export function getFriendInvitations(params){
//     const queryString = Object.keys(params)
//         .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
//         .join('&');
//     return fetch(`http://127.0.0.1:8000/api/team-invitations/?${queryString}`)
//         .then(status).catch( e => {console.log(e)})
// }
//
// export function deleteFriendInvitation(id, token) {
//     return fetch(`http://127.0.0.1:8000/api/team-invitations/delete_invitation`, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Token ${token}`
//         },
//         body: JSON.stringify(id)
//     }).then(status).catch(e => {
//         console.log(e)
//     })
// }
