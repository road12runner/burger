import React, {Component} from 'react';
import Modal from '../components/ui/modal/modal';
import Aux from './auxilary';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    componentWillMount(){
      this.reqIntercetor = axios.interceptors.request.use( req=> {
        this.setState({error: null});
        return req;
      });

      this.resIntercetor =  axios.interceptors.response.use(res => res, error => {
        this.setState({error})
      });
    }

    componentWillUnmount(){
      axios.interceptors.request.eject(this.reqIntercetor);
      axios.interceptors.response.eject(this.resIntercetor);
    }

    errorConfirmed = () => {
      this.setState({error: null});
    };

    render(){
      return(
        <Aux>
          <Modal show={this.state.error !== null} modalClosed={this.errorConfirmed}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props}/>
        </Aux>
      )
  }
  }
};

export default withErrorHandler;