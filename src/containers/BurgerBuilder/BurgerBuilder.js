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
		ingredints: null,
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
				this.setState({ ingredints: response.data });
			})
			.catch(err => {
				this.setState({ error: true });
			});
	}

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
		// this.setState({ loading: true });
		// // alert('Ordered');
		// const order = {
		// 	ingredients: this.state.ingredints,
		// 	price: this.state.totalPrice,
		// 	customer: {
		// 		name: 'Raman',
		// 		address: {
		// 			street: 'Test Street',
		// 			zipCode: '35433',
		// 			country: 'IN',
		// 		},
		// 		email: 'test@test.com',
		// 		phoneNo: '+917558866223',
		// 	},
		// 	dileveryMethod: 'Fastest',
		// };
		// axios
		// 	.post('/orders.json', order)
		// 	.then(response => {
		// 		this.setState({ loading: false, purchasing: false });
		// 	})
		// 	.catch(err => {
		// 		this.setState({ loading: false, purchasing: false });
		// 	});

		const query = [];
		for (let ing in this.state.ingredints) {
			query.push(
				`${encodeURIComponent(ing)}=${encodeURIComponent(
					this.state.ingredints[ing]
				)}`
			);
		}

		const queryString = query.join('&');
		this.props.history.push({
			pathname: '/checkout',
			search: `?${queryString}`,
		});
	};

	render() {
		const disabledInfo = {
			...this.state.ingredints,
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

		if (this.state.ingredints) {
			burger = (
				<>
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

			orderSumery = (
				<OrderSummery
					ingredients={this.state.ingredints}
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
