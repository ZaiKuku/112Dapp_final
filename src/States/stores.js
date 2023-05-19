// src/features/store.js
import { configureStore } from '@reduxjs/toolkit'
import accountReducer from './accounts/accountSlice'
import formReducer from './Projects/ProjectFormSlice'
import URIReducer from './returns/baseURISlice'
import ContractReducer from './returns/NFTcontractSlice'
import pictureReducer from './pictures/pictureSlice'
import MysteryBoxReducer from './MysteryBox/MysteryBoxSlice'


const store = configureStore({
  reducer: {
    account: accountReducer,
    projectform: formReducer,
    baseURI: URIReducer,
    newContractAddress: ContractReducer,
    picture: pictureReducer,
    MysteryBox: MysteryBoxReducer
  }
})

export default store