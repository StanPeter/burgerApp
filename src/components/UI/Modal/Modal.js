import React from "react";
import "./Modal.css";
import Aux from "../../../hoc/Aux";
import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) => {
    // console.log(props);

    return (
        <Aux>
            <div className={props.show ? "Modal ModalShow":"Modal ModalHide"}>
                {props.children}
            </div>
            <Backdrop show={props.show} hide={props.hide} />
        </Aux>
    )  
};

export default Modal;
