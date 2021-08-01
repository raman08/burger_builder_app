import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckOutSummery from '../../components/Order/CheckOutSummery/CheckOutSummery';
import ContactData from '../ContactData/ContactData';

class CheckOut extends Component {
	state = {
		ingredients: null,
		price: 0,
	};

	checkOutCanceledHandler = () => {
		this.props.history.goBack();
	};

	checkOutContinuedHandler = () => {
		this.props.history.replace('/checkout/contact');
	};

	componentWillMount() {
		const query = new URLSearchParams(this.props.location.search);
		const ingredients = {};
		let price = 0;

		for (let param of query.entries()) {
			console.log(param);
			if (param[0] === 'price') {
				price = +param[1];
				this.setState({ price: price });
				console.log(this.state);
			} else {
				ingredients[param[0]] = +param[1];
			}
		}

		this.setState({ ingredients: ingredients });
	}

	render() {
		return (
			<div>
				<CheckOutSummery
					ingredients={this.state.ingredients}
					checkOutCanceled={this.checkOutCanceledHandler}
					checkOutContinued={this.checkOutContinuedHandler}
				/>
				<Route
					path={`${this.props.match.url}/contact`}
					render={props => (
						<ContactData
							ingredients={this.state.ingredients}
							price={this.state.price}
							{...props}
						/>
					)}
				/>
			</div>
		);
	}
}

export default CheckOut;
