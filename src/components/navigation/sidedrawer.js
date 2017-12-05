import React from 'react';

import css from './sidedrawer.css';
import Logo from '../logo/logo';
import NavigationItems from './navigation-items';
import Backdrop from '../../components/ui/backdrop/backdrop';
import Aux from '../../hoc/auxilary';

const sideDrawer = (props) => {
  const attachedClasses = [css.SideDrawer, props.open ? css.Open : css.Close];

  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed}/>
      <div className={attachedClasses.join(' ')}>
        <div style={{height: '11%', marginBottom: '32px' }}>
          <Logo/>
        </div>
        <NavigationItems/>
      </div>
    </Aux>
  );
};

export default sideDrawer;