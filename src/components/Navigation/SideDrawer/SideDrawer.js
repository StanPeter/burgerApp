import React from "react";
import "./SideDrawer.css";

import Logo from "../../Logo/Logo";
import Navigation from "../Navigation";

const SideDrawer = (props) => {

    return (
        <div className="SideDrawer">
            <Logo />
            <nav>
                <Navigation />
            </nav>
        </div>
    );
};

export default SideDrawer;
