import {status, API_URL} from "../utils";

export function sendFriendInvitation(data, token) {
    return fetch(`${API_URL}/api/user-friendship-invitations/`, {
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

export function getUserFriendsInvitations(params){
    const queryString = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
    return fetch(`${API_URL}/api/user-friendship-invitations/get_user_friends_invitations/?${queryString}`)
        .then(status).catch( e => {console.log(e)})
}

export function deleteFriendInvitation(data, token) {
    return fetch(`${API_URL}/api/user-friendship-invitations/delete_invitation/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(data)
    }).then(status).catch(e => {
        console.log(e)
    })
}
