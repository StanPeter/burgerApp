import React from "react";

import burgerLogo from "../../assets/images/logo.png";

import "./Logo.css";

const Logo = (prosp) => (
    <div className="Logo">
        <img src={burgerLogo} alt="logo"></img>
    </div>
);

export default Logo;