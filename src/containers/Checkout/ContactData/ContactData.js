import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import classes from './ContactData.module.css';
import CustomButton from 'components/UI/Button/CustomButton';
import axios from 'api/orders';
import Spinner from 'components/UI/Spinner/Spinner' ;
import Input from 'components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false,
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-mail',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'fastest',
                valid: true
            },
        },
        isLoading: false,
        isFormValid: false,
    };

    componentDidMount() {
    }

    onOrderHandler = (event) => {
        this.setState({isLoading: true});
        
        const formData = {};
        for(let i in this.state.orderForm) formData[i] = this.state.orderForm[i].value;

        const order = {
            ingredient: this.props.ingredients,
            price: this.props.burgerPrice,
            orderData: formData
        };

        axios.post('/orders.json', order)
            .then(res => {
                this.setState({isLoading: false});
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({isLoading: false});
                console.log(err, 'err');
            });

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
                {this.state.isLoading ? <Spinner /> : 
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

export default withRouter(ContactData);