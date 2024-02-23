import {status, API_URL} from "../utils";

export function sendComment(user, description, contentType, ObjectId, token) {
    return fetch(`${API_URL}/api/comments/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify({user, description, content_type: contentType, object_id: ObjectId})
    }).then(status).catch(e => {
        console.log(e)
    })
}

export function deleteComment(id, token) {
    return fetch(`${API_URL}/api/comments/delete_comment`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(id)
    }).then(status).catch(e => {
        console.log(e)
    })
}