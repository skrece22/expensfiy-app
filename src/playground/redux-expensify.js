import {createStore, combineReducers} from 'redux';
import uuid from 'uuid';

// ADD_EXPENSE
const addExpense = ({
    description = '',
    note = '',
    amount = 0,
    createdAt = 0
} = {}) => (
    {
        type: 'ADD_EXPENSE',
        expense:{
            id: uuid(),
            description,
            note,
            amount,
            createdAt
        }
    }
);

// REMOVE_EXPENSE

const removeExpense = ({id}) => (
    {
        type:'REMOVE_EXPENSE',
        id
    }
);

// EDIT_EXPENSE

const editExpense = (id,updates) =>(
    {
        type: 'EDIT_EXPENSE',
        id,
        updates
    }
);

// SET_TEXT_FILTER

const setTextFilter= (text ='') =>(
    {
        type: 'SET_TEXT_FILTER',
        text
    }
);

// SORT_BY_AMOUNT

const sortByAmount = ()=>(
    {
        type: 'SORT_BY_AMOUNT'
    }
);

// SORT_BY_DATE

const sortByDate = ()=>(
    {
        type: 'SORT_BY_DATE'
    }
);

// SET_START_DATE

const setStartDate = (startDate) => (
    {
        type: 'SET_START_DATE',
        startDate
    }
);
// SET_END_DATE

const setEndDate = (endDate) => (
    {
        type: 'SET_END_DATE',
        endDate
    }
);

//Expense Reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch(action.type){
        case 'ADD_EXPENSE':
            return [
                ...state, 
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            return state.filter(({id})=> id !== action.id);
        case 'EDIT_EXPENSE':
            return state.map((expense)=> expense.id === action.id ?{...expense,...action.updates}:{...expense}); 
        default:
            return state;
    }
};


//Filter Reducers 

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate : undefined,
    endDate: undefined

};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch(action.type){
        case 'SET_TEXT_FILTER':
            return {
                ...state, 
                text:action.text
            };
        case 'SORT_BY_DATE':
            return {
                ... state, 
                sortBy:'date'
            };
        case 'SORT_BY_AMOUNT':
            return {
                ... state, 
                sortBy:'amount'
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }
        default:
            return state;
    }
};

//Get visible expenses

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate})=>{
    return expenses.filter((expense)=>{
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt>=startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt<=endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b)=> {
        if(sortBy==='date'){
            return a.createdAt < b.createdAt ? 1 : -1;
        }
        else if(sortBy==='amount'){
            return a.amount < b.amount ? 1: -1;
        }
    });
};

//Store Creation

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(()=>{
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
    console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({
    description: 'January rent',
    amount:54500,
    createdAt:1000
}));

const expenseTwo = store.dispatch(addExpense({
    description: 'Febraury house',
    note: 'Final payment for this address',
    amount:56500,
    createdAt:2000
}));

// store.dispatch(removeExpense({ id:expenseOne.expense.id}));

// store.dispatch(editExpense(expenseTwo.expense.id,{amount:40000}));

//  store.dispatch(setTextFilter('Feb'));

// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

//  store.dispatch(setStartDate(125));
// store.dispatch(setStartDate());

//  store.dispatch(setEndDate(250));
// store.dispatch(setEndDate());



const demoState = {
    expenses:[{
        id:'dsgdsga0',
        description: 'January Rent',
        note: 'Final payment for this address',
        amount:54500,
        createdAt:0      
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', // date or amount
        startDate: undefined,
        endDate: undefined
    }
}

// const user={
//     name:'santhosh',
//     age:22
// }

// console.log({
//     ...user,
//     location:'erode'
// });
 