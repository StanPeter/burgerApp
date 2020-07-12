import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 1,
            meat: 1       
        }
    }

    componentDidMount() {
        //passing data from query to state
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};

        query.forEach((index, ingredient) => ingredients[ingredient] = Number(index));
        this.setState({ingredients: ingredients});
    }

    onCheckoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    onCheckoutCancelHandler = () => {
        this.props.history.goBack();
    }

    render() {
        return(
            <div>
                <CheckoutSummary 
                    onCheckoutContinue={this.onCheckoutContinueHandler}
                    onCheckoutCancel={this.onCheckoutCancelHandler}
                    ingredients={this.state.ingredients} />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData} />
            </div>
        )
    }
}

export default Checkout;