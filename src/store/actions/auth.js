import * as actionTypes from "store/actions/actionTypes";
import axios from 'axios';

export const authStart = () => {
    return ({
        type: actionTypes.FETCH_ORDERS_START
    });
};

export const authSuccess = () => {
    return ({
        type: actionTypes.FETCH_ORDERS_SUCCESS,
    });
};

export const authFail = (error) => {
    return ({
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    });
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
            .then(response => dispatch(authSuccess(response)))
            .catch(error => {
                alert(error);
                dispatch(authFail(error))
            });
        
    }
}