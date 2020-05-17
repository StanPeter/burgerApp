import React from "react";
import Logo from "../../Logo/Logo";
import "./Toolbar.css";
import Navigation from "../Navigation";


const Toolbar = (props) => (
    <header className="Toolbar">
        <div>Menu</div>
        <Logo />
        <nav>
            <Navigation />
        </nav>
    </header>
);


export default Toolbar;



