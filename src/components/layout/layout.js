import React from 'react';
import Auxilary from '../../hoc/auxilary';
import cssClasses from './layout.css';

const layout = (props) => (
	<Auxilary>
		<div>ToolBar SideDrawer, Backdrop</div>
		<main className={cssClasses.layout}>
			{props.children}
		</main>
	</Auxilary>
);

export default layout;