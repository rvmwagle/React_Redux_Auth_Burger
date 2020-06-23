import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = (props) => (
    <div className={classes.NavigationItems}>
        <NavigationItem link='/' exact active>Burger Builder</NavigationItem>
        {!props.isAuthenticated 
        ? null
        : <NavigationItem link='/orders'>Orders</NavigationItem>
        }
        {!props.isAuthenticated 
        ? <NavigationItem link='/auth'>Log in</NavigationItem> 
        : <NavigationItem link='/logout'>Log out</NavigationItem>
        }
    </div>
);

export default navigationItems;