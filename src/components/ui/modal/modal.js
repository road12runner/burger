import React, {Component} from 'react'

import css from './modal.css';
import Aux from '../../../hoc/auxilary';
import Backdrop from '../backdrop/backdrop';

class Modal  extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }
  componentWillUpdate() {
    console.log('Modal.componentWillUpdate');
  }

  render() {
    const props = this.props;
    return (
      <Aux>
        <Backdrop show={props.show} clicked={props.modalClosed}/>
        <div className={css.Modal}
             style={{
               transform: props.show? 'translateY(0)' : 'translateY(-100vh)',
               opacity: props.show? '1' : '0'
             }}>
          {props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;