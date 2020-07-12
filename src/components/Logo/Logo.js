import React from 'react';

import burgerLogo from '../../assets/images/logo.png';
import classes from './Logo.module.css';

const Logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}} >
        <img src={burgerLogo} alt='logo'></img>
    </div>
);

export default Logo;