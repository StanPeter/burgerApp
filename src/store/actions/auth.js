import * as actionTypes from "store/actions/actionTypes";
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (userId, token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: userId,
        token: token
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expirationTime * 1000)
    };
};

export const authSetRedirectPath = (path) => {
    return {
        type: actionTypes.AUTH_SET_REDIRECT_PATH,
        path: path
    };
};

export const auth = (email, password, isSignUpMode) => {
    return dispatch => {

        dispatch(authStart());

        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBN8Nq578lzjwASgtYXtL9A1z2PrEy0xOg';
        if(isSignUpMode) url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBN8Nq578lzjwASgtYXtL9A1z2PrEy0xOg';

        axios.post(url, authData)
            .then(response => {
                const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);

                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationTime', expirationTime);
                localStorage.setItem('userId', response.data.userId);

                dispatch(authSuccess(response.data.localId, response.data.idToken));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(error => {
                alert(error);
                dispatch(authFail(error.response.data.error))
            });
        
    };
};

export const authCheckLoggedIn = () => {
    return dispatch => {
        const token = localStorage.getItem('token');

        if(!token) dispatch(authLogout());
        else {
            const expirationTime = new Date(localStorage.getItem('expirationTime'));
            const userId = localStorage.getItem('userId');

            if(new Date().getTime() <= expirationTime.getTime()) {
                dispatch(authSuccess(userId, token));
                dispatch(checkAuthTimeout((expirationTime.getTime() - new Date().getTime()) / 1000));
            } else dispatch(authLogout());
        }
    };
};
