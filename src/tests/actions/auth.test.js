import { login, logout } from "../../actions/auth";

test("should setup login action correclty", () => {
    const uid = "54654sasff654asf"
    const action = login(uid);
    expect(action).toEqual({
        type: 'LOGIN',
        uid
    });
});

test("should setup logout action correclty", () => {
    const action = logout();
    expect(action).toEqual({
        type: 'LOGOUT'
    });
});