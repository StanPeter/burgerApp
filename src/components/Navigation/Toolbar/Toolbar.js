import React from "react";
import Logo from "../../Logo/Logo";
import "./Toolbar.css";
import NavigationItems from "../NavigationItems";


const Toolbar = (props) => (
    <header className="Toolbar">
        <div>Menu</div>
        <Logo height="80%" />
        <nav>
            <NavigationItems />
        </nav>
    </header>
);


export default Toolbar;



