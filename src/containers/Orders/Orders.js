import React, { Component } from 'react';
import classes from './Orders.module.css';
import * as actions from "store/actions/index";
import { connect } from 'react-redux';
import axios from 'api/orders';
import errorHandler from 'hoc/errorHandler';
import Order from 'components/Order/Order';
import Spinner from 'components/UI/Spinner/Spinner';

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders(this.props.token);
    }

    render() {
        // if(this.state.isError) return <p>Unfortunately the app stopped working</p>;

        return (
            <div className={classes.Orders}>
                {this.props.orders && !this.props.isLoading ? this.props.orders.map((order, i) => (
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

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        isLoading: state.order.isLoading,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (errorHandler(Orders, axios));