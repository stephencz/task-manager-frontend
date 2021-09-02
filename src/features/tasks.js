import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    value: [],
  },
  reducers: {
    setTasks: state => {
      state.value = 
    },
  },
});

export const loadTasks = () => async (dispatch, getState) => {
  axios.get('/tasks').then(res => {
    state.value = res.data
  });
}

export const { 
  getTasks
} = tasksSlice.actions;

export default tasksSlice.reducer;