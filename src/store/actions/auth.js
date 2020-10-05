import axios from "axios";
import {AUTH_LOGOUT, AUTH_SUCCESS} from "./types";

export default function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email,
            password,
            returnSecureToken: true
        }

        const requestLink = isLogin
            ? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDSpnTsz-IpMAtcQ1bxEilHG9SbFnC8QQ8'
            : 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDSpnTsz-IpMAtcQ1bxEilHG9SbFnC8QQ8'

        const response = await axios.post(requestLink,authData)
        const data = response.data

        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

        localStorage.setItem('token', data.idToken)
        localStorage.setItem('userId', data.localId)
        localStorage.setItem('expirationDate', expirationDate)

        dispatch(authSuccess(data.idToken))
        dispatch(authLoggout(data.expiresIn))

    }
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}

export function authLoggout(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    }
}

export function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')

    return {
        type: AUTH_LOGOUT
    }
}
