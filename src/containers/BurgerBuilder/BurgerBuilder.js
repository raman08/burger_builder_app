import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';

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
		purchasable: false,
		purchasing: false,
	};

	updatePurchaseState(ingredints) {
		const sum = Object.keys(ingredints)
			.map(key => {
				return ingredints[key];
			})
			.reduce((newSum, el) => {
				return newSum + el;
			}, 0);

		this.setState({ purchasable: sum > 0 });
	}

	addIngredientsHandler = type => {
		const newIngredients = { ...this.state.ingredints };
		const newCount = this.state.ingredints[type] + 1;

		newIngredients[type] = newCount;

		const newPrice = this.state.totalPrice + INGREDIENTS_PRICE[type];

		this.setState({ ingredints: newIngredients, totalPrice: newPrice });
		this.updatePurchaseState(newIngredients);
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

		this.updatePurchaseState(newIngredients);
	};

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	};

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => {
		alert('Ordered');
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
				<Modal
					show={this.state.purchasing}
					modalClosed={this.purchaseCancelHandler}
				>
					<OrderSummery
						ingredients={this.state.ingredints}
						totalPrice={this.state.totalPrice}
						purchasedCancelled={this.purchaseCancelHandler}
						purchaseContinued={this.purchaseContinueHandler}
					/>
				</Modal>

				<Burger ingredints={this.state.ingredints} />

				<BuildControls
					ingredientAdded={this.addIngredientsHandler}
					ingredientRemoved={this.removeIngredientsHandler}
					disabled={disabledInfo}
					totalPrice={this.state.totalPrice}
					purchasable={this.state.purchasable}
					ordering={this.purchaseHandler}
				/>
			</>
		);
	}
}

export default BurgerBuilder;
