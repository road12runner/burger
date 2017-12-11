import React from 'react';
import css from './order.css'
const order = (props) => {


	const ingredients = Object.keys(props.ingredients).map( objKey => {
		const val = props.ingredients[objKey];
		const text = `${objKey}(${val})`;

		 return <span key={objKey} style={{ textTransform: 'capitalize', display: 'inline-block', margin: '0 8px', padding: '5px', border: '1px solid #ccc'}}>{text}</span>
	});

	const price = props.price || 0;

	return (
		<div className={css.Order}>
			<p>Ingredients: {ingredients}</p>
			<p>Price: <strong>$ {price.toFixed(2)}</strong></p>
		</div>
	)
};


export default order;