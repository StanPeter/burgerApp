import { put } from 'redux-saga/effects';
import * as actionTypes from "store/actions/actionTypes";

// * turns it into a generator
export function* authLogoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('userId');
    yield localStorage.removeItem('expirationTime');

    yield put({type: actionTypes.AUTH_LOGOUT});
}