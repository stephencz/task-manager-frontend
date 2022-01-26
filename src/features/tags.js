import { createSlice } from '@reduxjs/toolkit';


/**
 * FOR THE FRONTEND DEMO ONLY: Generates the next task id.
 * @param {*} tasks The array of tasks.
 * @returns integer
 */
 const getNextTagID = (tags) => {
  if(tags.length <= 0) {
    return 1;
  } else {
    let max = 0;
    tags.forEach(tag => {
      if(tag.tag_id > max) {
        max = tag.tag_id
      }
    })

    return max + 1;
  }
}

export const tagsSlice = createSlice({
  name: 'tags',
  
  initialState: {
    tags: [],              // An Array of Tag Objects
    unsaved: [],           // An Array of Tag that need to be saved
    selected: [],          // An Array of Selected Tags
    status: null 
  },
  
  reducers: {
    createNewTag(state, action) {
      state.tags = [...state.tags, {
        tag_id: getNextTagID(state.tags),
        tag_text: "Empty Tag",
        tag_fg: "#ffffff",
        tag_bg: "#000000"
      }];
    },
    deleteSelectedTags(state, action) {
      state.tags = state.tags.filter(value => state.selected.includes(value.tag_id) !== true);
      state.selected = [];
    },
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
    },
    addDemoTags(state, action) {
      state.tags = [
        {
          tag_id: 1,
          tag_text: "Introduction",
          tag_fg: "#fff",
          tag_bg: "#56b4fc"
        },
        {
          tag_id: 2,
          tag_text: "Instructions",
          tag_fg: "#fff",
          tag_bg: "#de7214"
        }
      ]
    }
  }
})

export const { 
  createNewTag,
  deleteSelectedTags,

  setTagText,
  setForegroundColor,
  setBackgroundColor,

  setSelected,
  addSelected,
  removeSelected,
  clearSelected,

  addUnsaved,
  clearUnsaved,

  addDemoTags
} = tagsSlice.actions;

export default tagsSlice.reducer;