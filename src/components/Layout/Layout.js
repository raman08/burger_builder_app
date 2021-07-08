import React from 'react';

function Layout(props) {
	return (
		<>
			<div>Toolbar Sidedrawe Backdrop</div>
			<main>{props.children}</main>
		</>
	);
}

export default Layout;
