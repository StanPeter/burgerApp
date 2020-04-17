import React from "react";

import classes from "./Burger.module.css";
import Burgeringredient from "./Burgeringredient/Burgeringredient";

const Burger = (props) => {
    
    let transformedIngredients = Object.keys(props.ingredients)
    .map(ingredient => {
        return [...Array(props.ingredients[ingredient])].map((_, index) => (
            <Burgeringredient key={ingredient + index} type={ingredient} />
        ));
    }).reduce((arr, el) => {
        console.log(arr);
        console.log(el);
        return arr.concat(el)
    }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please add some ingredients</p>;
    } 

    return (
        <div className={classes.Burger}>
            <Burgeringredient type="bread-top" />
            {transformedIngredients}
            <Burgeringredient type="bread-bottom" />
        </div>
    )
}

export default Burger;