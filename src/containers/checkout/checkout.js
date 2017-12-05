import React, {Component}  from 'react';

import CheckoutSummary  from '../../components/checkoutSummary/checkoutSummary';

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1
    }
  };

  checkoutCancelHandler = () => {
    console.log('go back');
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    return (
      <div>
        <CheckoutSummary ingredients={this.state.ingredients} checkoutCancelled={this.checkoutCancelHandler} checkoutContinued={this.checkoutContinueHandler}/>
      </div>

    );
  }
}

export default Checkout;