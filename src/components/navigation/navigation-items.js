import React from 'react'
import css from './navigation-items.css'
import NavigationItem from './navigation-item'

const navigationItems = (props) => (
	<nav>
		<ul className={css.NavigationItems}>
			<NavigationItem link="/">Burger Builder</NavigationItem>
			{props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
			{props.isAuthenticated ? <NavigationItem link="/logout">Logout</NavigationItem> : <NavigationItem link="/auth">Sign In</NavigationItem>}

		</ul>
	</nav>
)

export default navigationItems