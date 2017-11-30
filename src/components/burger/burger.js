import React from 'react';
import BurgerIngredient from './burger-ingredient/burger-ingredient';
import cssClasses from './burger.css';

const burger = (props) => {
	let  ingredients = Object.keys(props.ingredients).map( (key) => {
		return [...Array(props.ingredients[key])].map( (_, i) => {
				return <BurgerIngredient key={key + i} type={key} />
			} 
			
		)
	}).reduce((arr, el) => {
		return arr.concat(el);
	}, []);
	console.log(ingredients);
	if (ingredients.length === 0) {
		ingredients = <p>Add an ingredient</p>
	}
	return (
		<div className={cssClasses.Burger}>
			<BurgerIngredient type="bread-top"/>
			{ingredients}
			<BurgerIngredient type="bread-bottom"/>
		</div>
	)
};

export default burger;