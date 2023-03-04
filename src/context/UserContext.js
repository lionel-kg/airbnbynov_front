import React, { createContext, useReducer } from "react";
const initialValue = { user: null };
const userContext = createContext(initialValue);
const { Provider } = userContext;
const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "login":
                let token = localStorage.getItem("token")
                let {
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    isAdmin: isAdmin,
                    UserType: userType
                } = action.payload;
                if (firstName === null) {
                    firstName = "Prénom";
                }
                if (lastName === null) {
                    lastName = "Nom";
                }
                let newStateLogin = { ...state };
                newStateLogin.user = {
                    email: email,
                    firstname: firstName,
                    lastname: lastName,
                    token: token,
                    isAdmin: isAdmin,
                    userType: userType
                };
                return newStateLogin;
            case "updateUser":
                let newUserUpdate = {...state};
                newUserUpdate.user = {
                    email: action.payload.email,
                    firstname: action.payload.firstName,
                    lastname: action.payload.lastName,
                    isAdmin: action.payload.isAdmin,
                    userType: action.payload.UserType
                };
                return newUserUpdate;
            case "logout":
                let newLogoutState = { ...state };
                newLogoutState.user = null;
                localStorage.removeItem("token");
                return newLogoutState;
            default:
                throw new Error("Action not found !!");
        }
    }, initialValue);
    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { userContext, StateProvider };