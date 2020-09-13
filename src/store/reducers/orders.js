import * as actionTypes from "store/actions/actionTypes";

const initialState = {
    orders: [],
    isLoading: false,
    purchased: false
};

const orders = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_INIT:
            return {
                ...state,
                purchased: false
            }
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.id,
            };

            return {
                ...state,
                isLoading: false,
                orders: state.orders.concat(newOrder),
                purchased: true
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                isLoading: false
            };
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                isLoading: false
            }
        case actionTypes.FETCH_ORDERS_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                isLoading: true
            }
        default:
            return state;
    }
};

export default orders;
