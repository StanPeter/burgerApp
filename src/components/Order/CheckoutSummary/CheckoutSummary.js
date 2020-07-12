import React from 'react';
import classes from './CheckoutSummary.module.css';

import Burger from 'components/Burger/Burger';
import CustomButton from 'components/UI/Button/CustomButton';

const CheckoutSummary = (props) => {

    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tasted well!</h1>
            <div className={classes.CheckoutSummaryInner}>
                <Burger ingredients={props.ingredients} />
            </div>
            <CustomButton 
                btnType='Danger' 
                clicked={props.onCheckoutCancel}>Cancel</CustomButton>
            <CustomButton 
                btnType='Success' 
                clicked={props.onCheckoutContinue}>Continue</CustomButton>
        </div>
    )
}

export default CheckoutSummary;