import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import { wrap } from 'module';

test('should render ExpenseForm correctly',()=>{
    const wrapper = shallow(<ExpenseForm/>);
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm with data',()=>{
    const wrapper = shallow(<ExpenseForm expense={expenses[0]}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid ExpenseForm submisson',()=>{
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit',{
        preventDefault:() => { }
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test('should set description on input change',()=>{
    const value = "new description";
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(0).simulate('change',{
        target:{
            value
        }
    });
    expect(wrapper.state('description')).toBe(value);
});

test('should set note on textarea change',()=>{
    const value = "new note";
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('textarea').at(0).simulate('change',{
        target:{
            value
        }
    });
    expect(wrapper.state('note')).toBe(value);
});

test('should set amount on input change',()=>{
    const value = "57.55";
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change',{
        target:{
            value
        }
    });
    expect(wrapper.state('amount')).toBe(value);
});

test('should not set amount on input change for invalid input',()=>{
    const value = "57.5545";
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change',{
        target:{
            value
        }
    });
    expect(wrapper.state('amount')).toBe("");
});

test("should call function onSubmit prop for valid Submission", () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>);
    wrapper.find('form').simulate('submit',{
        preventDefault:() => { }
    });
    expect(wrapper.state('error')).toBe("");
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        createdAt: expenses[0].createdAt,
        note: expenses[0].note
    });
});

test("should set new date on onDateChange", () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop("onDateChange")(now);
    expect(wrapper.state('createdAt')).toBe(now);
});

test("should set calendar focus on change", () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop("onFocusChange")({focused});
    expect(wrapper.state('calendarFocused')).toBe(focused);
});
