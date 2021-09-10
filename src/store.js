import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './features/tasks';
import tagsReducer from './features/tags';
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    tags: tagsReducer
  },
  middleware: [thunk]
})

export default store;