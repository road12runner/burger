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

export const orderBurger = (orderData, token) => {
	return dispatch => {
		
		dispatch(orderBurgerStart());
		
		axios.post('/orders.json?auth='+ token, orderData )
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


export const fetchOrders = (token, userId) => {
	return dispatch => {
	
		dispatch(fetchOrderStart());

		const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
		axios.get('/orders.json' + queryParams)
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
