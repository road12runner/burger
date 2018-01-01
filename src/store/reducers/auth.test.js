import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
	token: null,
	userId: null,
	error: null,
	loading: false,
	authRedirectPath: '/'
};

describe('Auth Reducer', ()=> {
	it ('should return initial state', ()=> {
		expect(reducer(undefined, {})).toEqual(initialState);
	});
	
	it('should store token after login', () => {
		expect(reducer(initialState, {type: actionTypes.AUTH_SUCCESS, payload: {token: 'token', userId: 'userId'}})).toEqual({
			token: 'token',
			userId: 'userId',
			error: null,
			loading: false,
			authRedirectPath: '/'
		})
	});
});