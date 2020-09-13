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

export const purchaseBurgerInit = () => {
    return ({
        type: actionTypes.PURCHASE_BURGER_INIT,
    });
};

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());

        axios.post('/orders.json?auth=' + token, orderData)
            .then(res => dispatch(purchaseBurgerSuccess(res.data.name, orderData)))
            .catch(err => dispatch(purchaseBurgerFail(err)));
    };
};

export const fetchOrdersStart = () => {
    return ({
        type: actionTypes.FETCH_ORDERS_START
    });
};

export const fetchOrdersSuccess = (orders) => {
    return ({
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    });
};

export const fetchOrdersFail = (error) => {
    return ({
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    });
};

export const fetchOrders = (token) => {
    return dispatch => {
        const url = `https://tastyburgs.firebaseio.com/orders.json?auth=${token}`;
        dispatch(fetchOrdersStart());
        
        axios.get(url)
            .then(response => {
                const orders = [];
                for(let key in response.data) orders.push({
                    ...response.data[key],
                    id: key
                });

                dispatch(fetchOrdersSuccess(orders))
            })
            .catch(error => dispatch(fetchOrdersFail(error)));
    }
}