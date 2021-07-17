import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENTS_PRICE = {
	meat: 0.5,
	salad: 0.1,
	cheese: 0.3,
	bacon: 0.2,
};

class BurgerBuilder extends Component {
	state = {
		ingredints: {
			meat: 0,
			salad: 0,
			cheese: 0,
			bacon: 0,
		},
		totalPrice: 2,
	};

	addIngredientsHandler = type => {
		const newIngredients = { ...this.state.ingredints };
		const newCount = this.state.ingredints[type] + 1;

		newIngredients[type] = newCount;

		const newPrice = this.state.totalPrice + INGREDIENTS_PRICE[type];

		this.setState({ ingredints: newIngredients, totalPrice: newPrice });
	};

	removeIngredientsHandler = type => {
		if (this.state.ingredints[type] <= 0) {
			return;
		}

		const newIngredients = { ...this.state.ingredints };
		const newCount = this.state.ingredints[type] - 1;

		newIngredients[type] = newCount;

		const newPrice = this.state.totalPrice - INGREDIENTS_PRICE[type];

		this.setState({ ingredints: newIngredients, totalPrice: newPrice });
	};

	render() {
		const disabledInfo = {
			...this.state.ingredints,
		};

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		return (
			<>
				<Burger ingredints={this.state.ingredints} />
				<BuildControls
					ingredientAdded={this.addIngredientsHandler}
					ingredientRemoved={this.removeIngredientsHandler}
					disabled={disabledInfo}
					totalPrice={this.state.totalPrice}
				/>
			</>
		);
	}
}

export default BurgerBuilder;
