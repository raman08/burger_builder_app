import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

function SideDrawer(props) {
	let sideDrawerClasses = [classes.SideDrawer, classes.Close];

	if (props.open) {
		sideDrawerClasses = [classes.SideDrawer, classes.Open];
	}

	return (
		<>
			<Backdrop show={props.open} clicked={props.closed} />
			<div className={sideDrawerClasses.join(' ')} onClick={props.closed}>
				<div className={classes.Logo}>
					<Logo />
				</div>
				<nav>
					<NavigationItems isAuth={props.isAuth} />
				</nav>
			</div>
		</>
	);
}

export default SideDrawer;
