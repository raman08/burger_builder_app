import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import axios from '../../axios_order';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENTS_PRICE = {
	meat: 0.5,
	salad: 0.1,
	cheese: 0.3,
	bacon: 0.2,
};

class BurgerBuilder extends Component {
	state = {
		ingredients: null,
		totalPrice: 2,
		purchasable: false,
		purchasing: false,
		loading: false,
		error: false,
	};

	componentDidMount() {
		axios
			.get('/ingredients.json')
			.then(response => {
				this.setState({ ingredients: response.data });
			})
			.catch(err => {
				this.setState({ error: true });
			});
	}

	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients)
			.map(key => {
				return ingredients[key];
			})
			.reduce((newSum, el) => {
				return newSum + el;
			}, 0);

		this.setState({ purchasable: sum > 0 });
	}

	addIngredientsHandler = type => {
		const newIngredients = { ...this.state.ingredients };
		const newCount = this.state.ingredients[type] + 1;

		newIngredients[type] = newCount;

		const newPrice = this.state.totalPrice + INGREDIENTS_PRICE[type];

		this.setState({ ingredients: newIngredients, totalPrice: newPrice });
		this.updatePurchaseState(newIngredients);
	};

	removeIngredientsHandler = type => {
		if (this.state.ingredients[type] <= 0) {
			return;
		}

		const newIngredients = { ...this.state.ingredients };
		const newCount = this.state.ingredients[type] - 1;

		newIngredients[type] = newCount;

		const newPrice = this.state.totalPrice - INGREDIENTS_PRICE[type];

		this.setState({ ingredients: newIngredients, totalPrice: newPrice });

		this.updatePurchaseState(newIngredients);
	};

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	};

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => {
		const query = [];

		for (let ing in this.state.ingredients) {
			query.push(
				`${encodeURIComponent(ing)}=${encodeURIComponent(
					this.state.ingredients[ing]
				)}`
			);
		}
		query.push(`price=${encodeURIComponent(this.state.totalPrice)}`);

		const queryString = query.join('&');

		this.props.history.push({
			pathname: '/checkout',
			search: `?${queryString}`,
		});
	};

	render() {
		const disabledInfo = {
			...this.state.ingredients,
		};

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSumery = <Spinner />;

		let burger = this.state.error ? (
			<p>Ingredients Can't Be Loaded</p>
		) : (
			<Spinner />
		);

		if (this.state.ingredients) {
			burger = (
				<>
					<Burger ingredients={this.state.ingredients} />

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

			orderSumery = (
				<OrderSummery
					ingredients={this.state.ingredients}
					totalPrice={this.state.totalPrice}
					purchasedCancelled={this.purchaseCancelHandler}
					purchaseContinued={this.purchaseContinueHandler}
				/>
			);
		}

		if (this.state.loading) {
			orderSumery = <Spinner />;
		}

		return (
			<>
				<Modal
					show={this.state.purchasing}
					modalClosed={this.purchaseCancelHandler}
				>
					{orderSumery}
				</Modal>

				{burger}
			</>
		);
	}
}

export default withErrorHandler(BurgerBuilder, axios);
