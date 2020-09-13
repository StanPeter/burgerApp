import React, { Component } from 'react';
import CheckoutSummary from 'components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    // state = {
    //     ingredients: null,
    //     burgerPrice: 0,
    // }

    componentWillMount() {
        //passing data from query to state
        // const query = new URLSearchParams(this.props.location.search);
        // const ingredients = {};
        // let burgerPrice = 0;

        // query.forEach((index, ingredient) => {
        //     if(ingredient === 'price') burgerPrice = Number(index);
        //     else ingredients[ingredient] = Number(index);
        // });
        // this.setState({ingredients: ingredients, burgerPrice: burgerPrice});
    }

    onCheckoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    onCheckoutCancelHandler = () => {
        this.props.history.goBack();
    }

    render() {
        let summary = <Redirect to='/' />

        if(this.props.ingredients && !this.props.purchased ) {
            summary = (
                <div>
                    <CheckoutSummary 
                        onCheckoutContinue={this.onCheckoutContinueHandler}
                        onCheckoutCancel={this.onCheckoutCancelHandler}
                        ingredients={this.props.ingredients} />
                    <Route 
                        path={this.props.match.path + '/contact-data'} 
                        component={ContactData}
                    />
                </div>
            )
        }
        return summary;
    }
}

const mapStatetoProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStatetoProps, {})(Checkout);