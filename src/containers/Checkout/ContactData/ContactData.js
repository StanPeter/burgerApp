import React, { Component } from 'react';
import classes from './ContactData.module.css';
import CustomButton from '../../../components/UI/Button/CustomButton';

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
    }

    componentDidMount() {
        //format address
        this.setState({formatedAddress: this.formatAddress(this.state.address)});
    }

    formatAddress(address) {
        return address.street + ', ' + address.city + ' ' + address.zipCode;
    }

    render() {
        return (
            <div className={classes.ContactData}>
                <h3>Enter your contact details</h3>
                <form onSubmit={() => console.log('submit')}>
                    <input className={classes.Input}
                        name='name' 
                        type='text' 
                        placeholder='Name'
                        value={this.state.name} />
                    <input className={classes.Input}
                        name='email' 
                        type='email' 
                        placeholder='Email'
                        value={this.state.email} />
                    <input className={classes.Input}
                        name='address' 
                        type='text' 
                        placeholder='Address'
                        value={this.state.formatedAddress} />
                    <input className={classes.Input}
                        name='country' 
                        type='text' 
                        placeholder='Country'
                        value={this.state.address.country} />
                    <CustomButton type='success' onClick />
                </form>
            </div>
        )
    }
}

export default ContactData;