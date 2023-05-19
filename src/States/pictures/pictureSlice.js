import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    picture: ""
}

const pictureSlice = createSlice({
    name: "picture",
    initialState,
    reducers: {
        updatePicture: (state, action) => {
            state.picture = action.payload
        }
    }
})

export const { updatePicture } = pictureSlice.actions
export default pictureSlice.reducer