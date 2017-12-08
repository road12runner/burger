import React, {Component} from 'react';
import axios from '../../axios-orders';
import Order from '../../components/burger/order-summary/order';
import Spinner from '../../components/ui/spinner/spinner';

class Orders extends Component {
	state = {
		orders: [],
		loading : false
	};

	componentDidMount() {
		this.setState({loading: true});
		axios.get('/orders.json').then(response => {
			setTimeout( ()=> {
        this.setState({loading: false, orders : response.data});
			}, 3000);
		})

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

		const orders = (this.state.loading && !this.state.orders) ? <Spinner/> : this.renderOrders(this.state.orders);

		return (
			<div>
				{orders}
			</div>
		)
	}
}

export default Orders;