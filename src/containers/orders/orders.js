import React, {Component} from 'react';
import axios from '../../axios-orders';
import Order from '../../components/burger/order-summary/order';
import Spinner from '../../components/ui/spinner/spinner';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';

class Orders extends Component {
	// state = {
	// 	orders: [],
	// 	loading : false
	// };

	componentDidMount() {
		this.props.onOrdersFetch(this.props.token, this.props.userId);
		//this.setState({loading: true});
		// axios.get('/orders.json').then(response => {
		// 	setTimeout( ()=> {
		// this.setState({loading: false, orders : response.data});
		// 	}, 3000);
		// })

	}

	renderOrders(orders) {
    	const result = [];
		for ( let key in orders) {
      		const order = orders[key];
      		result.push( <Order key={key} ingredients={order.ingredients} price={order.price}/>)
    	}
    	console.log('orders', result);
		return result;

	}

	render() {

		const orders = (this.props.loading && !this.props.orders) ? <Spinner/> : this.renderOrders(this.props.orders);

		return (
			<div>
				{orders}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.orderReducer.loading,
		orders: state.orderReducer.orders,
		token: state.authReducer.token,
		userId: state.authReducer.userId
	};
};

const mapDispatchToProps = dispatch => {
	return{
		onOrdersFetch: (token, userId) => dispatch(actions.fetchOrders(token, userId))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);