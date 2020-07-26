import React, { Component } from 'react';
import CheckoutSummary from 'components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
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
        return(
            <div>
                <CheckoutSummary 
                    onCheckoutContinue={this.onCheckoutContinueHandler}
                    onCheckoutCancel={this.onCheckoutCancelHandler}
                    ingredients={this.props.ingredients} />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData}
                    // render={() => 
                    //     <ContactData 
                    //         ingredients={this.props.ingredients} 
                    //         burgerPrice={this.props.burgerPrice} />} 
                />
            </div>
        )
    }
}

const mapStatetoProps = state => {
    return {
        ingredients: state.ingredients,
    }
}
//there is no dispatch action now

export default connect(mapStatetoProps,{})(Checkout);