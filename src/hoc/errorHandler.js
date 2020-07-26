import React, { Component } from 'react';

import Modal from 'components/UI/Modal/Modal';
import Aux from 'hoc/Aux';

const errorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {error: null};
        reqInterceptor = axios.interceptors.request.use(
            req => {
                this.setState({error: null});
                return req;
            }
        );
        resInterceptor = axios.interceptors.response.use(
            res => res,
            error => this.setState({error})
        );
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
        errorCloseHandler = () => this.setState({error: null});

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error} hide={this.errorCloseHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}

export default errorHandler;

// return (props) => {
