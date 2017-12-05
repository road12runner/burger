import React from 'react';

import css from './logo.css';
import burgerLogo from '../../assets/images/burger-logo.png';

const logo = (props) => (
  <div className={css.Logo} style={{height: props.height}}>
    <img src={burgerLogo}  alt='My Burger'/>
  </div>
);

export default logo;