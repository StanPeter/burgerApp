import * as actionTypes from 'store/actions/actionTypes';
import axios from 'api/orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return ({
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        id: id,
        orderData: orderData
    });
};

export const purchaseBurgerFail = error => {
    return ({
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error 
    });
};

export const purchaseBurgerStart = () => {
    return ({
        type: actionTypes.PURCHASE_BURGER_START,
    });
};

export const purchaseBurger = (orderData) => {
    return dispatch => {
        axios.post('/orders.json', orderData)
        .then(res => dispatch(purchaseBurgerSuccess(res.id, orderData)))
        .catch(err => dispatch(purchaseBurgerFail(err)));
    };
};

