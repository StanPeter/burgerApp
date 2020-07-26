import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import * as actionTypes from "store/action";
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
            isLoading: false,
            isError: false,
        };

        //our event handlers
        // this.onCLick = this.onCLick.bind(this);
        // this.onKeyUp = this.onKeyUp.bind(this);
    }

    componentDidMount() {
        // axios.get('https://tastyburgs.firebaseio.com/ingredients.json')
        //     .then(res => this.setState({ingredients: res.data}))
        //     .catch(err => {                
        //         console.log(err, 'err');
        //         this.setState({isError: true});
        //     });
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

        const orderSummary = !this.state.isLoading && this.props.ingredients ? 
            <OrderSummary 
                orderCancel={this.cancelPurchasingHandler}
                orderContinue={this.continuePurchasingHandler}
                ingredients={this.props.ingredients}  
                price={this.props.burgerPrice}/> : <Spinner />
   
        if(this.state.isError) return <p>Unfortunately the app stopped working</p>;

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
                            addIngredient={this.props.onIngredientAdded} 
                            removeIngredient={this.props.onIngredientRemoved}
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
        ingredients: state.ingredients,
        burgerPrice: state.burgerPrice
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: ingName => dispatch({
            type: actionTypes.ADD_INGREDIENT,
            ingredientName: ingName
        }),
        onIngredientRemoved: ingName => dispatch({
            type: actionTypes.REMOVE_INGREDIENT,
            ingredientName: ingName,
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(BurgetBuilder, axios));