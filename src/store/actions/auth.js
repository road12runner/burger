import * as actionTypes from './actionTypes'

import axios from 'axios'

const key = 'AIzaSyBfhSx5y_HQcrpEWCKSTyg-lA57j2JKISc'

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	}
}

export const authSuccess = (token, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		payload: {
			token,
			userId
		}
	}
}

export const authFailed = (error) => {
	return {
		type: actionTypes.AUTH_FAILED,
		error
	}
}

export const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('expirationDate');
	return {
		type: actionTypes.AUTH_LOGOUT
	}
}

export const checkAuthTimeout = (expirationTime) => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout())
		}, expirationTime * 1000)
	}
}

export const authUser = (email, password, isSignup) => {
	return dispatch => {
		dispatch(authStart())

		let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${key}`
		if (!isSignup) {
			url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${key}`
		}
		axios.post(url, {
			email, password, returnSecureToken: true
		}).then(response => {
			console.log(response);
			localStorage.setItem('token', response.data.idToken);
			localStorage.setItem('userId', response.data.localId);
			const expirationData = new Date(new Date().getTime() + response.data.expiresIn * 1000);
			localStorage.setItem('token', response.data.idToken);
			localStorage.setItem('expirationDate', expirationData);
			dispatch(authSuccess(response.data.idToken, response.data.localId));
			dispatch(checkAuthTimeout(response.data.expiresIn))
		}).catch(error => {
			dispatch(authFailed(error.response.data.error))
		})

	}
}

export const setAuthRedirect = (path) => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT,
		path
	}
}


export const checkAuthState = () => {
	return dispatch  => {
		const token = localStorage.getItem('token');
		const userId = localStorage.getItem('userId');
		if (!token && !userId) {
			dispatch(logout());
		} else {
			 const  expirationDate = new Date(localStorage.getItem('expirationDate'));
			 if (expirationDate > new Date()) {
				 dispatch(authSuccess(token, userId));
				 dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()/1000)));
			 } else {
				 dispatch(logout());
			 }

		}
	}
};