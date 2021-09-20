import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllTaskTags =
  createAsyncThunk('taskTags/getAllTaskTags', async (dispatch, thunkAPI) => {
    const response = await axios.get('/api/v1/task_tags/get/all')
    return response.data
  });

export const saveTaskTags =
  createAsyncThunk('taskTags/saveTaskTag', async (dispatch, thunkAPI) => {
    const taskTagsToAdd = thunkAPI.getState().task_tags.add;
    const response = await axios.post('/api/v1/task_tags/save', taskTagsToAdd);
    
    return response;
  });

export const deleteTaskTags =
  createAsyncThunk('taskTags/deleteTaskTag', async (dispatch, thunkAPI) => {
    const taskTagsToRemove = thunkAPI.getState().task_tags.remove
    const response = await axios.delete('/api/v1/task_tags/delete', {
      params: {
        remove: taskTagsToRemove
      }
    })

    return response;
  }); 

export const taskTagsSlice = createSlice({
  name: 'tags',
  
  initialState: {
    task_tags: [],
    add: [],
    remove: []
  },
  
  reducers: {
    addTaskTag: (state, action) => {
      state.add.push({
        tag_id: action.payload.tag_id,
        task_id: action.payload.task_id
      });
    },

    removeTaskTag: (state, action) => {
      state.remove.push(action.payload.task_tag_id);
    }
  },
  extraReducers: {
    [getAllTaskTags.fulfilled]: (state, action) => {
      state.task_tags = action.payload;
    },
    [saveTaskTags.fulfilled]: (state, action) => {
      state.add = []
    },
    [deleteTaskTags.fulfilled]: (state, action) => {
      state.remove = []
    }
  }
})

export const { 
  addTaskTag,
  removeTaskTag
} = taskTagsSlice.actions;

export default taskTagsSlice.reducer;