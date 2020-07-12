import React, { Component } from 'react';
import classes from './Layout.module.css';
import Aux from 'hoc/Aux';

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
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer 
                    close={this.sideDrawerCloseHandler}
                    open={this.state.isSideDrawer} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
} 

export default Layout;