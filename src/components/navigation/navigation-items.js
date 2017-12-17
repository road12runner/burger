import React from 'react';
import css from './navigation-items.css';
import NavigationItem from './navigation-item';
const navigationItems = () => (
  <nav>
    <ul className={css.NavigationItems}>
        <NavigationItem link="/" >Burger Builder</NavigationItem>
        <NavigationItem link="/orders" >Orders</NavigationItem>
        <NavigationItem link="/auth" >Sign In</NavigationItem>
    </ul>
  </nav>
);

export default navigationItems;