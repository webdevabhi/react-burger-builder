import React from 'react';

import classes from "./Order.css";

const order = (props) => {

    const ingredients = [];
    for(let ingred in props.ingredients) {
        ingredients.push({
            name: ingred,
            amount: props.ingredients[ingred]
        });
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span 
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
            key={ig.name}>{ig.name} ({ig.amount})</span>
    });

    let custName = '';
    if (props.custDetails && props.custDetails.hasOwnProperty('name')) {
        custName = props.custDetails.name;
    }

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Customer: {props.orderData.name}, {props.orderData.street}, {props.orderData.country} - {props.orderData.zipCode}</p>
            <p>Delivery Method: {props.orderData.deliveryMethod}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
};

export default order;