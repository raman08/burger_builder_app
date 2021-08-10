import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import axios from '../../axios_order';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as burgerBuilderActions from '../../store/actions/index';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class BurgerBuilder extends Component {
	state = {
		purchasing: false,
	};

	componentDidMount() {
		console.log('calling mount');
		this.props.onInitIngredients();
	}

	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients)
			.map(key => {
				return ingredients[key];
			})
			.reduce((newSum, el) => {
				return newSum + el;
			}, 0);

		return sum > 0;
	}

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	};

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => {
		this.props.history.push('/checkout');
	};

	render() {
		const disabledInfo = {
			...this.props.ingredients,
		};

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSumery = <Spinner />;

		let burger = this.props.error ? (
			<p>Ingredients Can't Be Loaded</p>
		) : (
			<Spinner />
		);

		if (this.props.ingredients) {
			burger = (
				<>
					<Burger ingredients={this.props.ingredients} />

					<BuildControls
						ingredientAdded={this.props.onIngredientsAdded}
						ingredientRemoved={this.props.onIngredientsRemoved}
						disabled={disabledInfo}
						totalPrice={this.props.totalPrice}
						purchasable={this.updatePurchaseState(
							this.props.ingredients
						)}
						ordering={this.purchaseHandler}
					/>
				</>
			);

			orderSumery = (
				<OrderSummery
					ingredients={this.props.ingredients}
					totalPrice={this.props.totalPrice}
					purchasedCancelled={this.purchaseCancelHandler}
					purchaseContinued={this.purchaseContinueHandler}
				/>
			);
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

const mapStateToProps = state => {
	return {
		ingredients: state.ingredients,
		totalPrice: state.totalPrice,
		error: state.error,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onInitIngredients: () => {
			console.log('dispatching');
			dispatch(burgerBuilderActions.initIngredients);
		},
		onIngredientsAdded: ingName =>
			dispatch(burgerBuilderActions.addIngredient(ingName)),
		onIngredientsRemoved: ingName =>
			dispatch(burgerBuilderActions.removeIngredient(ingName)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
