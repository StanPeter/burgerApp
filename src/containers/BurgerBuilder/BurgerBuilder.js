import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import * as actions from "store/actions/index";
import { connect } from "react-redux";
import Aux from 'hoc/Aux';
import Burger from 'components/Burger/Burger';
import BuildControls from 'components/Burger/BuildControls/BuildControls';
import Modal from 'components/UI/Modal/Modal';
import OrderSummary from 'components/Burger/OrderSummary/OrderSummary';
import axios from 'api/orders';
import Spinner from 'components/UI/Spinner/Spinner';
import errorHandler from 'hoc/errorHandler';

class BurgetBuilder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // isPurchasable: false, //can we purchase the burger(any ingredients?)
            isPurchasing: false, //after clicking on Order (pop out Modal)
        };

        //our event handlers
        // this.onCLick = this.onCLick.bind(this);
        // this.onKeyUp = this.onKeyUp.bind(this);
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    // addIngredientHandler = (type) => {
    //     const updatedCount = this.props.ingredients[type] + 1;
    //     const updatedIngredient = {...this.props.ingredients};
    //     updatedIngredient[type] = updatedCount;

    //     const updatedBurgerPrice = this.state.burgerPrice + INGREDIENTS_PRICES[type];

    //     this.setState({ingredients: updatedIngredient, burgerPrice: updatedBurgerPrice});
    //     this.isPurchasableHandler(updatedIngredient);
    // } 

    // removeIngredientHandler = (type) => {
    //     if(this.props.ingredients[type] - 1 >= 0){
    //         const updatedCount = this.props.ingredients[type] - 1;
    //         const updatedIngredient = {...this.props.ingredients};
    //         updatedIngredient[type] = updatedCount;

    //         const updatedBurgerPrice = this.state.burgerPrice - INGREDIENTS_PRICES[type];

    //         this.setState({ingredients: updatedIngredient, burgerPrice: updatedBurgerPrice});
    //         this.isPurchasableHandler(updatedIngredient);
    //     } else {
    //         console.log('Amount of ' + type.toUpperCase() + ' ingredient cannot be less than 0!');
    //     }
    // }

    isPurchasableHandler = (ingredients) => {
        const numOfIngredients = Object.keys(ingredients)
        .map(ingredient => ingredients[ingredient])
        .reduce((num, el) => num + el ,0);
        
        // this.setState({isPurchasable: numOfIngredients > 0});
        return numOfIngredients > 0;
    }

    purchasingHandler = () => {
        this.setState({isPurchasing: true});
    }

    cancelPurchasingHandler = () => {
        this.setState({isPurchasing: false});
    }

    continuePurchasingHandler = () => {
        this.props.onPurchaseBurgerInit();
        this.props.history.push('/checkout');
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: new URLSearchParams(this.props.ingredients).toString() + '&price=' + this.props.burgerPrice
        // });
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };
        for(let ingredient in disabledInfo) {
            disabledInfo[ingredient] = disabledInfo[ingredient] <= 0
        }

        const orderSummary = this.props.ingredients ? 
            <OrderSummary 
                orderCancel={this.cancelPurchasingHandler}
                orderContinue={this.continuePurchasingHandler}
                ingredients={this.props.ingredients}  
                price={this.props.burgerPrice}/> : <Spinner />
   
        if(this.props.error) return <p>Unfortunately the app stopped working</p>;

        return (
            <Aux> 
                <Modal show={this.state.isPurchasing} hide={this.cancelPurchasingHandler}>
                    {orderSummary}
                </Modal>
                {!this.props.ingredients ? <Spinner /> : 
                (
                    <Aux>
                        <Burger 
                            ingredients={this.props.ingredients} />
                        <BuildControls 
                            addIngredient={this.props.onAddIngredient} 
                            removeIngredient={this.props.onRemoveIngredient}
                            burgerPrice={this.props.burgerPrice}
                            disabledInfo={disabledInfo}
                            purchasableInfo={this.isPurchasableHandler(this.props.ingredients)}
                            purchasing={this.purchasingHandler} />
                    </Aux> 
                )}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        burgerPrice: state.burgerBuilder.burgerPrice,
        error: state.burgerBuilder.error,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: ingName => dispatch(actions.addIngredient(ingName)),
        onRemoveIngredient: ingName => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onPurchaseBurgerInit: () => dispatch(actions.purchaseBurgerInit())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(BurgetBuilder, axios));