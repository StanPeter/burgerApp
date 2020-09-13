import React, { Component } from 'react';
import classes from './Layout.module.css';
import Aux from 'hoc/Aux';
import { connect } from 'react-redux';

import Toolbar from 'components/Navigation/Toolbar/Toolbar';
import SideDrawer from 'components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        isSideDrawer: false
    }

    sideDrawerCloseHandler = () => {
        this.setState({isSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {isSideDrawer: !prevState.isSideDrawer};
        } );
    }

    render() {
        return (
            <Aux>
                <Toolbar 
                    isAuthenticated={this.props.isAuthenticated}
                    drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer
                    isAuthenticated={this.props.isAuthenticated}
                    close={this.sideDrawerCloseHandler}
                    open={this.state.isSideDrawer} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token != null
    };
};

export default connect(mapStateToProps, null)(Layout);