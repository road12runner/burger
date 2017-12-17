import React, {Component}  from 'react';

import Input from '../../components/ui/input/input';
import Button from '../../components/ui/button/button';

import css from './auth.css';

class Auth extends Component {
	state ={
		controls : 	{
			email: {
				elementType: 'input',
				elementConfig: {
					type: "email",
					placeholder: 'Your Email'
				},
				value: '',
				validation: {
					required: true,
					isEmail: true
				},
				valid: false,
				touched: false
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: "password",
					placeholder: 'Password'
				},
				value: '',
				validation: {
					required: true,
					minLength: 6,
				},
				valid: false,
				touched: false
			},

		}
	};
	render(){
		return(
			<div className={css.AuthData}>
				<form>
					{this.renderInputs()}
					<Button buttonType="Success">SUBMIT</Button>
				</form>
			</div>
		)
	}
	
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
	
	inputChanged =(event, inputIdentifier) => {
		const updatedForm = {...this.state.controls};
		const formElement = {...updatedForm[inputIdentifier]};
		formElement.value = event.target.value;
		formElement.valid = this.checkValidity(formElement.value, formElement.validation);
		formElement.touched = true;
		updatedForm[inputIdentifier] = formElement;
		
		let formIsValid = true;
		for (let key in updatedForm) {
			formIsValid = updatedForm[key].valid && formIsValid;
		}
		
		this.setState({controls: updatedForm, formIsValid});
	};
	renderInputs() {
		const formElementArray = [];
		for(let key in this.state.controls) {
			formElementArray.push({
				id: key,
				config: this.state.controls[key]
			})
		}
		
		return  formElementArray.map(( formElement => (
			<Input  key={formElement.id}
			        elementType={formElement.config.elementType}
			        elementConfig={formElement.config.elementConfig}
			        changed={(event) => this.inputChanged(event, formElement.id)}
			        invalid={!formElement.config.valid}
			        shouldValidate={formElement.config.validation}
			        touched={formElement.config.touched}
			        value={formElement.config.value}
			/>
		)));
		
	}
	
}

export default Auth