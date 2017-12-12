import getTotalExpenses from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test("should return 0 if no expenses", () => {
    const result = getTotalExpenses([]);
    expect(result).toBe(0);
});

test("should correctly add up a single expense", () => {
    const result = getTotalExpenses([expenses[0]]);
    expect(result).toBe(195);
});

test("should correctly add up  multiple expenses", () => {
    const result = getTotalExpenses(expenses);
    expect(result).toBe(114195);
});