import React from 'react'

import css from './button.css';

const button = (props) => (
  <button className={[css.Button, css[props.buttonType]].join(' ')} onClick={props.clicked}>{props.children}</button>
);

export default button;