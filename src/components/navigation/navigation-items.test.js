import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './navigation-items';
import NavigationItem from './navigation-item';

configure({adapter: new Adapter()});

describe('<Navigation Items/>', () => {
	let wrapper;
	beforeEach(()=> {
		wrapper = shallow(<NavigationItems/>);
	});
	
	it('should render 2 nav items by default', () => {
		expect(wrapper.find(NavigationItem)).toHaveLength(2);
	});
	
	it('should render 3 nav items after authentication', () => {
		//const wrapper = shallow(<NavigationItems isAuthenticated/>);
		wrapper.setProps({isAuthenticated: true});
		expect(wrapper.find(NavigationItem)).toHaveLength(3);
	});
	
	it('should contain logout item after authentication', () => {
		//const wrapper = shallow(<NavigationItems isAuthenticated/>);
		wrapper.setProps({isAuthenticated: true});
		expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
	});
	
});