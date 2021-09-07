import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/**
 * Returns a JSON Array containing all tasks.
 */
export const getTasks = 
  createAsyncThunk('tasks/getTasks', async (dispatch, getState) => {
    const response = await axios.get('/tasks');
    return response.data;
  });

export const createNewTask = 
  createAsyncThunk('tasks/createNewTask', async (dispatch, getState) => {
    const response = await axios.post()
  });

/**
 * Saves the current state of all tasks in the database.
 */
export const saveTasks = createAsyncThunk('tasks/saveTasks', async (dispatch, getState) => {
  const response = null;
  return response.data;
});

export const tasksSlice = createSlice({
  name: 'tasks',
  
  initialState: {
    newestTask: null,       // Holds the newest task.
    tasks: [],              // An Array of Task Objects
    tags: [],               // An Array of Tag Objects
    selected: [],           // An Array of task ids representing tasks that have been selected.
    status: null            // The status of task loading.
  },
  
  reducers: {

    /**
     * Sets the description of a Task with the matching id. 
     * 
     * Expected payload:
     * 
     * {
     *    id: The id of the task.
     *    description: The new task description.
     * }
     * 
     * @param {*} state 
     * @param {*} action 
     */
    setTaskDescription(state, action) {
      state.tasks = state.tasks.map((task, index) => {
        if(task.task_id !== action.payload.id) {
          return task;
        }

        return {...task, task_description: action.payload.description };
      })
    },
    
    /**
     * Sets the date of a Task with the matching id.
     * 
     * Expected payload:
     * 
     * {
     *    id: The id of the task.
     *    date: The new date (returned from a Date Object's toISOString() function).
     * }
     * 
     * @param {*} state 
     * @param {*} action 
     */
    setTaskDate(state, action) {
      state.tasks = state.tasks.map((task, index) => {
        if(task.task_id !== action.payload.id) {
          return task;
        }

        return {...task, task_date: action.payload.newDate };
      });
    },

    toggleDate(state, action) {

    },

    /**
     * Sets the selected array to a new array with the passed in Task ID.
     * 
     * Expected payload:
     * 
     * {
     *    id: The id of the task.
     * }
     * 
     * @param {*} state 
     * @param {*} action 
     */
    setSelected(state, action) {
      state.selected = [action.payload.id];
    },

    /**
     * Adds a Task ID to the selected array.
     * 
     * Expected payload:
     * 
     * {
     *    id: The id of the task to add.
     * }
     * 
     * @param {*} state 
     * @param {*} action 
     */
    addSelected(state, action) {
      state.selected = [...state.selected, action.payload.id];
    },

    /**
     * Removes the a Task from the selected array.
     * 
     * Expected payload:
     * 
     * {
     *    id: The id of the task to remove.
     * }
     * 
     * @param {*} state 
     * @param {*} action 
     */
    removeSelected(state, action) {
      state.selected = state.selected.filter((value, index) => { 
        return value !== action.payload.id;
      });
    },

    /**
     * Clears the selected array. No payload expected.
     * @param {*} state 
     * @param {*} action 
     */
    clearSelected(state, action) {
      state.selected = [];
    }
  },

  extraReducers: {
    [getTasks.pending]: (state, action) => {
      state.status = "Loading Tasks";
    },
    [getTasks.fulfilled]: (state, action) => {
      state.tasks = action.payload;
      state.status = null;
    },
    [getTasks.rejected]: (state, action) => {
      state.status = "Failed to load tasks"
    }
  }
});

export const { 

  setTaskDescription,
  setTaskDate,

  toggleDate,

  setSelected,
  addSelected,
  removeSelected,
  clearSelected

} = tasksSlice.actions;

export default tasksSlice.reducer;