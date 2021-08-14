import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

export class Layout extends Component {
	state = {
		showSideDrawer: false,
	};

	sideDrawerClosedHandler = () => {
		this.setState({ showSideDrawer: true });
	};

	sideDrawerToggleHandler = () => {
		this.setState(prevState => {
			return { showSideDrawer: !prevState.showSideDrawer };
		});
	};

	render() {
		return (
			<>
				<Toolbar
					isAuth={this.props.isAuth}
					drawerToggleClicked={this.sideDrawerToggleHandler}
				/>
				<SideDrawer
					isAuth={this.props.isAuth}
					open={this.state.showSideDrawer}
					closed={this.sideDrawerToggleHandler}
				/>
				<main className={classes.content}>{this.props.children}</main>
			</>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuth: state.auth.token != null,
	};
};

export default connect(mapStateToProps)(Layout);
