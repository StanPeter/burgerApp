import React from "react";

import Aux from "../../../hoc/Aux";
import CustomButton from "../../UI/Button/CustomButton";

const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
        return (
            <li key={igKey}>
                <span style={{textTransform: "capitalize"}}>{igKey}</span>: {props.ingredients[igKey]}
            </li>
        );
    });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A burger with following ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <CustomButton btnType="Danger" clicked={props.orderCancel}>Cancel</CustomButton>
            <CustomButton btnType="Success" clicked={props.orderContinue}>Continue</CustomButton>
        </Aux>
    )
};

export default OrderSummary;