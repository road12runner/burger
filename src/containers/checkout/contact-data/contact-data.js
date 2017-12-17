import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '../../../components/ui/button/button';
import Spinner from '../../../components/ui/spinner/spinner';
import Input from '../../../components/ui/input/input';

import css from './contact-data.css';
import axios from '../../../axios-orders';
import * as actions from '../../../store/actions';
import withErrorHandler  from '../../../hoc/with-error-handler';
class ContactData extends Component {
	state = {
		orderForm : {
			
			name: {
				elementType: 'input',
				elementConfig: {
					type: "text",
					placeholder: 'Your Name'
				},
				value: '',
				touched: false,
				validation: {
					required: true
				},
				valid: false
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: "email",
					placeholder: 'Your Email'
				},
				value: '',
				touched: false,
				validation: {
					required: true
				},
				valid: false
				
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: "text",
					placeholder: 'Address'
				},
				touched: false,
				value: ''
			},
			postalCode: {
				elementType: 'input',
				elementConfig: {
					type: "text",
					placeholder: 'Zip Code'
				},
				validation: {
					minLength: 5,
					maxLnegth: 5
				},
				touched: false,
				value: ''
			},
			deliveryType: {
				elementType: 'select',
				elementConfig: {
					options: [
						{value : 'fastest', displayValue: 'Fastest'},
						{value : 'cheapest', displayValue: 'Cheapest'}
					]
				},
				touched: false,
				value: 'fastest'
			},
			
		},
		formIsValid : false,
		loading: false
	};

	checkValidity(value, rules = {}) {
		let isValid = true;
		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}
		if (rules.minLength) {
			isValid = value.trim().length >= rules.minLength && isValid;
		}
		if (rules.maxLength) {
			isValid = value.trim().length <= rules.maxLength && isValid;
		}
		
		return isValid;
	}
	
	orderHandler = (e) => {
		e.preventDefault();

		this.setState({loading: true});
		
		const formData= {};
		
		for (let formElement in this.state.orderForm) {
			formData[formElement] = this.state.orderForm[formElement].value;
		}

		const orderData = {ingredients : this.props.ings, price : this.props.price, orderData: formData, deliveryMethod: 'fastest'};
		this.props.performOrder(orderData);
		
		// axios.post('/orders.json', ).then( response => {
		// 	console.log('response', response);
		//
		// 	setTimeout(()=> {
		// 		this.setState({loading: false, purchasing: false});
		// 		this.props.history.push('/');
		// 	}, 3000);
		//
		// }).catch( (error) => {
		// 	console.log('error', error);
		//   	this.setState({loading: false, purchasing: false});
		// });


	};

	render() {

		const form = this.props.loading ? <Spinner/> : <form>
			{this.renderInputs()}
		</form>;

		return(
			<div className={css.ContactData} >
				<h4>Enter Your Contact Data</h4>
				{form}
				<Button buttonType="Success" clicked={this.orderHandler} disabled={!this.state.formIsValid}>ORDER</Button>
			</div>
		);
	}
	
	inputChanged =(event, inputIdentifier) => {
		const updatedForm = {...this.state.orderForm};
		const formElement = {...updatedForm[inputIdentifier]};
		formElement.value = event.target.value;
		formElement.valid = this.checkValidity(formElement.value, formElement.validation);
		formElement.touched = true;
		updatedForm[inputIdentifier] = formElement;
		
		let formIsValid = true;
		for (let key in updatedForm) {
			formIsValid = updatedForm[key].valid && formIsValid;
		}
		
		this.setState({orderForm: updatedForm, formIsValid});
	};
	
	renderInputs() {
		const formElementArray = [];
		for(let key in this.state.orderForm) {
			formElementArray.push({
				id: key,
				config: this.state.orderForm[key]
			})
		}
		
		return (
			formElementArray.map(( formElement => (
				<Input  key={formElement.id}
		                elementType={formElement.config.elementType}
		                elementConfig={formElement.config.elementConfig}
				        changed={(event) => this.inputChanged(event, formElement.id)}
				        invalid={!formElement.config.valid}
				        shouldValidate={formElement.config.validation}
				        touched={formElement.config.touched}
				        value={formElement.config.value}
				/>
			)))
		
		)
	}
}

const mapStateToProps = state => {
	return {
		ings: state.burgerReducer.ingredients,
		price: state.burgerReducer.totalPrice,
		loading: state.orderReducer.loading
	};
};

const mapDispatchToProps = dispatch => {
	return {
		performOrder: orderData => dispatch(actions.orderBurger(orderData))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));