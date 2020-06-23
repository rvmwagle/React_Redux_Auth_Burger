import React , {Component} from 'react';
import Order from '../../../components/Order/Order';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../../components/UI/Spinner/Spinner';

import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';

class Orders extends Component {

    state = {
        // orders: [],
        // loading: true
    }

    componentDidMount(){
        this.props.onFetchOrders(this.props.idToken, this.props.userId);
        // axios.get('/orders.json')
        //     .then(res => {
        //         console.log(res.data);
        //         const fetchedOrders = [];
        //         for (let key in res.data){
        //             // the spread operator helps to get all props in the res.data 
        //             // like customer, ingredients, price etc
        //             fetchedOrders.push({
        //                 ...res.data[key],
        //                 id: key
        //             })
        //         }
        //         console.log(fetchedOrders);
        //         this.setState({loading:false, orders:fetchedOrders});
        //     })
        //     .catch(err => {
        //         this.setState({loading:false});
        //     });
    }

    render(){
        let ordersList = <Spinner />
        if (!this.props.loading) {
            ordersList = (
                this.props.orders.map(order => (
                    <Order key={order.id} price={order.price} ingredients={order.ingredients}/>
                ))
            );
        }
        return(
            <div>
                {ordersList}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders : state.orderReducer.orderData,
        loading : state.orderReducer.loading,
        idToken : state.auth.idToken,
        userId : state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (idToken, userId) => dispatch(actions.fetchOrders(idToken, userId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders,axios));