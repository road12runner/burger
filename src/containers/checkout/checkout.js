import React, {Component}  from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import CheckoutSummary  from '../../components/checkoutSummary/checkoutSummary';
import ContactData from './contact-data/contact-data';

class Checkout extends Component {
  // state = {
  //   ingredients: {
  //     salad: 1,
  //     meat: 1,
  //     cheese: 1,
  //     bacon: 1
  //   }
  // };

  checkoutCancelHandler = () => {
    console.log('go back');
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  // componentWillMount(){
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   let price = 0;
  //   for (let param of query.entries()) {
  //   	if (param[0] === 'price') {
  //   		price = param[1]
	// 	} else {
	// 		ingredients[param[0]] = + param[1];
	// 	}
  //
  //   }
  //   this.setState({ingredients, price});
  // }
  render() {
    return (
      <div>
        <CheckoutSummary ingredients={this.props.ings} checkoutCancelled={this.checkoutCancelHandler} checkoutContinued={this.checkoutContinueHandler}/>
        {/*<Route path={this.props.match.path + '/contact-data'} render={(props)=> (<ContactData ingredients={this.props.ings} {...props}/>)}/>*/}
		  <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
      </div>

    );
  }
}

const mapStateToProps = state => {
	return {
		ings : state.ingredients,
		price: state.totalPrice
	}
};

export default connect(mapStateToProps)(Checkout);