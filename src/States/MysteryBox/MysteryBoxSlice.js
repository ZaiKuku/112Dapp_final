import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    MysteryBox: ""
}

const MysteryBoxSlice = createSlice({
    name: "MysteryBox",
    initialState,
    reducers: {
        updateMysteryBox: (state, action) => {
            state.MysteryBox = action.payload
        }
    }
})

export const { updateMysteryBox } = MysteryBoxSlice.actions
export default MysteryBoxSlice.reducer