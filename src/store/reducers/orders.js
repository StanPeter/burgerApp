import * as actionTypes from "store/actions/actionTypes";

const initialState = {
    orders: [],
    isLoading: false
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.id
            };

            return {
                ...state,
                isLoading: false,
                orders: state.orders.concat(newOrder)

            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                isLoading: false
            };
        default:
            console.log('unsuported action');
            break;
    }
};
