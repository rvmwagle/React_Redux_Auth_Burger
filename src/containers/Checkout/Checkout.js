import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from '../../containers/Checkout/ContactData/ContactData';

import {connect} from 'react-redux';

class Checkout extends Component{
    // state = {
    //     ingredients:null,
    //     totalPrice:0
    // }

    // componentWillMount() {
    //     // this is used to retrieve the search params and add it to our state
    //     // http://localhost:3000/checkout?bacon=1&cheese=1&meat=2&salad=1 example link
    //     const query = new URLSearchParams(this.props.location.search);
    //     // console.log('Query entries:' );
    //     // console.log( query.entries());
    //     const ingredients={};
    //     let price=0;
    //     for(let param of query.entries()){
    //         //['salad' , '1']
    //         // console.log('Param : ' + param[0] + ':' + param[1]); // yields {bacon:1,cheese:1...}
    //         // console.log(ingredients[param[0]] = + param[1]);
    //         if (param[0] === 'price'){
    //             price = param[1];
    //         }
    //         else{
    //             ingredients[param[0]] =+ param[1]; //converting to number
    //         }
    //     }
    //     console.log(ingredients);
    //     this.setState({ingredients:ingredients, totalPrice:price});
    // }



    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to='/' />
        if (this.props.ings){
            const purchaseRedirect = this.props.purchased ? <Redirect to='/' /> : null;
            summary = (
                <div>
                    {purchaseRedirect}
                    <CheckoutSummary 
                        ingredients={this.props.ings} 
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} />
                        {/* // props are passed down to ContactData and 
                        // these are related to route as Checkout component has access to these. Another way to do 
                        // that would have been to use withRouter and wrap this to our ContactData
                        // Here we use the first method */}
                    <Route path={this.props.match.path + '/contact-data'} 
                    // render={(props)=> (<ContactData ingredients={this.state.ingredients} 
                    //                                 price={this.state.totalPrice} {...props}/>)} 
                    component={ContactData}
                    />
                </div>
            );
        }
        return(
            <div>
                {summary}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings : state.burgerBuilderReducer.ingredients,
        price : state.burgerBuilderReducer.totalPrice,
        purchased : state.orderReducer.purchased
    }
}

export default connect(mapStateToProps)(Checkout);