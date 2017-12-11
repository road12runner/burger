import React from 'react';
import css from './input.css';
const input = (props) => {

	let inputElement = null;
	const inputClasses =[css.InputElement];
	if (props.invalid && props.shouldValidate && props.touched) {
		inputClasses.push(css.invalid);
	}
	switch (props.elementType) {
		case('input'):
			inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} onChange={props.changed} value={props.value}/>;
			break;
		case 'textarea':
			inputElement = <textarea className={inputClasses.join(' ')} {...props.elementConfig} onChange={props.changed} value={props.value}/>;
			break;
		case 'select':
			inputElement = <select className={inputClasses.join(' ')}
			                       value={props.value}
			                       onChange={props.changed}
							>
									{props.elementConfig.options.map(option => (
										<option key={option.value} value={option.value}>{option.displayValue}</option>
									))}
							</select>;
			break;

		default:
			inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} onChange={props.changed} value={props.value}/>;
	}


	return(
		<div className={css.InputElement}>
			<label className={css.Label}>{props.label}</label>
			{inputElement}
		</div>
	)
};


export default input;