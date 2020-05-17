import React from "react";
import "./Navigation.css";

import NavigationItem from "./NavigationItem/NavigationItem";

const Navigation = (props) => (
    <ul className="Navigation">
        <NavigationItem link="/" active>Burger Builder</NavigationItem>
        <NavigationItem link="/">Checkout</NavigationItem>
    </ul>
);

export default Navigation;