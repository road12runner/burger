import * as actionTypes from './actionTypes'
import axios from '../../axios-orders';

export const  orderSuccess = (id, orderData) => {
	return {
		type: actionTypes.ORDER_BURGER_SUCCESS,
		orderId: id,
		orderData
	}
};


export const  orderFailed = (error) => {
	return {
		type: actionTypes.ORDER_BURGER_FAILED,
		error
	}
};

export const orderBurgerStart = () => {
	return {
		type: actionTypes.ORDER_BURGER_START
	};
};

export const orderBurgerInit =() => {
	return {
		type: actionTypes.ORDER_BURGER_INIT
	};
};

export const orderBurger = (orderData) => {
	return dispatch => {
		
		dispatch(orderBurgerStart());
		
		axios.post('/orders.json', orderData )
			.then( response => {
					const id = response.data.id;
					dispatch(orderSuccess(response.data.name, orderData))
				}
			
			).catch( error => dispatch(orderFailed(error)));
	}
};


export const fetchOrderSuccess = (orders) => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders
	};
};

export const fetchOrderFailed = (error) => {
	return {
		type: actionTypes.FETCH_ORDERS_FAILED,
		error
	};
};

export const fetchOrderStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START
	};
};


export const fetchOrders = () => {
	return dispatch => {
	
		dispatch(fetchOrderStart());
		axios.get('/orders.json')
			.then(response => {
				const fetchOrders = [];
				for (let key in response.data) {
					fetchOrders.push({
						...response.data[key],
						id: key
					});
				}
				dispatch(fetchOrderSuccess(fetchOrders));
			})
			.catch(error => dispatch(fetchOrderFailed(error)));
	};
	
};
