import {takeEvery, all, takeLatest} from 'redux-saga/effects';
import {logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckSaga} from './auth';
import {initIngredientSaga} from './burgerBuilder';
import {purchaseOrderSaga, fetchOrdersSaga} from './order'

import * as actionTypes from '../actions/actionTypes';

export function* watchAuth() {
	yield all([
		takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
		takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
		takeEvery(actionTypes.AUTH_USER, authUserSaga),
		takeEvery(actionTypes.AUTH_CHECK_INITIAL_STATE, authCheckSaga),
		takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientSaga),
		takeLatest(actionTypes.PURCHASE_BURGER, purchaseOrderSaga),
		takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga),
	]);
}