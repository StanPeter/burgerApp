import React from 'react';
import classes from './Input.module.css'

const Input = (props) => {
    let inputElement = null;

    switch(props.elementType) {
        case 'input':
            inputElement = <input 
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.value}
                onChange={props.onChange} />;
            break;
        case 'textarea':
            inputElement = <textarea 
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.value}
                onChange={props.onChange} />;
            break;
        case 'select':
            inputElement = (
                <select
                    className={classes.InputElement}
                    value={props.value}
                    onChange={props.onChange} >
                    {props.elementConfig.options.map(option => (
                        <option value={option.value} key={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            )
            break;
        default:
            inputElement = <input 
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.value}
                onChange={props.onChange} />;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
};

export default Input;
