import React, { Component } from "react";

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENTS_PRICES = {
    salad: 0.2,
    bacon: 0.4,
    cheese: 0.6,
    meat: 0.9
}

class BurgetBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        burgerPrice: 1.4
    };

    addIngredientHandler = (type) => {
        const updatedCount = this.state.ingredients[type] + 1;
        const updatedIngredient = {...this.state.ingredients};
        updatedIngredient[type] = updatedCount;

        const updatedBurgerPrice = this.state.burgerPrice + INGREDIENTS_PRICES[type];

        this.setState({ingredients: updatedIngredient, burgerPrice: updatedBurgerPrice});
    } 

    removeIngredientHandler = (type) => {
        if(this.state.ingredients[type] - 1 >= 0){
            const updatedCount = this.state.ingredients[type] - 1;
            const updatedIngredient = {...this.state.ingredients};
            updatedIngredient[type] = updatedCount;

            const updatedBurgerPrice = this.state.burgerPrice - INGREDIENTS_PRICES[type];

            this.setState({ingredients: updatedIngredient, burgerPrice: updatedBurgerPrice});
        } else {
            console.log("Amount of " + type.toUpperCase() + " ingredient cannot be less than 0!");
        }
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let ingredient in disabledInfo) {
            disabledInfo[ingredient] = disabledInfo[ingredient] <= 0
        }

        return (
            <Aux>
                <Burger 
                    ingredients={this.state.ingredients} />
                <BuildControls 
                    addIngredient={this.addIngredientHandler} 
                    removeIngredient={this.removeIngredientHandler}
                    burgerPrice={this.state.burgerPrice}
                    disabledInfo={disabledInfo}
                />
            </Aux>
        );
    }
}

export default BurgetBuilder;