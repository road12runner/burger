import React, {Component} from 'react';

import Auxilary from '../../hoc/auxilary';
import Burger from '../../components/burger/burger'

class BurgerBuilder extends Component{
	state = {
		ingredients: {
			salad: 1,
			bacon: 1,
			cheese: 2,
			meat: 2
		}
	};

	render() {
		return(
			<Auxilary>
				<Burger ingredients={this.state.ingredients}/>
				<div>Build Controls</div>
			</Auxilary>
		)
	}
}

export default BurgerBuilder;