import {status, API_URL} from "../utils";

export function getPerformances(params){
    const queryString = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
    return fetch(`${API_URL}/api/match-performances/?${queryString}`)
        .then(status).catch( e => {console.log(e)})
}

export function getAvgTeamPerformance(params){
    const queryString = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
    return fetch(`${API_URL}/api/match-performances/get_avg_team_performance/?${queryString}`)
        .then(status).catch( e => {console.log(e)})
}

export function getAvgPlayerPerformance(params){
    const queryString = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
    return fetch(`${API_URL}/api/match-performances/get_avg_player_performance/?${queryString}`)
        .then(status).catch( e => {console.log(e)})
}

export function sendPerformance(data, token) {
    return fetch(`${API_URL}/api/match-performances/`, {
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