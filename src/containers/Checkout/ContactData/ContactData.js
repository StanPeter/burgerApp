import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import classes from './ContactData.module.css';
import CustomButton from 'components/UI/Button/CustomButton';
import axios from 'api/orders';
import Spinner from 'components/UI/Spinner/Spinner' ;
import Input from 'components/UI/Input/Input';
import { connect } from 'react-redux';
import { orderForm as orderFormData } from 'store/contactData';
import errorHandler from 'hoc/errorHandler';
import * as actions from "store/actions/index";

class ContactData extends Component {
    state = {
        orderForm: orderFormData,
        isFormValid: false,
    };

    onOrderHandler = (event) => {
        const formData = {};
        for(let i in this.state.orderForm) formData[i] = this.state.orderForm[i].value;

        const order = {
            ingredient: this.props.ingredients,
            price: this.props.burgerPrice,
            orderData: formData
        };

        this.props.onPurchaseBurger(order);

        event.preventDefault();
    }

    inputChangeHandler = (event, elName) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedEl = updatedOrderForm[elName];

        updatedEl.value = event.target.value;
        updatedEl.valid = this.checkIfValid(updatedEl.value, updatedEl.validation);
        updatedEl.touched = true;
        updatedOrderForm[elName] = updatedEl;

        let isFormValid = true;
        for(let elName in updatedOrderForm) {
            isFormValid = updatedOrderForm[elName].valid && isFormValid;
        }
        this.setState({orderForm: updatedOrderForm, isFormValid: isFormValid});
    }

    checkIfValid(value, rules) {
        let isValid = true;
        if(rules?.required) isValid = value.trim() !== '' && isValid;
        if(rules?.minLength) isValid = value.length >= rules.minLength && isValid;
        if(rules?.maxLength) isValid = value.length <= rules.maxLength && isValid;

        return isValid
    }

    render() {
        const arrayOrderForm = [];
        for(let key in this.state.orderForm) {
            arrayOrderForm.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        return (
            <div className={classes.ContactData}>
                <h3>Enter your contact details</h3>
                {this.props.isLoading ? <Spinner /> : 
                <form onSubmit={this.onOrderHandler}>
                    {arrayOrderForm.map(orderEl => (
                        <Input 
                            elementType={orderEl.config.elementType}
                            elementConfig={orderEl.config.elementConfig}
                            value={orderEl.config.value}
                            key={orderEl.id}
                            invalid={!orderEl.config.valid}
                            shouldValidate={orderEl.config.validation}
                            touched={orderEl.config.touched}
                            onChange={(e) => this.inputChangeHandler(e, orderEl.id)} />
                    ))}
                    <CustomButton 
                        btnType='Success' 
                        disabled={!this.state.isFormValid}>Order</CustomButton>
                </form>}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        burgerPrice: state.burgerPrice,
        isLoading: state.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPurchaseBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(errorHandler(ContactData, axios)));