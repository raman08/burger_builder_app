import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<NavigationItems />);
	});

	it('Should render 2 <NavigationItem /> elements when not authenticated', () => {
		expect(wrapper.find(NavigationItem)).toHaveLength(2);
	});

	it('Should render 3 <NavigationItem /> elements when authenticated', () => {
		wrapper.setProps({ isAuth: true });
		expect(wrapper.find(NavigationItem)).toHaveLength(3);
	});

	it('Should have logout button when authenticated', () => {
		wrapper.setProps({ isAuth: true });
		expect(
			wrapper.contains(
				<NavigationItem href="/logout">Logout</NavigationItem>
			)
		).toEqual(true);
	});
});
