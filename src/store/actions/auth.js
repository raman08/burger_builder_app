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

export const logOut = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('expirationDate');
	localStorage.removeItem('userId');
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export const _checkAuthTimeout = expTime => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logOut());
		}, expTime * 1000);
	};
};

export const setAuthRedirectPath = path => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path: path,
	};
};

export const authCheckState = () => {
	return dispatch => {
		const token = localStorage.getItem('token');
		if (!token) {
			dispatch(logOut());
		} else {
			const expirationDate = new Date(
				localStorage.getItem('expirationDate')
			);
			if (expirationDate < new Date()) {
				dispatch(logOut());
			} else {
				const localId = localStorage.getItem('userId');
				dispatch(_authSuccess(token, localId));
				dispatch(
					_checkAuthTimeout(
						(expirationDate.getTime() - new Date().getTime()) / 1000
					)
				);
			}
		}
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
				const expirationDate = new Date(
					new Date().getTime() + response.data.expiresIn * 1000
				);

				localStorage.setItem('token', response.data.idToken);
				localStorage.setItem('expirationDate', expirationDate);
				localStorage.setItem('userId', response.data.localId);

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
