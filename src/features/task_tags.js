import { createSlice } from '@reduxjs/toolkit';

export const taskTagsSlice = createSlice({
  name: 'tags',
  
  initialState: {
    task_tags: [],
    add: [],
    remove: []
  },
  
  reducers: {
    addTaskTag: (state, action) => {
      let taskTagToAdd = {
        tag_id: action.payload.tag_id,
        task_id: action.payload.task_id
      }
      
      state.task_tags = [...state.task_tags, taskTagToAdd];
    },

    removeTaskTag: (state, action) => {
      let payload = action.payload.task_tag_object;
      state.task_tags = state.task_tags.filter((task_tag) => {
        if(task_tag.task_id === payload.task_id && task_tag.tag_id === payload.tag_id) {
          console.log("Removing Match")

          return false;
        } 

        return true;
      })
    },

    clearTaskTags: (state, action) => {
      state.task_tags = []
    },

    deleteTaskTags: (state, action) => {
      state.task_tags = action.payload;
      state.remove = []
    },

    clearTaskTagsForTagIDs: (state, action) => {
      let selectedTags = action.payload.selected_tags;
      state.task_tags = state.task_tags.filter((task_tag) => {
        if(selectedTags.includes(task_tag.tag_id)) {
          return false;
        }

        return true;
      });
    },

    clearTaskTagsForTaskIDs: (state, action) => {
      let selectedTasks = action.payload.selected_tasks;
      let activeID = action.payload.activeID;

      state.task_tags = state.task_tags.filter((task_tag) => {
        if(selectedTasks.includes(task_tag.task_id)) {
          return false;
        }

        if(task_tag.task_id === activeID) {
          return false;
        }

        return true;
      });
    },

    addDemoTaskTags: (state, action) => {
      state.task_tags = [
        {
          task_id: 1,
          tag_id: 1
        },
        {
          task_id: 2,
          tag_id: 2
        },
        {
          task_id: 3,
          tag_id: 2
        },
        {
          task_id: 4,
          tag_id: 2
        },
        {
          task_id: 5,
          tag_id: 2
        },
      ]
    }
  }
})

export const { 
  addTaskTag,
  removeTaskTag,
  clearTaskTags,
  clearTaskTagsForTagIDs,
  clearTaskTagsForTaskIDs,
  deleteTaskTags,
  addDemoTaskTags
} = taskTagsSlice.actions;

export default taskTagsSlice.reducer;