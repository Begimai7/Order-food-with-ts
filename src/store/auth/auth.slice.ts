import { createSlice } from "@reduxjs/toolkit";
import { UserRoles } from "../../common/utils";
import { signIn, signOut, signUp } from "./auth.thunk";

interface AuthState {
    isAuthorized: boolean;
    token: string;
    user: {
        role: UserRoles;
        name: string;
        email: string;
    };
}

const getInitialState = () => {
    const json = localStorage.getItem("AUTH");
    if (json) {
        const userData = JSON.parse(json) as Omit<AuthState, "isAuthorized">;
        return {
            isAuthorized: true,
            token: userData.token,
            user: {
                name: userData.user.name,
                email: userData.user.email,
                role: userData.user.role,
            },
        };
    }

    return {
        isAuthorized: false,
        token: "",
        user: {
            name: "",
            email: "",
            role: UserRoles.GUEST,
        },
    };
};

const initialState: AuthState = getInitialState();

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signIn.fulfilled, (state, { payload }) => {
            state.isAuthorized = true;
            state.token = payload.token;
            state.user = {
                name: payload.user.name,
                role: payload.user.role,
                email: payload.user.email,
            };
        });
        builder.addCase(signUp.fulfilled, (state, { payload }) => {
            state.isAuthorized = true;
            state.token = payload.token;
            state.user = {
                name: payload.user.name,
                role: payload.user.role,
                email: payload.user.email,
            };
        });
        builder.addCase(signOut.fulfilled, (state) => {
            state.isAuthorized = false;
            state.token = "";
            state.user = {
                name: "",
                role: UserRoles.GUEST,
                email: "",
            };
        });
    },
});

export const authActions = authSlice.actions;

export default authSlice;
