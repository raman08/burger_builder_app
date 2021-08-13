import * as actionTypes from './actionsTypes';
import axios from 'axios';

export const _authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

export const _authSuccess = (token, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken: token,
		userId,
	};
};

export const _authFailed = error => {
	return {
		type: actionTypes.AUTH_FAILED,
		error: error,
	};
};

export const _logOut = () => {
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export const _checkAuthTimeout = expTime => {
	return dispatch => {
		setTimeout(() => {
			dispatch(_logOut());
		}, expTime * 1000);
	};
};

export const auth = (email, password, isSignup) => {
	return dispatch => {
		dispatch(_authStart());

		const authData = {
			email: email,
			password: password,
			returnSecureToken: true,
		};

		let url =
			'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBz8V_oWzefW7ZrTX_2UROanTY_IFAOFuQ';

		if (!isSignup) {
			url =
				'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBz8V_oWzefW7ZrTX_2UROanTY_IFAOFuQ';
		}

		axios
			.post(url, authData)
			.then(response => {
				console.log(response);
				dispatch(
					_authSuccess(response.data.idToken, response.data.localId)
				);
				dispatch(_checkAuthTimeout(response.data.expiresIn));
			})
			.catch(err => {
				console.log(err);
				dispatch(_authFailed(err.response.data.error));
			});
	};
};
