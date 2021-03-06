import * as actionTypes from '../actions/actionTypes';

const initialState = {
	ingredients: null,
	totalPrice: 4,
	error: false,
	isBuilding: false
};

const  INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	bacon: 0.7,
	meat: 1.3
};


const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName] : state.ingredients[action.ingredientName] + 1
				},
				isBuilding: true,
				totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
			};
		case actionTypes.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,

					[action.ingredientName] : state.ingredients[action.ingredientName] - 1
				},
				totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
				isBuilding: true,
			};
		case actionTypes.SET_INGREDIENTS:
			return {
				...state,
				ingredients : action.ingredients,
				totalPrice: 4,
				error: false
			};
		case actionTypes.ERROR_LOADING_INGREDIENTS:
			return {
				...state,
				error: true
			};
		default:
			return state;
	}
};

export  default reducer;