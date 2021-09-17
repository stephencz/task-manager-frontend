import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './features/tasks';
import tagsReducer from './features/tags';
import taskTagsReducer from './features/task_tags';
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    tags: tagsReducer,
    tasktags: taskTagsReducer
  },
  middleware: [thunk]
})

export default store;