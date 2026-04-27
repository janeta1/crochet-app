import { configureStore } from '@reduxjs/toolkit'
import projectsReducer from './projectsSlice'
import yarnsReducer from './yarnSlice'

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    yarns: yarnsReducer,
  }
})