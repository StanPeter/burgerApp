import React from "react";
import classes from "./SideDrawer.module.css";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Aux";

const SideDrawer = (props) => {
    let backdropClasses = [classes.SideDrawer, classes.Close];
    if(props.open) backdropClasses = [classes.SideDrawer, classes.Open];

    return (
        <Aux>
            <Backdrop className={backdropClasses} show={props.open} clicked={props.close} />
            <div className="SideDrawer">
                <Logo height="12%" />
                <nav>
                    ...some
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
};

export default SideDrawer;
