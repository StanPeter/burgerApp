import React from "react";

import classes from "./Modal.module.css";
import Aux from "../../../hoc/Aux";
import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) => {
    // console.log(props);

    return (
        <Aux>
            <Backdrop show={props.show} hide={props.hide} />
            <div 
                className={classes.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }} >
                {props.children}
            </div>
        </Aux>
    )  
};

export default Modal;
