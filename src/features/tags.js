import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllTags =
  createAsyncThunk('tags/getAllTags', async (dispatch, thunkAPI) => {
    const response = await axios.get('/api/v1/tags/get/all');
    return response.data;
  });

export const tagsSlice = createSlice({
  name: 'tags',
  
  initialState: {
    tags: [],              // An Array of Tag Objects
    status: null 
  },
  
  reducers: {
    setForegroundColor(state, action) {
      state.tags = state.tags.map((tag, index) => {
        if(tag.tag_id !== action.payload.id) {
          return tag;
        }
        
        return {...tag, tag_fg: action.payload.color.hex };
      });
    },
    setBackgroundColor(state, action) {
      state.tags = state.tags.map((tag, index) => {
        if(tag.tag_id !== action.payload.id) {
          return tag;
        }

        return {...tag, tag_bg: action.payload.color.hex };
      });
    }

  },
  extraReducers: {
    [getAllTags.pending]: (state, action) => {
      state.status = "Loading tags";
    },

    [getAllTags.fulfilled]: (state, action) => {
      state.tags = action.payload;
      state.status = null;
    },

    [getAllTags.rejected]: (state, action) => {
      state.status = "Failed to load tags!";
    }
  }
})

export const { 
  setForegroundColor,
  setBackgroundColor
} = tagsSlice.actions;

export default tagsSlice.reducer;