import React, { Component } from 'react';

import CheckOutSummery from '../../components/Order/CheckOutSummery/CheckOutSummery';

class CheckOut extends Component {
	state = {
		ingredients: {
			salad: 1,
			meat: 1,
			cheese: 1,
			beacon: 1,
		},
	};

	checkOutCanceledHandler = () => {
		this.props.history.goBack();
	};

	checkOutContinuedHandler = () => {
		this.props.history.replace('/checkout/contact');
	};

	componentDidMount() {
		const query = new URLSearchParams(this.props.location.search);
		const ingredients = {};

		for (let param of query.entries()) {
			ingredients[param[0]] = +param[1];
		}

		this.setState({ ingredients: ingredients });
	}

	render() {
		return (
			<div>
				<CheckOutSummery
					ingredints={this.state.ingredients}
					checkOutCanceled={this.checkOutCanceledHandler}
					checkOutContinued={this.checkOutContinuedHandler}
				/>
			</div>
		);
	}
}

export default CheckOut;
