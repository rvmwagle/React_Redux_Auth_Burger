import React from 'react';
import classes from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../../UI/Backdrop/Backdrop';



const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer , classes.Close];
    if (props.showDrawer){
        attachedClasses=[classes.SideDrawer, classes.Open];
    }
    return (
        <Aux>
            <Backdrop show={props.showDrawer} clicked={props.closed}/>
                <div className={attachedClasses.join(' ')}>
                    {/* <Logo height="11%"/>  one way to do this*/}
                    <div className={classes.Logo}>
                        <Logo />
                    </div>
                    <nav>
                        <NavigationItems />
                    </nav>
                </div>
        </Aux>
    );
}

export default sideDrawer;