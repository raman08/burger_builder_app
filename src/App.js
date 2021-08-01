import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import './App.css';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckOut from './containers/CheckOut/CheckOut';
import Orders from './containers/Orders/Orders';

class App extends Component {
	render() {
		return (
			<div id="App">
				<Layout>
					{/* <BurgerBuilder />
					<CheckOut /> */}
					<Route path="/" exact component={BurgerBuilder} />
					<Route path="/checkout" component={CheckOut} />
					<Route path="/orders" component={Orders} />
				</Layout>
			</div>
		);
	}
}

export default App;
