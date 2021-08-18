import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/BuildControls/BuildControls';

configure({ adapter: new Adapter() });

describe('<BurgerBuilder />', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />);
	});

	it('Should render <BuildControls /> when receiving ingredients', () => {
		wrapper.setProps({ ingredients: { meat: 0, cheese: 0 } });
		expect(wrapper.find(BuildControls)).toHaveLength(1);
	});
});
