import { configureStore } from '@reduxjs/toolkit';

import tasksReducer from './features/tasks';

export default configureStore({
  reducer: {
    tasks: tasksReducer,
  },
})