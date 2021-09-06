import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/**
 * Returns a JSON Array containing all tasks.
 */
export const getTasks = createAsyncThunk('tasks/getTasks', async (dispatch, getState) => {
  const response = await axios.get('/tasks');
  return response.data;
});

/**
 * Saves the current state of all tasks in the database.
 */
export const saveTasks = createAsyncThunk('tasks/saveTasks', async (dispatch, getState) => {
  const response = null;
  return response.data;
});

export const tasksSlice = createSlice({
  name: 'tasks',
  
  initialState: {
    tasks: [],
    status: null
  },
  
  reducers: {
    setTaskDescription(state, action) {
      state.tasks = state.tasks.map((task, index) => {

        if(task.task_id !== action.payload.id) {
          return task;
        }

        return {...task, task_description: action.payload.description };
      })
    },
    updateTasks(state, action) {
      state.tasks.push(action.payload);
    }
  },

  extraReducers: {
    [getTasks.pending]: (state, action) => {
      state.status = "Loading Tasks";
    },
    [getTasks.fulfilled]: (state, action) => {
      state.tasks = action.payload;
      state.status = null;
    },
    [getTasks.rejected]: (state, action) => {
      state.status = "Failed to load tasks"
    }
  }
});

export const { 
  setTaskDescription,
  updateTasks
} = tasksSlice.actions;

export default tasksSlice.reducer;