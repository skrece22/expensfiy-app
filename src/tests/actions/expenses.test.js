import uuid from 'uuid';
import { removeExpense, editExpense, addExpense } from "../../actions/expenses";

test("should setup remove expense action object", ()=>{
    const action = removeExpense({ id: "1234qwer" });
    expect(action).toEqual({ type:'REMOVE_EXPENSE', id: "1234qwer" });
});

test("should setup edit expense action object", ()=>{
    const action = editExpense("1234qwer",{note: 'hi'});
    expect(action).toEqual({ 
        type:'EDIT_EXPENSE', 
        id: "1234qwer",
        updates:{
            note: 'hi'
        }
    });
});

test("should setup add expense action object with provided values", ()=>{
    const expenseData = {
        description:"rent", 
        amount:5000, 
        createdAt:54645,
        note:"A final one"
    };
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense:{
            ...expenseData,
            id:expect.any(String)
        }
    })
});

test("should setup add expense action object with default values", ()=>{
    const expenseData = {
        description:"rent", 
        amount:5000, 
        createdAt:54645,
        note:"A final one"
    };
    const action = addExpense({});
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense:{
            description:'',
            amount:0,
            createdAt:0,
            note:'',
            id:expect.any(String)
        }
    })
});