import React from 'react';
import ExpenseList from './ExpenseList';
import ExpeneListFilters from './ExpenseListFilters';
import ExpensesSummary from './ExpensesSummary';

const ExpenseDashboardPage = ()=>(
    <div>
        <ExpensesSummary />
        <ExpeneListFilters />
        <ExpenseList />
    </div>
);

export default ExpenseDashboardPage;