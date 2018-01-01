import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		ingredientName: name
	};
};

export const removeIngredient = (name) => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingredientName: name
	};
};

export const setIngredients = (ingredients) => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients
	};
};

export const fetchIngredientsFailed = () => {
	return {
		type: actionTypes.ERROR_LOADING_INGREDIENTS
	};
};


export const initIngredients = () => {
	return {
		type: actionTypes.INIT_INGREDIENTS
	}
	// return dispatch => {
	// 	axios.get('/ingredients.json')
	// 		.then (resp =>  dispatch(setIngredients(resp.data)))
	// 		.catch(error => {
	// 			//this.setState({error: error})
	// 			dispatch(fetchIngredientsFailed());
	// 		});
	// }
};