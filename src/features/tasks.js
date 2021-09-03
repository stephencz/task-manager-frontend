import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// This is a thunk
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async() => {
  const response = await axios.get('/tasks').then();
  return JSON.parse(response.data);
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

  extraReducers: builder => {
    builder
    .addCase(fetchTasks.pending, (state, action) => {
      state.status = 'Loading tasks';
    })
    .addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
      state.status = null;
    })
    .addCase(fetchTasks.rejected, (state, action) => {
      state.status = "Failed to load tasks"
    })
  }
});

export const { 
  updateTasks
} = tasksSlice.actions;

export default tasksSlice.reducer;