// src/features/store.js
import { configureStore } from '@reduxjs/toolkit'
import accountReducer from './accounts/accountSlice'
import formReducer from './Projects/ProjectFormSlice'
import pictureReducer from './pictures/pictureSlice'
import MysteryBoxReducer from './MysteryBox/MysteryBoxSlice'

const store = configureStore({
  reducer: {
    account: accountReducer,
    projectform : formReducer,
    picture: pictureReducer,
    MysteryBox: MysteryBoxReducer
  }
})

export default store