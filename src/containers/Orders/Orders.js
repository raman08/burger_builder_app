import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios_order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as orderActions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

export class Orders extends Component {
	componentDidMount() {
		this.props.onFetchOrder(this.props.token, this.props.userId);
	}

	render() {
		let orders = <Spinner />;

		if (!this.props.loading) {
			orders = (
				<div>
					{this.props.orders.map(order => (
						<Order
							ingredients={order.ingredients}
							price={+order.price}
							key={order.id}
						/>
					))}
				</div>
			);
		}
		return orders;
	}
}

const mapStateToProps = state => {
	return {
		orders: state.order.orders,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchOrder: (token, userId) =>
			dispatch(orderActions.fetchOrders(token, userId)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(Orders, axios));
