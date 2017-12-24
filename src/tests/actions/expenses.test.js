import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
    removeExpense,
    startRemoveExpense,  
    editExpense,
    startEditExpense, 
    addExpense, 
    startAddExpense, 
    setExpenses, 
    startSetExpenses
    
} from "../../actions/expenses";
import expenses from  '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = "testuid457";
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({ id, description, amount, createdAt, note })=>{
        expensesData[id] = { description, amount, createdAt, note }; 
    });
    database.ref(`users/${uid}/expenses`).set(expensesData).then(()=> done());
});

test("should setup remove expense action object", ()=>{
    const action = removeExpense({ id: "1234qwer" });
    expect(action).toEqual({ 
        type:'REMOVE_EXPENSE', 
        id: "1234qwer" 
    });
});

test("should remove expenses from firebase", (done) => {
    const store = createMockStore(defaultAuthState);
    const { id } = expenses[2];
    store.dispatch(startRemoveExpense({ id })).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });
        return database.ref(`users/${uid}/expenses/${id}`).once('value')
    }).then((snapshot) => {
        expect(snapshot.val()).toBe(null);
        done();
    });
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

test("should edit expenses from firebase", (done) => {
    const store = createMockStore(defaultAuthState);
    const { id } = expenses[1];
    const updates = { note:'just some updates' };

    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        });
        return database.ref(`users/${uid}/expenses/${id}`).once('value')
    }).then((snapshot) => {
        expect(snapshot.val().note).toBe(updates.note);
        done();
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
    const store = createMockStore(defaultAuthState);
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

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test("should add expense with defaults to the database and store", (done) => {
    const store = createMockStore(defaultAuthState);
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

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefaults);
        done();
    });
});

test("should setup set expense action object with data",()=>{
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type:'SET_EXPENSES',
        expenses
    });
});

test("should fetch the expenses from firebase", (done)=>{
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});

