import React from 'react';
import classes from './Logo.module.css';

import burgerLogo from 'assets/images/logo.png';

const Logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}} >
        <img src={burgerLogo} alt='logo'></img>
    </div>
);

export default Logo;