import React from 'react'
import css from './build-control.css';

const buildControl = (props) => (
	<div className={css.buildControl}>
		<div className={css.Label}>{props.label}</div>
		<button className={css.Less} onClick={props.ingredientRemoved} disabled={props.disabled}>Less</button>
		<button className={css.More} onClick={props.ingredientAdded}>More</button>
	</div>
);

export default buildControl;