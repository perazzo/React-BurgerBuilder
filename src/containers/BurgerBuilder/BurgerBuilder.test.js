import { BurgerBuilder } from './BurgerBuilder';
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()});

// First arg is description
// Second is test function
describe('<BurgerBuilder />', () => {
    let wrapper;

    beforeEach( () => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>)
    });

    it('should render Build Controls when receive ingredients', () => {
        wrapper.setProps({
            ings: {
                salad: 0
            }
        });
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});