import { createSlice } from '@reduxjs/toolkit';


const formSlice = createSlice({
  name: 'form',
  initialState: {
    projectName: '',
    externalLink: '',
    String: {
      traitsType: '',
      value: '',
    },

    boost_number: {
      traitsType: '',
      value: '',
    },

    boost_percentage: {
      traitsType: '',
      value: '',
    },

    date: {
      traitsType: '',
      value: '',
    },

    description: '',
    number: '',
  },
  reducers: {
    updateProjectName: (state, action) => {
      state.projectName= action.payload
    },
    updateExternalLink: (state, action) => {
      state.externalLink = action.payload
    },
    updateString: (state, action) => {
      state.String.value = action.payload.value
      state.String.traitsType = action.payload.traitsType
    },

    updateBoostNumber: (state, action) => {
      state.boost_number.traitsType = action.payload.traitsType
      state.boost_number.value = action.payload.value
    },

    updateBoostPercentage: (state, action) => {
      state.boost_percentage.traitsType = action.payload.traitsType
      state.boost_percentage.value = action.payload.value
    },

    updateDate: (state, action) => {
      state.date.traitsType = action.payload.traitsType
      state.date.value = action.payload.value
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
  updateString,
  updateBoostNumber,
  updateBoostPercentage,
  updateDate,
  updateDescription,
  updateNumber,
} = formSlice.actions;

export default formSlice.reducer;