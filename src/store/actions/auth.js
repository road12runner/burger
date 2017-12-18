import * as actionTypes from './actionTypes';

import axios from 'axios';

const key = 'AIzaSyBfhSx5y_HQcrpEWCKSTyg-lA57j2JKISc';

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	};
};


export const authSuccess = (authData) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		authData
	};
};


export const authFailed = (error) => {
	return {
		type: actionTypes.AUTH_FAILED,
		error
	};
};


export const authUser = (email, password) => {
	return dispatch => {
		dispatch(authStart());
		
		axios.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${key}`, {
			email, password, returnSecureToken: true
		}).then( response => {
			console.log(response);
			dispatch(authSuccess(response.data));
		
		}).catch(error => {
			console.error(error);
			dispatch(authFailed(error));
		})
		
	}
};