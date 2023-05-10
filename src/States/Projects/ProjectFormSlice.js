import { createSlice } from '@reduxjs/toolkit';


const formSlice = createSlice({
  name: 'form',
  initialState: {
    projectName: '',
    externalLink: '',
    displayType: '',
    traitsType: '',
    value: '',
    description: '',
    number: '',
  },
  reducers: {
    updateProjectName: (state, action) => {
      state.projectName = action.payload;
    },
    updateExternalLink: (state, action) => {
      state.externalLink = action.payload;
    },
    updateDisplayType: (state, action) => {
      state.displayType = action.payload;
    },
    updateTraitsType: (state, action) => {
      state.traitsType = action.payload;
    },
    updateValue: (state, action) => {
      state.value = action.payload;
    },
    updateDescription: (state, action) => {
      state.description = action.payload;
    },
    updateNumber: (state, action) => {
      state.number = action.payload;
    }
  },
});

export const {
  updateProjectName,
  updateExternalLink,
  updateDisplayType,
  updateTraitsType,
  updateValue,
  updateDescription,
  updateNumber,
} = formSlice.actions;

export default formSlice.reducer;