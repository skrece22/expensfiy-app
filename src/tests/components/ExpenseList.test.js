import React from 'React';
import { shallow } from 'enzyme';
import { ExpenseList } from '../../components/ExpenseList';
import expenses from '../fixtures/expenses';

test('should render expenses list with correct data',() =>{
    const wrapper = shallow(<ExpenseList expenses={expenses}/>);
    expect(wrapper).toMatchSnapshot();
});


test('should render expenses list with empty expenses',() =>{
    const wrapper = shallow(<ExpenseList expenses={[]}/>);
    expect(wrapper).toMatchSnapshot();
});
