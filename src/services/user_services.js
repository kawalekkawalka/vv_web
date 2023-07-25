export function auth(credentials){
    return fetch('http://localhost:8000/api/authenticate/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(resp => resp.json())
        .catch( e => {
            console.log(e);
        })
}

export function changePassword(userData, userId){
    return fetch(`http://localhost:8000/api/users/${userId}/change_pass/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    }).then(resp => resp.json())
        .catch( e => {
            console.log(e);
        })
}

export function register(userData){
    return fetch('http://localhost:8000/api/users/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    }).then(resp => resp.json())
        .catch( e => {
            console.log(e);
        })
}

export function uploadAvatar(playerId, data){
    return fetch(`http://localhost:8000/api/players/${playerId}/`, {
        method: 'PUT',
        body: data
    }).then(resp => resp.json())
        .catch( e => {
            console.log(e);
        })
}