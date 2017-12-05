import React from 'react';

import css from './navigation-item.css';

const navigationItem = (props) => (
    <li className={css.NavigationItem}><a className={props.active ? css.active : null} href={props.link}>{props.children}</a></li>
);

export default navigationItem;