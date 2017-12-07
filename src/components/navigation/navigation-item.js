import React from 'react';
import {NavLink} from 'react-router-dom';

import css from './navigation-item.css';

const navigationItem = (props) => (
    <li className={css.NavigationItem}>
      <NavLink activeClassName={css.active}  exact to={props.link}>{props.children}</NavLink>
    </li>
);

export default navigationItem;