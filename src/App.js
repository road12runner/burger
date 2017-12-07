import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom'
import Layout from './components/layout/layout';
import BurgerBuilder from './containers/burger-bilder/burger-builder';
import Checkout from './containers/checkout/checkout';
import Orders from './containers/orders/orders';
class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
			<Route path="/checkout" component={Checkout}/>
			<Route path ='/orders' component={Orders} />
			<Route path="/" exact component={BurgerBuilder}/>
        </Switch>
      </Layout>
    );
  }
}

export default App;
