import React from "react";

import burgerLogo from "../../assets/images/logo.png";

import "./Logo.css";

const Logo = (props) => (
    <div className="Logo" style={{height: props.height}} >
        <img src={burgerLogo} alt="logo"></img>
    </div>
);

export default Logo;