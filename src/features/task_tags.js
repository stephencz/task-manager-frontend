import env from "react-dotenv";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const PROXY = env.PROXY;

export const getAllTaskTags =
  createAsyncThunk('taskTags/getAllTaskTags', async (dispatch, thunkAPI) => {
    const response = await axios.get(PROXY + '/api/v1/task_tags/get/all')
    return response.data
  });

export const saveTaskTags =
  createAsyncThunk('taskTags/saveTaskTag', async (dispatch, thunkAPI) => {
    const taskTagsToAdd = thunkAPI.getState().task_tags.add;
    const postResponse = await axios.post(PROXY + '/api/v1/task_tags/save', taskTagsToAdd);
    if(postResponse.status === 200) {
      const getResponse = await axios.get(PROXY + '/api/v1/task_tags/get/all')
      return getResponse.data
    }

    return [];
  });

export const deleteTaskTags =
  createAsyncThunk('taskTags/deleteTaskTag', async (dispatch, thunkAPI) => {
    const taskTagsToRemove = thunkAPI.getState().task_tags.remove
    const deleteResponse = await axios.delete(PROXY + '/api/v1/task_tags/delete', {
      params: {
        remove: taskTagsToRemove
      }
    })

    if(deleteResponse.status === 200) {
      const getResponse = await axios.get(PROXY + '/api/v1/task_tags/get/all')
      return getResponse.data;
    }

    return []
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
      state.add = [...state.add, {
        tag_id: action.payload.tag_id,
        task_id: action.payload.task_id
      }];
    },

    removeTaskTag: (state, action) => {
      state.remove = [...state.remove, action.payload.task_tag_id];
    },

    clearTaskTags: (state, action) => {
      state.task_tags = []
    }
  },
  extraReducers: {
    [getAllTaskTags.fulfilled]: (state, action) => {
      state.task_tags = action.payload;
    },
    [saveTaskTags.fulfilled]: (state, action) => {
      state.task_tags = action.payload;
      state.add = []
    },
    [deleteTaskTags.fulfilled]: (state, action) => {
      state.task_tags = action.payload;
      state.remove = []
    }
  }
})

export const { 
  addTaskTag,
  removeTaskTag,
  clearTaskTags
} = taskTagsSlice.actions;

export default taskTagsSlice.reducer;