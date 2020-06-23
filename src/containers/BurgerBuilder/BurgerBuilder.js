import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axiosInstance from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import {connect} from 'react-redux';
// import * as actionTypes from '../../store/actions/actionTypes';
import * as actions from '../../store/actions/index';

// import orderSummary from '../../components/Burger/OrderSummary/OrderSummary';



class BurgerBuilder extends Component {

    state = {
        // purchasable: false, //this is for enabling disabling order now button
        purchasing: false, //this is for showing hiding the order summary modal
        // loading:false, //this is for showing hiding spinner
        // error : false //this is for showing ingredients error while fetching ingredients
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    // To enable disable order now button
    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return  sum > 0 ;
    }

    //To show modal order summary
    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    //To close modal order summary
    purchaseCancelHandler =() => {
        this.setState({purchasing:false});
    }

    //To continue with order purchase
    purchaseContinueHandler =() => {
        this.props.onInitPurchase();
        if (this.props.isAuthenticated){
            this.props.history.push({pathname:'/checkout'});
        }
        else {
            this.props.history.push({pathname:'/auth'});
        }
        
    }

    

    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        //output of above : salad:true, meat:false ...

        let orderSummary = null;
        //Since order summary also makes use of ingredients and which we now fetch from db we mve it to
        // condition when we receive the burger ingredients

        let burger =this.props.error ? <p>Ingredients could not be fetched!</p> : <Spinner />
        if (this.props.ings) {
            burger = 
            (<Aux>
                <Burger ingredients={this.props.ings} />
                <BuildControls
                    addIngredient={this.props.onAddIngredient}
                    removeIngredient={this.props.onRemoveIngredient}
                    disabled={disabledInfo}
                    price={this.props.price}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchaseHandler}
                    isAuthenticated={this.props.isAuthenticated}
                    idToken={this.props.idToken}
                />
            </Aux>);
            orderSummary = 
            (<OrderSummary 
                ingredients={this.props.ings}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                totalPrice={this.props.price}>
            </OrderSummary>);
        }   

        // if (this.state.loading){
        //     orderSummary = <Spinner />
        // }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

// once we have multiple reducers we need to be explicit in identifying where our state comes from 
const mapStateToProps = state => {
    return {
        ings : state.burgerBuilderReducer.ingredients,
        price : state.burgerBuilderReducer.totalPrice,
        error : state.burgerBuilderReducer.error,
        idToken : state.auth.idToken,
        isAuthenticated : state.auth.isAuthenticated
    }

}

const mapDispatchToProps = dispatch => {
    return{
        onAddIngredient: (name) => dispatch(actions.addIngredient(name)),
        onRemoveIngredient: (name) => dispatch(actions.removeIngredient(name)),
        onInitIngredients : () => dispatch(actions.initIngredients()),
        onInitPurchase:() => dispatch(actions.purchaseInit())
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axiosInstance));