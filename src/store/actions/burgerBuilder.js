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
		type: actionTypes.SET_INGREDIENTS,
		ingredients: ingredients,
	};
};

const _fetchIngredientsFailed = () => {
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAILED,
	};
};

export const initIngredients = () => {
	return dispatch => {
		axios
			.get(
				'https://burger-builder-b0ca0-default-rtdb.firebaseio.com/ingredients.json'
			)
			.then(response => {
				dispatch(_setIngredients(response.data));
			})
			.catch(err => {
				dispatch(_fetchIngredientsFailed());
			});
	};
};
