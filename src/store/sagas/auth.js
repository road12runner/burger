import {delay} from 'redux-saga';
import {put} from 'redux-saga/effects'
import axios from 'axios';

import * as actions from '../actions/index';

const key = 'AIzaSyBfhSx5y_HQcrpEWCKSTyg-lA57j2JKISc';

export function* logoutSaga(action) {
	yield localStorage.removeItem('token');
	yield localStorage.removeItem('expirationDate');
	yield localStorage.removeItem('userId');
	yield put(actions.logoutSucceed())
}


export function* checkAuthTimeoutSaga(action) {
	yield  delay(action.expirationTime * 1000);
	yield put(actions.logout());
}

export function* authUserSaga(action) {
	
	yield put(actions.authStart());
	const authData = {
		email: action.email,
		password: action.password,
		returnSecureToken: true
	};
	
	let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${key}`;
	if (!action.isSignup) {
		url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${key}`;
	}
	
	try {
		const response = yield axios.post(url, authData);
		
		console.log(response);
		const expirationData = new Date(new Date().getTime() + response.data.expiresIn * 1000);
		
		yield localStorage.setItem('token', response.data.idToken);
		yield localStorage.setItem('userId', response.data.localId);
		yield localStorage.setItem('expirationDate', expirationData);
		
		yield put(actions.authSuccess(response.data.idToken, response.data.localId));
		yield put(actions.checkAuthTimeout(response.data.expiresIn));
		
	} catch (error) {
		yield put(actions.authFailed(error.response.data.error));
	}
}

export function* authCheckSaga(action) {
	const token = yield localStorage.getItem('token');
	const userId = yield localStorage.getItem('userId');
	if (!token && !userId) {
		yield put(actions.logout());
	} else {
		const expirationDate = new Date(localStorage.getItem('expirationDate'));
		if (expirationDate > new Date()) {
			yield put(actions.authSuccess(token, userId));
			yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime() / 1000)));
		} else {
			yield put(actions.logout());
		}
		
	}

	
	
	return dispatch => {
	};
	
}