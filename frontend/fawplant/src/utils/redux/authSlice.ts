import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthStateInterface {
    authToken: string | null; // string of authentication token
    refreshAuthToken: string | null;
    isSignedIn: boolean; // is user signed in?
}

const initialState: AuthStateInterface = {
    authToken: null,
    refreshAuthToken: null,
    isSignedIn: false,
};

// Load the token from storage and set it in the initial state

const storedToken = localStorage.getItem("token");
if (storedToken) {
    const { accessToken, refreshToken } = JSON.parse(storedToken);
    initialState.authToken = accessToken;
    initialState.isSignedIn = Boolean(accessToken); // set signed=true if token found
    initialState.refreshAuthToken = refreshToken;
}

export const authSlice = createSlice({
    name: "authentication",
    initialState: initialState,
    reducers: {
        setAuthState: (state, action: PayloadAction<AuthStateInterface>) => {
            state.authToken = action.payload.authToken;
            state.refreshAuthToken = action.payload.refreshAuthToken;
            state.isSignedIn = action.payload.isSignedIn;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setAuthState } = authSlice.actions;

export default authSlice.reducer;
