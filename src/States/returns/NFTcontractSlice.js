import { createSlice } from '@reduxjs/toolkit';

const ContractSlice = createSlice({
    name: 'Contract',
    initialState: {
        Contract: '',
    },
    reducers: {
        updateNFTContractName: (state, action) => {
            state.newContractAddress= action.payload
          }
    },
});

export const { updateNFTContractName } = ContractSlice.actions;
export default ContractSlice.reducer;