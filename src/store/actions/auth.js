import * as actionTypes from './actionTypes';

import axios from 'axios';

const key = 'AIzaSyBfhSx5y_HQcrpEWCKSTyg-lA57j2JKISc';

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	};
};


export const authSuccess = (token, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		payload: {
			token,
			userId
		}
	};
};


export const authFailed = (error) => {
	return {
		type: actionTypes.AUTH_FAILED,
		error
	};
};


export const authUser = (email, password, isSignup) => {
	return dispatch => {
		dispatch(authStart());
		
		let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${key}`;
		if (!isSignup){
			url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${key}`;
		}
		axios.post(url, {
			email, password, returnSecureToken: true
		}).then( response => {
			console.log(response);
			dispatch(authSuccess(response.data.idToken, response.data.localId));
		
		}).catch(error => {
			dispatch(authFailed(error.response.data.error));
		})
		
	}
};