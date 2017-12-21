import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { removeExpense, editExpense, addExpense, startAddExpense } from "../../actions/expenses";
import expenses from  '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

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
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense:expenses[2]
    })
});

test("should add expense to the database and store",(done) => {
    const store = createMockStore({});
    const expenseData = {
        description:"headphones", 
        amount:5000, 
        createdAt:54645,
        note:"A better one"
    };

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type:"ADD_EXPENSE",
            expense:{
                id: expect.any(String),
                ...expenseData
            }
        });

        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test("should add expense with defaults to the database and store", (done) => {
    const store = createMockStore({});
    const expenseDefaults = {
        description : '',
        note : '',
        amount : 0,
        createdAt : 0
    };
    
    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "ADD_EXPENSE",
            expense: {
                id: expect.any(String),
                ...expenseDefaults
            }
        });

        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefaults);
        done();
    });
});

// test("should setup add expense action object with default values", ()=>{
//     const expenseData = {
//         description:"rent", 
//         amount:5000, 
//         createdAt:54645,
//         note:"A final one"
//     };
//     const action = addExpense({});
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense:{
//             description:'',
//             amount:0,
//             createdAt:0,
//             note:'',
//             id:expect.any(String)
//         }
//     })
// });