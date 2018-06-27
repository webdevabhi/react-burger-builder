import React, { Component } from 'react';

import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.css'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Conatct Data</h4>
                <form>
                    <input type="text" name="name" placeholder="Your Name" />
                    <input type="email" name="email" placeholder="Your Mail" />
                    <input type="text" name="street" placeholder="Street" />
                    <input type="text" name="postCode" placeholder="Post Code" />

                    <Button btnType="Success">ORDER</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;