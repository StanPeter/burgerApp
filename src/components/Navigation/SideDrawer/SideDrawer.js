import React from 'react';
import classes from './SideDrawer.module.css';

import Aux from 'hoc/Aux';
import Logo from 'components/Logo/Logo';
import NavigationItems from 'components/Navigation/NavigationItems';
import Backdrop from 'components/UI/Backdrop/Backdrop';

const SideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open) attachedClasses = [classes.SideDrawer, classes.Open];

    return (
        <Aux>
            <Backdrop show={props.open} hide={props.close} />
            <div className={attachedClasses.join(' ')} onClick={props.close}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuthenticated} />
                </nav>
            </div>
        </Aux>
    );
};

export default SideDrawer;
