const appKey = 'kid_rJBNXhp1f'
const appId = '0254e88aa104427a9d1c319e64e4722f'
const appUrl = 'https://baas.kinvey.com'


export function login(body) {
    return fetch(`${appUrl}/user/${appKey}/login`, {
        method: 'POST',
        headers: {
            Authorization: 'Basic ' + btoa(appKey + ":" + appId),
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
}

export function register(body) {
    return fetch(`${appUrl}/user/${appKey}/`, {
        method: 'POST',
        headers: {
            Authorization: 'Basic ' + btoa(appKey + ":" + appId),
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
}

export function loadChirpsFatch(token) {
    return fetch(`${appUrl}/appdata/${appKey}/chirps`, {
        method: 'GET',
        headers: {
            Authorization: 'Kinvey ' + token,
        },
    })
}

export function createChirpsFatch(body, token) {
    return fetch(`${appUrl}/appdata/${appKey}/chirps`, {
        method: 'POST',
        headers: {
            Authorization: 'Kinvey ' + token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
}

export function getAllUsers(token) {
    return fetch(`${appUrl}/user/${appKey}`, {
        method: 'GET',
        headers: {
            Authorization: 'Kinvey ' + token,
        },
    })
}

export function getUser(id, token) {    
    return fetch(`${appUrl}/user/${appKey}/${id}`, {
        method: 'GET',
        headers: {
            Authorization: 'Kinvey ' + token,
        },
    })
}

export function getFollowers(username, token) {
    return fetch(`${appUrl}/user/${appKey}?query={"subscriptions":"${username}"}`, {
        method: 'GET',
        headers: {
            Authorization: 'Kinvey ' + token,
        },
    })
}
export function getFollowing(username, token) {
    return fetch(`${appUrl}/user/${appKey}?query={"username":"${username}"}`, {
        method: 'GET',
        headers: {
            Authorization: 'Kinvey ' + token,
        },
    })
}

export function followUserFatch(id, body, token) {
    console.log(id)
    let headers =  {
        "Authorization": 'Kinvey ' + token ,
        "Content-Type": "application/json"
    }
    return fetch(`${appUrl}/user/${appKey}/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(body)
    })
}
export function unfollowUserFatch(id, body, token) {
    
    return fetch(`${appUrl}/user/${appKey}/${id}`, {
        method: 'PUT',
        headers: {
            Authorization: 'Kinvey ' + token,
            "Content-Type": "application/json"          
        },
        body: JSON.stringify(body)
    })
}

export function deleteChirp(id, token) {
    
    return fetch(`${appUrl}/appdata/${appKey}/chirps/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: 'Kinvey ' + token,   
        },
    })
}