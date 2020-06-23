import React from 'react';
import BurgerLogo from '../../assets/image/burger-logo.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height:props.height}}>
        <img src={BurgerLogo} alt="MyBurger"></img>
    </div>
);

export default logo;