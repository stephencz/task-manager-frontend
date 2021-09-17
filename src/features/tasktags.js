import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const taskTagsSlice = createSlice({
  name: 'tags',
  
  initialState: {
    task_tags: []
  },
  
  reducers: {
  },
  extraReducers: {
   
  }
})

// export const { 

// } = taskTagsSlice.actions;

export default taskTagsSlice.reducer;