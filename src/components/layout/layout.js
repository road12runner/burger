import React, {Component} from 'react';
import {connect} from 'react-redux';
import Auxilary from '../../hoc/auxilary';
import cssClasses from './layout.css';

import Toolbar from '../../components/navigation/toolbar/toolbar';
import SideDrawer from '../../components/navigation/sidedrawer';

class Layout extends Component{

	state = {
		showSideDrawer: false
	};

	sideDrawerClosed = () => {
		this.setState({showSideDrawer: false});
	};

	sideDrawerToggleHandler = () => {
		this.setState((prevState) => {
			return {showSideDrawer: !prevState.showSideDrawer}
		});
	};

	render(){
		return (
			<Auxilary>
				<Toolbar isAuthenticated={this.props.isAuthenticated} drawerToggleClicked={this.sideDrawerToggleHandler}/>
				<SideDrawer isAuthenticated={this.props.isAuthenticated}  open={this.state.showSideDrawer} closed={this.sideDrawerClosed} />
				<main className={cssClasses.layout}>
          {this.props.children}
				</main>
			</Auxilary>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.authReducer.token !== null
	}
}


export default connect(mapStateToProps)(Layout);