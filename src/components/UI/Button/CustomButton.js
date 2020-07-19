import React from 'react';
import classes from './CustomButton.module.css';

//Success || Danger
const CustomButton = (props) => (
    <button 
        onClick={props.clicked}
        disabled={props.disabled}
        className={[classes.Button, classes[props.btnType]].join(' ')}>
        {props.children}
    </button>
)

export default CustomButton;

