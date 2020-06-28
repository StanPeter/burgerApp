import React, { Component } from "react";

import Aux from "../../hoc/Aux";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
    state = {
        isShownSideDrawer: false
    }

    sideDrawerCloseHandler = () => {
        this.setState({isShownSideDrawer: true});
    }

    render() {
        return (
            <Aux>
                <Toolbar />
                <SideDrawer 
                    close={this.sideDrawerCloseHandler}
                    open={this.state.isShownSideDrawer} />
                <div style={{marginTop: "7rem"}}>Toolbar, SideDrawer, Backdrop</div>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
} 

export default Layout;