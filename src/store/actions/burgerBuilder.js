import * as actionTypes from './actionsTypes';
import axios from '../../axios_order';

export const addIngredient = ingName => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		ingredientName: ingName,
	};
};

export const removeIngredient = ingName => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingredientName: ingName,
	};
};

const _setIngredients = ingredients => {
	return {
		action: actionTypes.SET_INGREDIENTS,
		ingredients: ingredients,
	};
};

const _fetchIngredientsFailed = () => {
	return {
		action: actionTypes.FETCH_INGREDIENTS_FAILED,
	};
};

export const initIngredients = () => {
	const request = axios.get(
		'https://burger-builder-b0ca0-default-rtdb.firebaseio.com/ingredients.json'
	);

	console.log('Sending Request', request);

	const dd = dispatch => {
		console.log('Calling Inside Axios');
		request
			.then(response => {
				console.log(response);
				dispatch(_setIngredients(response.data));
			})
			.catch(err => {
				console.log(err);
				dispatch(_fetchIngredientsFailed());
			});
		console.log('After axios');
	};

	return dd;
};
