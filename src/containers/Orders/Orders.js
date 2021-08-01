import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios_order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

export class Orders extends Component {
	state = {
		orders: [],
		loading: true,
	};

	componentDidMount() {
		axios
			.get('/orders.json')
			.then(orders => {
				const fetchOrders = [];

				for (let key in orders.data) {
					fetchOrders.push({ id: key, ...orders.data[key] });
				}

				console.log(fetchOrders);
				this.setState({ loading: false, orders: fetchOrders });
			})
			.catch(err => {
				console.log(err);
				this.setState({ loading: false });
			});
	}

	render() {
		return (
			<div>
				{this.state.orders.map(order => (
					<Order
						ingredients={order.ingredients}
						price={+order.price}
						key={order.id}
					/>
				))}
			</div>
		);
	}
}

export default withErrorHandler(Orders, axios);
