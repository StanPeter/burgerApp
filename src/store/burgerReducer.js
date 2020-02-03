import * as actionTypes from "./action";

const initialState = {
    ingredient: null
};

const burgerReducer = (state = initialState, action) => {
    switch(action.type) {
        case (actionTypes.BREAD_BOTTOM):
            return {
                ingredient: "not done yet"
            };
        case (actionTypes.BREAD_TOP):
            return {
                ingredient: "not done yet"
            };
        case (actionTypes.CHEESE):
            return {
                ingredient: "not done yet"
            };
        case (actionTypes.MEAT):
            return {
                ingredient: "not done yet"
            };
        case (actionTypes.SALAD):
            return {
                ingredient: "not done yet"
            };
        case (actionTypes.BACON):
            return {
                ingredient: "not done yet"
            };
    }
    return state;
};


export default burgerReducer;
