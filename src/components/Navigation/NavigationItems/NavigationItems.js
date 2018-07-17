import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            { props.isAuthenticate ? <NavigationItem link="/orders">Orders</NavigationItem> : null }
            { props.isAuthenticate
                ? <NavigationItem link="/logout">Logout</NavigationItem>
                : <NavigationItem link="/auth">Login</NavigationItem> }
        </ul>
    );
};

export default navigationItems;