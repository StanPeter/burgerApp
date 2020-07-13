import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import classes from './ContactData.module.css';
import CustomButton from 'components/UI/Button/CustomButton';
import axios from 'api/orders';
import Spinner from 'components/UI/Spinner/Spinner' ;

class ContactData extends Component {
    state = {
        name: 'Peter Johnson',
        email: 'PeterJohnson@gmail.com',
        address: {
            street: 'Köln Straße 5',
            city: 'Cologne',
            zipCode: '542 25',
            country: 'Germany'
        },
        formatedAddress: null,
        isLoading: false,
    }

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
                    <input className={classes.Input}
                        name='name' 
                        type='text' 
                        placeholder='Name'
                        readOnly
                        defaultValue={this.state.name ? this.state.name : ''} />
                    <input className={classes.Input}
                        name='email' 
                        type='email' 
                        placeholder='Email'
                        readOnly
                        defaultValue={this.state.email ? this.state.email : ''} />
                    <input className={classes.Input}
                        name='address' 
                        type='text' 
                        placeholder='Address'
                        defaultValue={this.state.formatedAddress ? this.state.formatedAddress : ''} />
                    <input className={classes.Input}
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