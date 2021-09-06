import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// This is a thunk
export const getTasks = createAsyncThunk('tasks/getTasks', async (dispath, getState) => {
  const response = await axios.get('/tasks');
  return response.data;
});

export const tasksSlice = createSlice({
  name: 'tasks',
  
  initialState: {
    tasks: [],
    status: null
  },
  
  reducers: {
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
  updateTasks
} = tasksSlice.actions;

export default tasksSlice.reducer;