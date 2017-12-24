import authReducer from '../../reducers/auth';

test("should setup login state correctly", () => {
    const action = {
        type:'LOGIN',
        uid: '5454sfa5f4sa5'
    }
    const state = authReducer( {}, action);
    expect(state.uid).toBe(action.uid);
});

test("should setup logout state correctly", () => {
    const action = {
        type: 'LOGOUT'
    }
    const state = authReducer({ uid:"hjh656"}, action);
    expect(state).toEqual({});
});