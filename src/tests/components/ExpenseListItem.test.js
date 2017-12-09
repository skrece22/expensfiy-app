import React from 'React';
import { shallow } from 'enzyme';
import ExpenseListItem  from '../../components/ExpenseListItem';
import expenses from '../fixtures/expenses';

test('should render expenses list item with correct data',() =>{
    const wrapper = shallow(<ExpenseListItem {...expenses[0]}/>);
    expect(wrapper).toMatchSnapshot();
});