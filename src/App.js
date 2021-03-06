import React, { Component } from 'react'
import {connect} from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Layout from './components/layout/layout';
import BurgerBuilder from './containers/burger-bilder/burger-builder';
//import Checkout from './containers/checkout/checkout';
//import Orders from './containers/orders/orders';
import Auth from './containers/auth/auth';
import Logout from './containers/auth/logout';

import * as actions from './store/actions';

import asyncComponent from './hoc/asyncComponent';

const asyncCheckout = asyncComponent(()=> {
	return import('./containers/checkout/checkout');
});
const asyncOrders = asyncComponent(()=> {
	return import('./containers/orders/orders');
});



class App extends Component {
	componentDidMount() {
		this.props.onAuthCheckState();
	}
	render () {

		let routes = (
			<Switch>
				<Route path="/auth" exact component={Auth}/>
				<Route path="/" exact component={BurgerBuilder}/>
				<Redirect to="/"/>
			</Switch>

		);

		if (this.props.isAuthenticated) {
			routes = (
				<Switch>
					<Route path="/auth" exact component={Auth}/>
					<Route path='/orders' component={asyncOrders}/>
					<Route path="/checkout" component={asyncCheckout}/>
					<Route path="/logout" exact component={Logout}/>
					<Route path="/" exact component={BurgerBuilder}/>
					<Redirect to="/"/>
				</Switch>
			);
		}

		return (
			<Layout>
				{routes}
			</Layout>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated : state.authReducer.token !== null
	}
}

const mapDispatchToProps = dispatch => {
	return  {
		onAuthCheckState : () => dispatch(actions.checkAuthState())
	}
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
