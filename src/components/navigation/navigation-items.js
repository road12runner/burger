import React from 'react';
import css from './navigation-items.css';
import NavigationItem from './navigation-item';
const navigationItems = () => (
  <nav>
    <ul className={css.NavigationItems}>
      <NavigationItem link="/" active>Burger Builder</NavigationItem>
      <NavigationItem link="/" >Checkout</NavigationItem>
    </ul>
  </nav>
);

export default navigationItems;