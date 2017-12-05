import React, {Component} from 'react';
import Auxilary from '../../hoc/auxilary';
import cssClasses from './layout.css';

import Toolbar from '../../components/navigation/toolbar/toolbar';
import SideDrawer from '../../components/navigation/sidedrawer';

class Layout extends Component{

	state = {
		showSideDrawer: true
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
				<Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
				<SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosed} />
				<main className={cssClasses.layout}>
          {this.props.children}
				</main>
			</Auxilary>
		)
	}
}




export default Layout;