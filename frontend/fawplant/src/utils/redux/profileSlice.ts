import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ProfileInterface {
    name: string | null;
    email: string | null;
    mobile: string | null;
    profileUrl: string | null;
}

const initialState: ProfileInterface = {
    name: null,
    email: null,
    mobile: null,
    profileUrl: null,
};

const storedProfile = localStorage.getItem("profile");
if (storedProfile) {
    const { name, email, mobile, profileUrl } = JSON.parse(storedProfile);
    initialState.name = name;
    initialState.email = email;
    initialState.mobile = mobile;
    initialState.profileUrl = profileUrl;
}

export const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {
        setProfileState: (state, action: PayloadAction<ProfileInterface>) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.mobile = action.payload.mobile;
            state.profileUrl = action.payload.profileUrl;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setProfileState } = profileSlice.actions;

export default profileSlice.reducer;
