import React from 'react';
import classes from './Order.module.css';

const Order = (props) => {
    console.log(props, 'props');

    //also gets props.customer
    const getIngredients = [];
    for(let ingredient in props.ingredients) {
        getIngredients.push({
            name: ingredient,
            amount: props.ingredients[ingredient]
        });
    }

    const styles = {
        padding: '5px', 
        border: '1px solid #ccc', 
        display: 'inline-block',
        textTransform: 'capitalize',
        margin: '0 8px'
    };

    const convertedIngredients = getIngredients.map(ing => 
        <span style={styles} key={ing.name}>
            {ing.name} ({ing.amount})
        </span>
    );

    return (
        <div className={classes.Order}>
            <h2>Order {props.orderNumber + 1}:</h2>
            <p>{convertedIngredients}</p>
            <p>Price <strong>{props.price.toFixed(2)}</strong></p>
        </div>
    )
};

export default Order;