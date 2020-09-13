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

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());

        axios.post('/orders.json', orderData)
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

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        
        axios.get('https://tastyburgs.firebaseio.com/orders.json')
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