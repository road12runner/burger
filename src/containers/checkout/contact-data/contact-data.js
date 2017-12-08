import React, {Component} from 'react';
import Button from '../../../components/ui/button/button';
import Spinner from '../../../components/ui/spinner/spinner';
import Input from '../../../components/ui/input/input';

import css from './contact-data.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
	state = {
		name: {
			elementType: 'input',
			elementConfig: {
				type: "text",
				placeholder: 'Your Name'
			},
			value: ''
		},
		email: {
			elementType: 'input',
			elementConfig: {
				type: "email",
				placeholder: 'Your Email'
			},
			value: ''
		},
		address: {
			street: {
				elementType: 'input',
				elementConfig: {
					type: "text",
					placeholder: 'Address'
				},
				value: ''
			},
			postalCode: {
				elementType: 'input',
				elementConfig: {
					type: "text",
					placeholder: 'Zip Code'
				},
				value: ''
			}
		},
		loading: false
	};

	orderHandler = (e) => {
		e.preventDefault();

		this.setState({loading: true});

		axios.post('/orders.json', {ingredients : this.props.ingredients, price : this.props.price, customer : {
			name: this.state.name, address: this.state.address.street, zipCode: this.state.address.postalCode, email: this.state.email
		}, deliveryMethod: 'fastest'}).then( response => {
			console.log('response', response);

			setTimeout(()=> {
				this.setState({loading: false, purchasing: false});
				this.props.history.push('/');
			}, 3000);

		}).catch( (error) => {
			console.log('error', error);
		  	this.setState({loading: false, purchasing: false});
		});


	};

	render() {

		const form = this.state.loading ? <Spinner/> : <form>
			<Input inputtype="input" type="text" name="name"  placeholder="Your Name"/>
			<Input inputtype="input" type="email" name="email" placeholder="Email"/>
			<Input inputtype="input" type="text" name="street" placeholder="Address"/>
			<Input inputtype="input" type="text" name="postal" placeholder="Postal Code"/>
		</form>;

		return(
			<div className={css.ContactData}>
				<h4>Enter Your Contact Data</h4>
				{form}
				<Button buttonType="Success" clicked={this.orderHandler}>ORDER</Button>
			</div>
		);
	}
}

export default ContactData;