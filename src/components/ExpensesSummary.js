import React from 'react';
import numeral from 'numeral';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

export const ExpensesSummary= ({expenseCount, expensesTotal}) => {
    const expenseWord = expenseCount === 1 ? 'expense' : 'expenses';
    const formattedTotal = numeral(expensesTotal / 100).format('$0,0.00');
    return (
        <div>
            <h1>Viewing {expenseCount} {expenseWord} totalling {formattedTotal}</h1>
        </div>
    );
}

const mapStateToProps = (state) => {
    const visibileExpenses = selectExpenses(state.expenses,state.filters);
    return {
        expenseCount: visibileExpenses.length,
        expensesTotal: selectExpensesTotal(visibileExpenses)
    }
}

export default connect(mapStateToProps)(ExpensesSummary);