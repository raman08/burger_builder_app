import * as actionTypes from './actionsTypes';
import axios from '../../axios_order';

export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT,
	};
};

export const _purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData: orderData,
	};
};

export const _purchaseBurgerFailed = error => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAILED,
		error: error,
	};
};

export const _purchaseBurgerStart = () => {
	return { type: actionTypes.PURCHASE_BURGER_START };
};

export const purchaseBurger = orderData => {
	console.log(orderData);
	return dispatch => {
		dispatch(_purchaseBurgerStart());
		axios
			.post('/orders.json', orderData)
			.then(response => {
				dispatch(_purchaseBurgerSuccess(response.data.name, orderData));
			})
			.catch(err => {
				dispatch(_purchaseBurgerFailed(err));
			});
	};
};

export const _fetchOrdersSuccess = orders => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders: orders,
	};
};

export const _fetchOrdersFailed = error => {
	return {
		type: actionTypes.FETCH_ORDERS_FAILED,
		error: error,
	};
};

export const _fetchOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START,
	};
};

export const fetchOrders = () => {
	return dispatch => {
		dispatch(_fetchOrdersStart());
		axios
			.get('/orders.json')
			.then(orders => {
				const fetchOrders = [];

				for (let key in orders.data) {
					fetchOrders.push({ id: key, ...orders.data[key] });
				}

				dispatch(_fetchOrdersSuccess(fetchOrders));
			})
			.catch(err => {
				dispatch(_fetchOrdersFailed(err));
			});
	};
};
