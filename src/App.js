import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
	return import('./containers/CheckOut/CheckOut');
});

const asyncAuth = asyncComponent(() => {
	return import('./containers/Auth/Auth');
});

const asyncOrders = asyncComponent(() => {
	return import('./containers/Orders/Orders');
});

class App extends Component {
	componentDidMount() {
		this.props.authTryAutoSignUp();
	}

	render() {
		let routes = (
			<Switch>
				<Route path="/" exact component={BurgerBuilder} />
				<Route path="/auth" component={asyncAuth} />
				<Redirect to="/" />
			</Switch>
		);

		if (this.props.isAuth) {
			routes = (
				<Switch>
					<Route path="/" exact component={BurgerBuilder} />
					<Route path="/checkout" component={asyncCheckout} />
					<Route path="/orders" component={asyncOrders} />
					<Route path="/auth" component={asyncAuth} />
					<Route path="/logout" component={Logout} />
					<Redirect to="/" />
				</Switch>
			);
		}
		return (
			<div id="App">
				<Layout>{routes}</Layout>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuth: state.auth.token != null,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		authTryAutoSignUp: () => dispatch(actions.authCheckState()),
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
