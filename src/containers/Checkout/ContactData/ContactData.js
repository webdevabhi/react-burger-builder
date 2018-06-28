import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.css'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Abhishek Patel',
                adress: {
                    street: 'test street 1',
                    zipCode: '460001',
                    country: 'India'
                },
                email: 'test@firebase.com'
            },
            deliveryMethod: 'fastest'
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

    render() {
        let form = (
            <form>
                <Input inputtype="input" type="text" name="name" placeholder="Your Name" />
                <Input inputtype="input" type="email" name="email" placeholder="Your Mail" />
                <Input inputtype="input" type="text" name="street" placeholder="Street" />
                <Input inputtype="input" type="text" name="postCode" placeholder="Post Code" />

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