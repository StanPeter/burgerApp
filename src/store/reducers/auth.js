import { connect } from "react-redux";
import * as actionTypes from "store/actions/actionTypes";

const initialState = {
    password: false
};

const auth = (state = initialState, action) => {
    const updatedState = {...state};

    switch(action.type) {
        case actionTypes.AUTH_START:

            console.log('launched');
            break;
        case actionTypes.AUTH_SUCCESS:
            break;
        case actionTypes.AUTH_FAIL:
            break;
        default:
            break;
    }

    return updatedState;
}

export default auth;