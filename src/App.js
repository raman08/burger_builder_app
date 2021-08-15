import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

import './App.css';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckOut from './containers/CheckOut/CheckOut';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {
	componentDidMount() {
		console.log('Mounting');
		this.props.authTryAutoSignUp();
	}

	render() {
		let routes = (
			<Switch>
				<Route path="/" exact component={BurgerBuilder} />
				<Route path="/auth" component={Auth} />
				<Redirect to="/" />
			</Switch>
		);

		if (this.props.isAuth) {
			routes = (
				<Switch>
					<Route path="/" exact component={BurgerBuilder} />
					<Route path="/checkout" component={CheckOut} />
					<Route path="/orders" component={Orders} />
					<Route path="/auth" component={Auth} />
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
