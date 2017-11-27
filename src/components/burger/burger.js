import React from 'react';
import BurgerIngredient from './burger-ingredient/burger-ingredient';
import cssClasses from './burger.css';

const burger = (props) => {
	const  ingredients = Object.keys(props.ingredients).map( (key) => {
		return [... Array(props.ingredients[key])].map( (_, i) => {
				return <BurgerIngredient key={key + i} type={key} />
			} 
			
		)
	});
	console.log(ingredients);
	return (
		<div className={cssClasses.Burger}>
			<BurgerIngredient type="bread-top"/>
			{ingredients}
			<BurgerIngredient type="bread-bottom"/>
		</div>
	)
};

export default burger;