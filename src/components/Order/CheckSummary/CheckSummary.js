import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from "./CheckSummary.css";

const checkSummary = (props) => {
    return (
        <div className={classes.CheckSummary}>
            <h1>We Hope it will tastes well !!</h1>
            <div style={{ width: '100%', height: '300px', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button 
                btnType="Danger" 
                clicked={props.onCheckoutCancel} >CANCEL</Button>
            <Button 
                btnType="Success" 
                clicked={props.onCheckoutContinue} >CONTINUE</Button>
        </div>
    );
};

export default checkSummary;