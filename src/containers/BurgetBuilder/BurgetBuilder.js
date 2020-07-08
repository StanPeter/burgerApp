import React, { Component } from "react";
import PropTypes from "prop-types";

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../api/orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import errorHandler from "../../hoc/errorHandler";

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
        burgerPrice: 1.4,
        isPurchasable: false, //can we purchase the burger(any ingredients?)
        isPurchasing: false, //after clicking on Order (pop out Modal)
        isLoading: false,
    };

    componentDidMount() {
        axios.get('https://tastyburgs.firebaseio.com/ingredients.json')
            .then(res => this.setState({ingredients: res.data}))
            .catch(err => {                
                console.log(err, 'err');
            });
    }

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
        this.setState({isPurchasing: true});
        console.log(this.state.isPurchasing);
    }

    cancelPurchasingHandler = () => {
        this.setState({isPurchasing: false});
    }

    continuePurchasingHandler = () => {
        this.setState({isLoading: true});
        const order = {
            ingredient: this.state.ingredients,
            price: this.state.burgerPrice,
            customer: {
                name: 'stan',
                phone: '23662'
            }
        };

        axios.post('/orders.json', order)
            .then(res => this.setState({isLoading: false, isPurchasing: false}))
            .catch(err => {
                this.setState({isLoading: false, isPurchasing: false});
                console.log(err, 'err');
            });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let ingredient in disabledInfo) {
            disabledInfo[ingredient] = disabledInfo[ingredient] <= 0
        }

        const orderSummary = !this.state.isLoading && this.state.ingredients ? 
            <OrderSummary 
                orderCancel={this.cancelPurchasingHandler}
                orderContinue={this.continuePurchasingHandler}
                ingredients={this.state.ingredients}  
                price={this.state.burgerPrice}/> : <Spinner />

        return (
            <Aux> 
                <Modal show={this.state.isPurchasing} hide={this.cancelPurchasingHandler}>
                    {orderSummary}
                </Modal>
                {!this.state.ingredients ? <Spinner /> : 
                (
                    <Aux>
                        <Burger 
                            ingredients={this.state.ingredients} />
                        <BuildControls 
                            addIngredient={this.addIngredientHandler} 
                            removeIngredient={this.removeIngredientHandler}
                            burgerPrice={this.state.burgerPrice}
                            disabledInfo={disabledInfo}
                            purchasableInfo={this.state.isPurchasable}
                            purchasing={this.purchasingHandler} />
                    </Aux> 
                )}
            </Aux>
        );
    }
}

export default errorHandler(BurgetBuilder, axios);