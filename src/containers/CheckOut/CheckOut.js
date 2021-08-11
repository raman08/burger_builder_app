import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckOutSummery from '../../components/Order/CheckOutSummery/CheckOutSummery';
import ContactData from '../ContactData/ContactData';

class CheckOut extends Component {
	checkOutCanceledHandler = () => {
		this.props.history.goBack();
	};

	checkOutContinuedHandler = () => {
		this.props.history.replace('/checkout/contact');
	};

	render() {
		let summery = <Redirect to="/" />;
		if (this.props.ingredients) {
			summery = (
				<div>
					<CheckOutSummery
						ingredients={this.props.ingredients}
						checkOutCanceled={this.checkOutCanceledHandler}
						checkOutContinued={this.checkOutContinuedHandler}
					/>
					<Route
						path={`${this.props.match.url}/contact`}
						component={ContactData}
					/>
				</div>
			);
		}
		return summery;
	}
}

const mapStateToProps = state => {
	return {
		ingredients: state.ingredients,
		totalPrice: state.totalPrice,
	};
};

export default connect(mapStateToProps)(CheckOut);
