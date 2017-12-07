import React from 'react';
import css from './order.css'
const order = (props) => {
	return (
		<div className={css.Order}>
			<p>Ingredients: Salad(1), Meat(2)</p>
			<p>Price: <strong>$ 5.45</strong></p>
		</div>
	)
};


export default order;