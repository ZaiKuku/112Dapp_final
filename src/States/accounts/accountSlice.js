import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  account: ""
}

const accountSlice = createSlice({
    name: "user_account",
    initialState,
    reducers: {
        get_account: (state, action) => {
            state.account = action.payload.account
            return state;
        }
    }
})

export const select_account = (state) => state.account.account
export const { get_account } = accountSlice.actions
export default accountSlice.reducer