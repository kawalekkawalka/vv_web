import {status} from "../utils";

export function getUserFriends(params){
    const queryString = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
    return fetch(`http://127.0.0.1:8000/api/user-friendships/get_user_friends/?${queryString}`)
        .then(status).catch( e => {console.log(e)})
}

export function deleteFriend(data, token) {
    return fetch(`http://127.0.0.1:8000/api/user-friendships/delete_friend/`, {
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

export function addFriend(data, token) {
    return fetch(`http://127.0.0.1:8000/api/user-friendships/`, {
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