import React from "react";
import classes from "./CheckoutSummary.module.css";
import Burger from "../../Burger/Burger";
import CustomButton from "../../UI/Button/CustomButton";

const CheckoutSummary = (props) => {

    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tasted well!</h1>
            <div className={classes.CheckoutSummaryInner}>
                <Burger ingredients={props.ingredients} />
            </div>
            <CustomButton 
                btnType='Success' 
                clicked>Continue</CustomButton>
            <CustomButton 
                btnType='Danger' 
                clicked>Cancel</CustomButton>
        </div>
    )
}

export default CheckoutSummary;