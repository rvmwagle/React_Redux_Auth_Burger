import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from '../Layout/Layout.module.css';
import {connect} from 'react-redux';

import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
    state={
        showSideDrawer:false
    };

    sideDrawerCloseHandler = () => {
        this.setState({
            showSideDrawer:false
        });
    }

    sideDrawerToggleHandler = () => {
        this.setState( (prevState) => {
            return {showSideDrawer:!prevState.showSideDrawer}
        });
    }
    render(){
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}
                    isAuthenticated={this.props.isAuthenticated}/>
                <SideDrawer showDrawer={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
} 

const mapStateToProps = state => {
    return{
        isAuthenticated: state.auth.isAuthenticated
    }
}
export default connect(mapStateToProps)(Layout);