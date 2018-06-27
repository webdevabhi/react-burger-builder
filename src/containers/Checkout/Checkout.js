import React, { Component } from 'react';
import CheckSummary from "../../components/Order/CheckSummary/CheckSummary";

class Checkout extends Component {
    state = {
        ingredients: {
            salad:1,
            meat:1,
            cheese:1,
            bacon:1
        }
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for(let param of query.entries()) {
            ingredients[param[0]] = +param[1];
        }

        this.setState({ingredients: ingredients});
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();

    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckSummary 
                    ingredients={this.state.ingredients}
                    onCheckoutCancel={this.checkoutCancelledHandler}
                    onCheckoutContinue={this.checkoutContinueHandler} />
            </div>
        );
    }
}

export default Checkout;