import React from 'react';
import classes from './Order.module.css';

const Order = (props) => {
    console.log(props, 'props');

    //also gets props.customer
    return (
        <div className={classes.Order}>
            <h2>Order {props.orderNumber + 1}:</h2>
            {/* {getIngredients} */}
            <p>Price <strong>{props.price.toFixed(2)}</strong></p>
        </div>
    )
};

export default Order;