import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Auxilary from '../../hoc/auxilary'
import Burger from '../../components/burger/burger'
import BuildControls from '../../components/burger/build-controls/build-controls'
import Modal from '../../components/ui/modal/modal'
import OrderSummary from '../../components/burger/order-summary/order-summary'
import Spinner from '../../components/ui/spinner/spinner'
import withErrorHandler from '../../hoc/with-error-handler'
import axios from '../../axios-orders'
import * as burgerBuilderActions from '../../store/actions/'

import * as actionsTypes from '../../store/actions/actionTypes'

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	bacon: 0.7,
	meat: 1.3
}

class BurgerBuilder extends Component {
	state = {
		purchasable: false,
		purchasing: false,
		loading: false,
	}

	componentDidMount () {
		// axios.get('https://burger-90e99.firebaseio.com/ingredients.json')
		// 	.then (resp => this.setState({ingredients: resp.data}))
		// 	.catch(error => {
		// 		console.log('error', error);
		// 		this.setState({error: error})
		// 	});
		this.props.onInitIngredients()
	}

	purchaseHandler = () => {
		if (this.props.isAuthenticated) {
			this.setState({purchasing: true});
			this.props.history.push({pathname: '/checkout'})
		} else {
			this.props.onSetAuthRedirect('/checkout');
			this.props.history.push({pathname: '/auth'});
		}

	}

	purchaseCancelHandler = () => {
		this.setState({purchasing: false})
	}

	purchaseContinueHandler = () => {
		//alert('You Continue');
		//this.setState({loading: true});

		//  const queryParam = [];
		//  for (let i in this.state.ingredients) {
		// 	queryParam.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
		//  }
		//  queryParam.push(encodeURIComponent('price') + '=' + encodeURIComponent(this.props.totalPrice));
		// this.props.history.push({pathname: '/checkout', search: queryParam.join('&')});
		this.props.onInitOrder()
		this.props.history.push({pathname: '/checkout'})

	}

	updatePurchaseState (updatedIngredients) {

		const ingredients = {...updatedIngredients}
		const sum = Object.keys(ingredients).map(idKey => {
			return ingredients[idKey]
		}).reduce((sum, el) => {
			return sum + el
		}, 0)

		console.log('updatePurchaseState', sum)
		return sum > 0

	}

	addIngredientHandler = (type) => {
		const count = this.state.ingredients[type] + 1
		const updatedIngredients = {...this.state.ingredients}
		updatedIngredients[type] = count

		const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type]

		this.setState({ingredients: updatedIngredients, totalPrice: newPrice})

		this.updatePurchaseState(updatedIngredients)
	}

	removeIngredientHandler = (type) => {
		if (this.state.ingredients[type] > 0) {
			const count = this.state.ingredients[type] - 1
			const updatedIngredients = {...this.state.ingredients}
			updatedIngredients[type] = count

			const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type]

			this.setState({ingredients: updatedIngredients, totalPrice: newPrice})

			this.updatePurchaseState(updatedIngredients)
		}

	}

	render () {
		const disabledInfo = {
			...this.props.ings
		}
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] === 0
		}

		let component = null
		if (this.props.ings !== null) {
			component = <OrderSummary ingredients={this.props.ings}
			                          totalPrice={this.props.totalPrice}
			                          purchaseCancelled={this.purchaseCancelHandler}
			                          purchaseContinue={this.purchaseContinueHandler}
			/>
		}

		if (this.state.loading) {
			let component = <Spinner/>
		}

		let burger = <Spinner/>
		if (this.props.ings) {
			burger = <Auxilary>
				<Burger ingredients={this.props.ings}/>
				<BuildControls ingredientAdded={this.props.onIngredientAdded}
				               ingredientRemoved={this.props.onIngredientRemoved}
				               disabledInfo={disabledInfo}
				               price={this.props.totalPrice}
				               purchasable={this.updatePurchaseState(this.props.ings)}
				               ordered={this.purchaseHandler}
				               isAuthenticated={this.props.isAuthenticated}
				/>
			</Auxilary>
		}

		return (
			<Auxilary>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					{component}
				</Modal>
				{burger}
			</Auxilary>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.burgerReducer.ingredients,
		error: state.burgerReducer.error,
		totalPrice: state.burgerReducer.totalPrice,
		isAuthenticated: state.authReducer.token !== null
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onIngredientAdded: ingredientName => dispatch(burgerBuilderActions.addIngredient(ingredientName)),
		onIngredientRemoved: ingredientName => dispatch(burgerBuilderActions.removeIngredient(ingredientName)),
		onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
		onInitOrder: () => dispatch(burgerBuilderActions.orderBurgerInit()),
		onSetAuthRedirect : (path) => dispatch(burgerBuilderActions.setAuthRedirect(path))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))