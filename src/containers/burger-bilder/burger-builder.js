import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import Auxilary from '../../hoc/auxilary';
import Burger from '../../components/burger/burger';
import BuildControls from '../../components/burger/build-controls/build-controls';
import Modal from '../../components/ui/modal/modal';
import OrderSummary from '../../components/burger/order-summary/order-summary';
import Spinner from '../../components/ui/spinner/spinner';
import withErrorHandler from '../../hoc/with-error-handler';
import axios from '../../axios-orders';
const  INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	bacon: 0.7,
	meat: 1.3
};

class BurgerBuilder extends Component{
	state = {
		ingredients: null,
		totalPrice : 4,
		purchasable: false,
		purchasing: false,
		loading : false,
	};

	componentDidMount() {
		axios.get('https://burger-90e99.firebaseio.com/ingredients.json')
			.then (resp => this.setState({ingredients: resp.data}))
			.catch(error => {
				console.log('error', error);
				this.setState({error: error})
			});
	}

	purchaseHandler = () => {
		this.setState({purchasing: true});
	};

	purchaseCancelHandler = () =>{
		this.setState({purchasing: false});
	};
  purchaseContinueHandler = () => {
  	//alert('You Continue');
		//this.setState({loading: true});

	 const queryParam = [];
	 for (let i in this.state.ingredients) {
	 	queryParam.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
	 }
	this.props.history.push({pathname: '/checkout', search: queryParam.join('&')});

  };

	updatePurchaseState(updatedIngredients)  {
		const ingredients = {...updatedIngredients};
		const sum = Object.keys(ingredients).map( idKey => {
			return ingredients[idKey]
		}).reduce((sum, el)=> {
			return sum + el;
		},0);

		this.setState({purchasable: sum > 0});

	}
	addIngredientHandler = (type) => {
		const count = this.state.ingredients[type] + 1;
		const updatedIngredients =  {...this.state.ingredients};
		updatedIngredients[type] = count;

		const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

		this.setState({ingredients: updatedIngredients, totalPrice: newPrice});

		this.updatePurchaseState(updatedIngredients);
	};

	removeIngredientHandler = (type) => {
		if (this.state.ingredients[type] > 0) {
			const count = this.state.ingredients[type] - 1;
			const updatedIngredients =  {...this.state.ingredients};
			updatedIngredients[type] = count;

			const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

			this.setState({ingredients: updatedIngredients, totalPrice: newPrice});

      this.updatePurchaseState(updatedIngredients);
		}

	};

	render() {
		const disabledInfo = {
			...this.state.ingredients
		};
		for (let key in disabledInfo) {
			disabledInfo[key]  = disabledInfo[key] === 0
		}

		let component = null;
		if (this.state.ingredients !== null) {
      component = <OrderSummary ingredients={this.state.ingredients}
																totalPrice={this.state.totalPrice}
																purchaseCancelled={this.purchaseCancelHandler}
																purchaseContinue={this.purchaseContinueHandler}
			/>
		}

		if (this.state.loading ) {
      let component = <Spinner/>;
		}


    let burger = <Spinner/>;
		if (this.state.ingredients) {
      burger = <Auxilary>
				<Burger ingredients={this.state.ingredients}/>
				<BuildControls ingredientAdded={this.addIngredientHandler}
											 ingredientRemoved={this.removeIngredientHandler}
											 disabledInfo={disabledInfo}
											 price={this.state.totalPrice}
											 purchasable={this.state.purchasable}
											 ordered={this.purchaseHandler}
				/>
			</Auxilary>;
		}




		return(
			<Auxilary>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					{component}
				</Modal>
				{burger}
			</Auxilary>
		)
	}
}

export default withErrorHandler(BurgerBuilder, axios);