import React, { Component } from 'react';

import Layout from './components/Layout/Layout';
import './App.css';

class App extends Component {
	render() {
		return (
			<div id='App'>
				<Layout>
					<p>This is a test</p>
				</Layout>
			</div>
		);
	}
}

export default App;
