import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom'
import Layout from './components/layout/layout';
import BurgerBuilder from './containers/burger-bilder/burger-builder';
import Checkout from './containers/checkout/checkout';
import Orders from './containers/orders/orders';
import Auth from './containers/auth/auth';

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
			<Route path="/checkout" component={Checkout}/>
			<Route path ='/orders' component={Orders} />
			<Route path="/" exact component={BurgerBuilder}/>
	        <Route path="/auth" exact component={Auth}/>
        </Switch>
      </Layout>
    );
  }
}

export default App;
