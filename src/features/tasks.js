import { createSlice } from '@reduxjs/toolkit';

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    value: [],
  },
  reducers: {
    addEmptyTask: (state) => {
      state.value = [...state.value, {
        description: 'New task',
        date: null,
        tags: [],
      }]
    },
  },
});

export const { 
  addEmptyTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;