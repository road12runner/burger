import React from 'react';
import css from './checkoutSummary.css';
import Burger from '../burger/burger';
import Button from '../ui/button/button';

const checkoutSummary = (props) => {
  return (
    <div className={css.CheckoutSummary}>
      <h1>We hope it tasets well!</h1>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredients={props.ingredients}/>
      </div>
      <Button buttonType="Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
      <Button buttonType="Success" clicked={props.checkoutContinued}>CONTINUE</Button>

    </div>
  )
};

export default checkoutSummary;