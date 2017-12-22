import React from 'react';

import css from './toolbar.css';
import Logo from '../../logo/logo';

import NavigationItems from '../navigation-items';
import DrawerToggle from '../drawer-toggle';

const toolbar = (props) => (
  <header className={css.Toolbar}>
    <DrawerToggle clicked={props.drawerToggleClicked}/>
    <div style={{height: '80%'}}>
      <Logo/>
    </div>

    <div className={css.DesktopOnly}>
      <NavigationItems isAuthenticated={props.isAuthenticated} />
    </div>
  </header>
);

export default toolbar;