import React, { Component } from "react";

import Aux from "../../../hoc/Aux";
import CustomButton from "../../UI/Button/CustomButton";

class OrderSummary extends Component {
    componentDidUpdate() {
        console.log('componentWillUpdate');
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: "capitalize"}}>{igKey}</span>: {this.props.ingredients[igKey]}
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
                <p><strong>Total price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <CustomButton btnType="Danger" clicked={this.props.orderCancel}>Cancel</CustomButton>
                <CustomButton btnType="Success" clicked={this.props.orderContinue}>Continue</CustomButton>
            </Aux>
        )
    }
}
    
export default OrderSummary;