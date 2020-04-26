import React, { Component } from "react";

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENTS_PRICES = {
    salad: 0.2,
    bacon: 0.4,
    cheese: 0.6,
    meat: 0.9
}

class BurgetBuilder extends Component {
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         //set that initial state
    //     };

    //     //our event handlers
    //     this.onCLick = this.onCLick.bind(this);
    //     this.onKeyUp = this.onKeyUp.bind(this);
    // }

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        burgerPrice: 1.4,
        isPurchasable: false, //can we purchase the burger(any ingredients?)
        isPurchasing: false //after clicking on Order (pop out Modal)
    };

    addIngredientHandler = (type) => {
        const updatedCount = this.state.ingredients[type] + 1;
        const updatedIngredient = {...this.state.ingredients};
        updatedIngredient[type] = updatedCount;

        const updatedBurgerPrice = this.state.burgerPrice + INGREDIENTS_PRICES[type];

        this.setState({ingredients: updatedIngredient, burgerPrice: updatedBurgerPrice});
        this.isPurchasableHandler(updatedIngredient);
    } 

    removeIngredientHandler = (type) => {
        if(this.state.ingredients[type] - 1 >= 0){
            const updatedCount = this.state.ingredients[type] - 1;
            const updatedIngredient = {...this.state.ingredients};
            updatedIngredient[type] = updatedCount;

            const updatedBurgerPrice = this.state.burgerPrice - INGREDIENTS_PRICES[type];

            this.setState({ingredients: updatedIngredient, burgerPrice: updatedBurgerPrice});
            this.isPurchasableHandler(updatedIngredient);
        } else {
            console.log("Amount of " + type.toUpperCase() + " ingredient cannot be less than 0!");
        }
    }

    isPurchasableHandler = (ingredients) => {
        const numOfIngredients = Object.keys(ingredients)
        .map(ingredient => ingredients[ingredient])
        .reduce((num, el) => num + el ,0);
        
        this.setState({isPurchasable: numOfIngredients > 0});
    }

    purchasingHandler = () => {
        console.log("cloicked");
        this.setState({isPurchasing: true});
        console.log(this.state.isPurchasing);
    }

    cancelPurchasingHandler = () => {
        this.setState({isPurchasing: false});
    }

    continuePurchasingHandler = () => {
        alert("continue");
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
                <Modal show={this.state.isPurchasing} hide={this.cancelPurchasingHandler}>
                    <OrderSummary 
                        orderCancel={this.cancelPurchasingHandler}
                        orderContinue={this.continuePurchasingHandler}
                        ingredients={this.state.ingredients}  
                        price={this.state.burgerPrice}/>
                </Modal>
                <Burger 
                    ingredients={this.state.ingredients} />
                <BuildControls 
                    addIngredient={this.addIngredientHandler} 
                    removeIngredient={this.removeIngredientHandler}
                    burgerPrice={this.state.burgerPrice}
                    disabledInfo={disabledInfo}
                    purchasableInfo={this.state.isPurchasable}
                    purchasing={this.purchasingHandler}
                />
            </Aux>
        );
    }
}

export default BurgetBuilder;