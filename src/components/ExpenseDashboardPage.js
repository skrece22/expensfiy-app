import React from 'react';
import ExpenseList from './ExpenseList';
import ExpeneListFilters from './ExpenseListFilters';

const ExpenseDashboardPage = ()=>(
    <div>
        <ExpeneListFilters />
        <ExpenseList />
    </div>
);

export default ExpenseDashboardPage;