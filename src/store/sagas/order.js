import axios from '../../axios-orders';
import {put} from 'redux-saga/effects'

import * as actions from '../actions';


export function* purchaseOrderSaga(action) {
	yield put( actions.orderBurgerStart());
	try {
		const response = yield axios.post('/orders.json?auth='+ action.token, action.orderData);
		yield put(actions.orderSuccess(response.data.name, action.orderData));
	} catch(error) {
		yield put(actions.orderFailed(error));
	}
}

export function* fetchOrdersSaga(action) {
	yield  put(actions.fetchOrderStart());
	try {
		const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
		const response = yield axios.get('/orders.json' + queryParams);

		const fetchOrders = [];
		for (let key in response.data) {
			fetchOrders.push({
				...response.data[key],
				id: key
			});
		}
		yield put(actions.fetchOrderSuccess(fetchOrders))
	} catch(error) {
		yield put(actions.fetchOrderFailed(error));
	}
}