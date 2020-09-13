import React from 'react';
import classes from './NavigationItems.module.css';

import NavigationItem from 'components/Navigation/NavigationItem/NavigationItem';

const NavigationItems = (props) => ( //exact to match even '/' path
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/' exact>Burger Builder</NavigationItem>
        {props.isAuthenticated ? <NavigationItem link='/orders'>Orders</NavigationItem> : null}
        {!props.isAuthenticated ? 
            <NavigationItem link='/auth'>Login</NavigationItem> :
            <NavigationItem link='/logout'>Logout</NavigationItem>}
    </ul>
);

export default NavigationItems;