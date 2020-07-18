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
                value: null
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: null
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code',
                },
                value: null
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: null
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-mail',
                },
                value: null
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: null
            },
        },
        formatedAddress: null,
        isLoading: false,
    }};

    componentDidMount() {
        //format address
        this.setState({formatedAddress: this.formatAddress(this.state.address)});
    }

    formatAddress(address) {
        return address.street + ', ' + address.city + ' ' + address.zipCode;
    }

    onOrderHandler = (event) => {
        this.setState({isLoading: true});
        const order = {
            ingredient: this.props.ingredients,
            price: this.props.burgerPrice,
            customer: {
                name: this.state.name,
                email: this.state.email,
                address: this.state.address
            }
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

    render() {
        return (
            <div className={classes.ContactData}>
                <h3>Enter your contact details</h3>
                {this.state.isLoading ? <Spinner /> : 
                <form onSubmit={() => console.log('submit')} >
                    <Input
                        inputtype='input'
                        name='name' 
                        type='text' 
                        placeholder='Name'
                        readOnly
                        defaultValue={this.state.name ? this.state.name : ''} />
                    <Input
                        inputtype='input'
                        name='email' 
                        type='email' 
                        placeholder='Email'
                        readOnly
                        defaultValue={this.state.email ? this.state.email : ''} />
                    <Input
                        inputtype='input'
                        name='address' 
                        type='text' 
                        placeholder='Address'
                        defaultValue={this.state.formatedAddress ? this.state.formatedAddress : ''} />
                    <Input
                        inputtype='input'
                        name='country' 
                        type='text' 
                        placeholder='Country'
                        defaultValue={this.state.address.country ? this.state.address.country : ''} />
                    <CustomButton 
                        btnType='Success' 
                        clicked={this.onOrderHandler}>Order</CustomButton>
                </form>}
            </div>
        )
    }
}

export default withRouter(ContactData);