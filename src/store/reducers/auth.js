import * as actionTypes from '../actions/actionTypes'

const initialState = {
	token: null,
	userId: null,
	error: null,
	loading: false,
	authRedirectPath: '/'
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START:
			return {
				...state,
				loading: true,
				error: null
			};
		case actionTypes.AUTH_SUCCESS:
			return {
				...state,
				error: null,
				userId: action.payload.userId,
				token: action.payload.token,
				loading: false
			};
		case actionTypes.AUTH_FAILED:
			return {
				...state,
				error: action.error,
				loading: false
			};
		case actionTypes.AUTH_LOGOUT:
			return {
				...state,
				userId: null,
				token: null
			};
		case actionTypes.SET_AUTH_REDIRECT:
			return {
				...state,
				authRedirectPath: action.path
			}
		default:
			return state;

	}
}

export default reducer