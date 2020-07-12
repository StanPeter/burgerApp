import React, { Component } from 'react';
import classes from './Orders.module.css';

import axios from 'api/orders';
import errorHandler from 'hoc/errorHandler';
import Order from 'components/Order/Order';
import Spinner from 'components/UI/Spinner/Spinner';

class Orders extends Component {
    state = {
        orders: [],
        isLoading: true,
        isError: false,
    }

    componentDidMount() {
        axios.get('https://tastyburgs.firebaseio.com/orders')
            .then(res => {
                const fetchedOrders = [];
                for(let key in res.data) fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });

                this.setState({orders: fetchedOrders, isLoading: false});
            })
            .catch(err => this.setState({isLoading: false, isError: true}));
    }

    render() {
        if(this.state.isError) return <p>Unfortunately the app stopped working</p>;

        return (
            <div className={classes.Orders}>
                {this.state.orders && !this.state.isLoading ? this.state.orders.map((order, i) => (
                    <Order 
                        customer={order.customer} 
                        ingredients={order.ingredient}
                        price={order.price}
                        orderNumber={i}
                        orderId={order.id}
                        key={'order' + order.id} />
                )) : <Spinner />}
            </div>
        )
    }
}

export default errorHandler(Orders, axios);