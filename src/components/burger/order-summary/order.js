import React from 'react';
import css from './order.css'
const order = (props) => {

	Object.keys(props.ingredients).map()

	return (
		<div className={css.Order}>
			<p>Ingredients: Salad(1), Meat(2)</p>
			<p>Price: <strong>$ {props.price}</strong></p>
		</div>
	)
};


export default order;