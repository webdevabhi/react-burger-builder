import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckSummary from "../../components/Order/CheckSummary/CheckSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();

    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to="/" />
        if (this.props.ings) {
            summary = (<div>
                <CheckSummary
                    ingredients={this.props.ings}
                    onCheckoutCancel={this.checkoutCancelledHandler}
                    onCheckoutContinue={this.checkoutContinueHandler} />

                <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData} />
            </div>)
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    };
}

export default connect(mapStateToProps)(Checkout);