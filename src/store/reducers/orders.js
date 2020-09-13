import * as actionTypes from "store/actions/actionTypes";

const initialState = {
    orders: [],
    isLoading: false,
    purchased: false
};

const orderReducer = (state = initialState, action) => {
    const updatedState = {...state};

    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_INIT:
            updatedState.purchased = false;
            
            break;
        case actionTypes.PURCHASE_BURGER_START:
            updatedState.isLoading = true;

            break;
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.id,
            };

            updatedState.isLoading = false;
            updatedState.orders = state.orders.concat(newOrder);
            updatedState.purchased = true;
            
            break;
        case actionTypes.PURCHASE_BURGER_FAIL:
            updatedState.isLoading = false;

            break;
        case actionTypes.FETCH_ORDERS_SUCCESS:
            updatedState.isLoading = false;
            updatedState.orders = action.orders;
            
            break;
        case actionTypes.FETCH_ORDERS_FAIL:
            updatedState.isLoading = false;

            break;
        case actionTypes.FETCH_ORDERS_START:
            updatedState.isLoading = true;

            break;
        default:
            break;
    }

    return updatedState;
};

export default orderReducer;
