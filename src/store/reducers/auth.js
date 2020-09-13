import * as actionTypes from "store/actions/actionTypes";

const initialState = {
    token: null,
    userId: null,
    error: null,
    isLoading: false
};

const authReducer = (state = initialState, action) => {
    const updatedState = {...state};

    switch(action.type) {
        case actionTypes.AUTH_START:
            updatedState.error = null;
            updatedState.isLoading = true;

            break;
        case actionTypes.AUTH_SUCCESS:
            updatedState.isLoading = false;
            updatedState.error = null;
            updatedState.userId = action.userId;
            updatedState.token = action.token;

            break;
        case actionTypes.AUTH_FAIL:
            updatedState.isLoading = false;
            updatedState.error = action.error;

            break;
        default:
            break;
    }

    return updatedState;
};

export default authReducer;