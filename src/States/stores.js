// src/features/store.js
import { configureStore } from '@reduxjs/toolkit'
import accountReducer from './accounts/accountSlice'
import formReducer from './Projects/ProjectFormSlice'

const store = configureStore({
  reducer: {
    account: accountReducer,
    projectform : formReducer
  }
})

export default store