import React, {Component}  from 'react';
import {connect} from 'react-redux';
import Input from '../../components/ui/input/input';
import Button from '../../components/ui/button/button';

import css from './auth.css';
import * as actions from '../../store/actions';

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

		},
		isSignup : true
	};
	
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.onAuthUser(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
		
	};
	
	switchAuthModeHandler = () => {
		this.setState( prevState => {
			return {isSignup: !prevState.isSignup}
		})
	}
	
	render(){
		return(
			<div className={css.AuthData}>
				<form>
					{this.renderInputs()}
					<Button buttonType="Success" clicked={this.handleSubmit}>SUBMIT</Button>
				</form>
				<Button buttonType="Danger" clicked={this.switchAuthModeHandler}>SWITCH TO {!this.state.isSignup ? 'SIGNUP' : 'SIGNIN'}</Button>
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
	
	inputChanged =(event, controlName) => {
		const updatedControls = {
			...this.state.controls,
			[controlName]: {
				...this.state.controls[controlName],
				value: event.target.value,
				valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
				touched: true
			}
		};
		this.setState({controls: updatedControls});
		
		
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

const mapDispatchToProps = dispatch =>{
	return {
		onAuthUser: (email, password, isSignup) => dispatch(actions.authUser(email, password, isSignup))
	}
};

export default connect(null, mapDispatchToProps)(Auth);