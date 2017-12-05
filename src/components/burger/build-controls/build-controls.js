import React from 'react'
import css from './build-controls.css';

import BuildControl from './build-control/build-control';

const controls = [
	{label: 'Salad', type : 'salad'},
	{label: 'Bacon', type : 'bacon'},
	{label: 'Cheese', type : 'cheese'},
	{label: 'Meat', type : 'meat'},
];


const buildControls = (props) => (
	<div className={css.buildControls}>
		<p>Current price: <strong>${props.price.toFixed(2)}</strong></p>
		{controls.map( ctrl =>  <BuildControl key={ctrl.label} label={ctrl.label} ingredientAdded={()=>props.ingredientAdded(ctrl.type)} ingredientRemoved={()=>props.ingredientRemoved(ctrl.type)} disabled={props.disabledInfo[ctrl.type]}/>)}
		<button className={css.OrderButton}
						disabled={!props.purchasable}
						onClick={props.ordered}
		>ORDER NOW</button>
	</div>
);

export default buildControls;