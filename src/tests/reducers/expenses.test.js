import expensesReducer from '../../reducers/expenses';
import expenses from  '../fixtures/expenses';

test('should set a default state',() => {
    const state = expensesReducer(undefined, { type:'@@INIT' });
    expect(state).toEqual([]);
});

test('should remove expense by id',() => {
    const action = {
        type:'REMOVE_EXPENSE',
        id:expenses[1].id
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0],expenses[2]]);
});

test('should not remove expense if id not found',() => {
    const action = {
        type:'REMOVE_EXPENSE',
        id:'5'
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('should add an expense',() => {
    const expense = {
        id:'4',
        description:'coffee',
        note : '',
        amount :550,
        createdAt: 2546546
    }
    const action = {
        type:'ADD_EXPENSE',
        expense
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([ ...expenses , expense]);
});

test('should edit an expense',() => {
    const amount = 200;
    const action = {
        type:'EDIT_EXPENSE',
        id:expenses[0].id,
        updates:{
            amount
        }
    }
    const state = expensesReducer(expenses, action);
    expect(state[0].amount).toBe(amount);
});

test('should not edit an expense',() => {
    const updates = {
        amount:200 
    }
    const action = {
        type:'EDIT_EXPENSE',
        id:'66',
        updates
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test("should set expenses",() => {
    const action = {
        type: 'SET_EXPENSES',
        expenses: [expenses[1]]
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[1]]);
});