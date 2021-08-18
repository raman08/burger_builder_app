import reducer from './auth';
import * as actionTypes from '../actions/actionsTypes';

describe('auth reducer', () => {
	it('should return initial state', () => {
		expect(reducer(undefined, {})).toEqual({
			token: null,
			userId: null,
			error: null,
			loading: null,
			authRedirect: '/',
		});
	});
	it('should store token upon login', () => {
		expect(
			reducer(
				{
					token: null,
					userId: null,
					error: null,
					loading: null,
					authRedirect: '/',
				},
				{
					type: actionTypes.AUTH_SUCCESS,
					idToken: 'some-token',
					userId: 'some-user-id',
				}
			)
		).toEqual({
			token: 'some-token',
			userId: 'some-user-id',
			error: null,
			loading: false,
			authRedirect: '/',
		});
	});
});
