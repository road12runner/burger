import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom'
import Layout from './components/layout/layout';
import BurgerBuilder from './containers/burger-bilder/burger-builder';
import Checkout from './containers/checkout/checkout';
class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/" exact component={BurgerBuilder}/>
        </Switch>
      </Layout>
    );
  }
}

export default App;
