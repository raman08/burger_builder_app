import * as actionTypes from './actionsTypes';
import axios from '../../axios_order';

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
	return dispatch => {
		dispatch(_purchaseBurgerStart());
		axios
			.post('/orders.json', orderData)
			.then(response => {
				dispatch(_purchaseBurgerSuccess(response.data, orderData));
			})
			.catch(err => {
				dispatch(_purchaseBurgerFailed(err));
			});
	};
};
