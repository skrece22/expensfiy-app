import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';

test("should render expenses with one expense", ()=>{
    const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={6045}/>);
    expect(wrapper).toMatchSnapshot();
});

test("should render expenses with mulitiple expenses", () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={2} expensesTotal={1246025} />);
    expect(wrapper).toMatchSnapshot();
});