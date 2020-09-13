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
                dispatch(authSuccess(response.data.localId, response.data.idToken));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(error => {
                alert(error);
                dispatch(authFail(error.response.data.error))
            });
        
    };
};
