import { createSlice } from '@reduxjs/toolkit';

const URISlice = createSlice({
    name: 'URI',
    initialState: {
        baseURI: '',
    },
    reducers: {
        updateBaseURIName: (state, action) => {
            state.baseURI= action.payload
          }
    },
});

export const { updateBaseURIName } = URISlice.actions;
export default URISlice.reducer;
