import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './features/tasks';
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  middleware: [thunk]
})

export default store;