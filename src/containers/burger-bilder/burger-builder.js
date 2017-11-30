import React, {Component} from 'react';

import Auxilary from '../../hoc/auxilary';
import Burger from '../../components/burger/burger';
import BuildControls from '../../components/burger/build-controls/build-controls';

const  INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	bacon: 0.7,
	meat: 1.3
};

class BurgerBuilder extends Component{
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		},
		totalPrice : 4
	};

	addIngredientHandler = (type) => {
		const count = this.state.ingredients[type] + 1;
		const updatedIngredients =  {...this.state.ingredients};
		updatedIngredients[type] = count;

		const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

		this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
	};

	removeIngredientHandler = (type) => {
		if (this.state.ingredients[type] > 0) {
			const count = this.state.ingredients[type] - 1;
			const updatedIngredients =  {...this.state.ingredients};
			updatedIngredients[type] = count;

			const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

			this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
		}

	};

	render() {
		const disabledInfo = {
			...this.state.ingredients
		};
		for (let key in disabledInfo) {
			disabledInfo[key]  = disabledInfo[key] === 0
		}

		return(
			<Auxilary>
				<Burger ingredients={this.state.ingredients}/>
				<BuildControls ingredientAdded={this.addIngredientHandler} ingredientRemoved={this.removeIngredientHandler} disabledInfo={disabledInfo}  price={this.state.totalPrice}/>
			</Auxilary>
		)
	}
}

export default BurgerBuilder;