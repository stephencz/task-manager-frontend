import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createNewTag =
  createAsyncThunk('tags/createNewTag', async (dispatch, thunkAPI) => {
    await axios.post('/api/v1/tags/new');
    const response = await axios.get('/api/v1/tags/get/latest')
    return response.data[0];
  });

export const getAllTags =
  createAsyncThunk('tags/getAllTags', async (dispatch, thunkAPI) => {
    const response = await axios.get('/api/v1/tags/get/all');
    return response.data;
  });

export const saveTags =
  createAsyncThunk('tags/saveTags', async (dispatch, thunkAPI) => {
    const tags = thunkAPI.getState().tags.tags;
    const unsaved_ids = thunkAPI.getState().tags.unsaved;
    const unsaved_tags = tags.filter((element) => { 
      return unsaved_ids.includes(element.tag_id) 
    });

    const response = await axios.post('/api/v1/tags/save', unsaved_tags);
    return response;
  });

/** Deletes all tasks that are currently selected */
export const deleteSelectedTags =
  createAsyncThunk('tags/deleteSelectedTags', async (dispatch, thunkAPI) => {
    const state = thunkAPI.getState();
    if(state.tags.selected.length > 0) {
      const response = await axios.delete('/api/v1/tags/delete/selected', {
        params: {
          selected: state.tags.selected
        }
      });

      return response;
    }
  });

export const tagsSlice = createSlice({
  name: 'tags',
  
  initialState: {
    tags: [],              // An Array of Tag Objects
    unsaved: [],           // An Array of Tag that need to be saved
    selected: [],          // An Array of Selected Tags
    status: null 
  },
  
  reducers: {
    setTagText(state, action) {
      state.tags = state.tags.map((tag, index) => {
        if(tag.tag_id !== action.payload.id) {
          return tag;
        } 
        
        return {...tag, tag_text: action.payload.text};
      })
    },
    setForegroundColor(state, action) {
      state.tags = state.tags.map((tag, index) => {
        if(tag.tag_id !== action.payload.id) {
          return tag;
        }
        
        return {...tag, tag_fg: action.payload.color };
      });
    },
    setBackgroundColor(state, action) {
      state.tags = state.tags.map((tag, index) => {
        if(tag.tag_id !== action.payload.id) {
          return tag;
        }

        return {...tag, tag_bg: action.payload.color };
      });
    },
    setSelected(state, action) {
      state.selected = [action.payload.id];
    },
    addSelected(state, action) {
      state.selected = [...state.selected, action.payload.id];
    },
    removeSelected(state, action) {
      state.selected = state.selected.filter((value, index) => { 
        return value !== action.payload.id;
      });
    },
    clearSelected(state, action) {
      state.selected = [];
    },
    addUnsaved(state, action) {
      state.unsaved = [...state.unsaved, action.payload.id]
    },
    clearUnsaved(state, action) {
      state.unsaved = [];
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
    },
    [createNewTag.fulfilled]: (state, action) => {
      state.tags = [action.payload, ...state.tags];
    },
    [deleteSelectedTags.fulfilled]: (state, action) => {
      state.tags = state.tags.filter( value => state.selected.includes(value.tag_id) !== true)
      state.selected = []
    },
    [saveTags.fulfilled]: (state, action) => {
      state.unsaved = []
    }
  }
})

export const { 
  setTagText,
  setForegroundColor,
  setBackgroundColor,

  setSelected,
  addSelected,
  removeSelected,
  clearSelected,

  addUnsaved,
  clearUnsaved
} = tagsSlice.actions;

export default tagsSlice.reducer;