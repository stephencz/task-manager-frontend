import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllTaskTags =
  createAsyncThunk('taskTags/getAllTaskTags', async (dispatch, thunkAPI) => {
    const response = await axios.get('/api/v1/tasktags/get/all')
    return response.data
  });

export const taskTagsSlice = createSlice({
  name: 'tags',
  
  initialState: {
    task_tags: []
  },
  
  reducers: {
  },
  extraReducers: {
   [getAllTaskTags.fulfilled]: (state, action) => {
     state.task_tags = action.payload;
   }
  }
})

// export const { 

// } = taskTagsSlice.actions;

export default taskTagsSlice.reducer;