import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import tasksReducer from './features/tasks';

export default configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  middleware: [thunk]
})