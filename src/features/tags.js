import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllTags =
  createAsyncThunk('tags/getAllTags', async (dispatch, thunkAPI) => {

  });

export const tagsSlice = createSlice({
  name: 'tags',
  
  initialState: {
    tags: [],              // An Array of Tag Objects
  },
  
  reducers: {
  },
  extraReducers: {

  }
})

// export const { 

// } = tasksSlice.actions;

export default tagsSlice.reducer;