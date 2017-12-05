import React, {Component} from 'react';
import Aux from '../../../hoc/auxilary';

import Button from '../../ui/button/button';

class OrderSummary extends Component {
  componentWillUpdate() {
    console.log('OrderSummary.componentWillUpdate');
  }
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map( idKey => {
        return <li key={idKey}>
          <span style={{textTransform: 'capitalize'}}>{idKey}</span> : {this.props.ingredients[idKey]}
        </li>
      });

    return (
      <Aux>
        <h3>Your Order:</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p>Total price: ${this.props.totalPrice}</p>
        <p>Continue to Checkout?</p>
        <Button buttonType='Danger' clicked={this.props.purchaseCancelled}>CANCEL</Button>
        <Button buttonType='Success' clicked={this.props.purchaseContinue}>CONTINUE</Button>
      </Aux>
    )
  }
}

export default OrderSummary;