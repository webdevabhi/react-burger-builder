import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.css'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderFrom: {
            name: {
                elementType: 'input',
                elementCofig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: 'Abhishek Patel'
            },
            street: {
                elementType: 'input',
                elementCofig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '13th Main'
            },
            zipCode: {
                elementType: 'input',
                elementCofig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '560010'
            },
            country: {
                elementType: 'input',
                elementCofig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: 'India'
            },
            email: {
                elementType: 'input',
                elementCofig: {
                    type: 'text',
                    placeholder: 'Your E-Mail'
                },
                value: 'abhishek@test.com'
            },
            deliveryMethod: {
                elementType: 'select',
                elementCofig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ],
                },
                value: 'fastest'
            },
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const formData = {};
        for (const formElmIdentifier in this.state.orderFrom) {
            if (this.state.orderFrom.hasOwnProperty(formElmIdentifier)) {
                formData[formElmIdentifier] = this.state.orderFrom[formElmIdentifier].value;
            }
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
        axios.post('/orders.json', order)
            .then(res => {
                this.setState({ loading: false });
                this.props.history.push('/orders');
            })
            .catch(err => {
                console.error(err);
                this.setState({ loading: false });
            });
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderFrom
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };

        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({ orderFrom: updatedOrderForm});
    }

    render() {
        const formElementArray = [];
        for (let key in this.state.orderFrom) {
            if (this.state.orderFrom.hasOwnProperty(key)) {
                formElementArray.push({
                    id: key,
                    config: this.state.orderFrom[key]
                });
            }
        }
        let form = (
            <form>
                
                {formElementArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementCofig={formElement.config.elementCofig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}

                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Conatct Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;