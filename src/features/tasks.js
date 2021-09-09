import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/**
 * Returns a JSON Array containing all tasks.
 */
export const getAllTasks = 
  createAsyncThunk('tasks/getAllTasks', async (dispatch, thunkAPI) => {
    const response = await axios.get('/tasks/get/all');
    return response.data;
  });

export const saveAllTasks =
  createAsyncThunk('tasks/saveAllTasks', async (dispatch, thunkAPI) => {

  });

export const createNewEmptyTask = 
  createAsyncThunk('tasks/createNewEmptyTask', async (dispatch, thunkAPI) => {    
    const post = await axios.post('/tasks/new/empty');
    const response = await axios.get('/tasks/get/latest')
    return response.data[0];
  });

export const deleteSelectedTasks =
  createAsyncThunk('tasks/deleteSelectedTasks', async (dispatch, thunkAPI) => {
    const state = thunkAPI.getState();
    if(state.tasks.selected.length > 0) {
      const res = await axios.delete('/tasks/delete/:selected', {
        params: {
          selected: state.tasks.selected
        }
      });

      return res;
    }
  });

export const tasksSlice = createSlice({
  name: 'tasks',
  
  initialState: {
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
    [getAllTasks.pending]: (state, action) => {
      state.status = "Loading Tasks!";
    },
    [getAllTasks.fulfilled]: (state, action) => {
      state.tasks = action.payload;
      state.status = null;
    },
    [getAllTasks.rejected]: (state, action) => {
      state.status = "Failed to load tasks."
    },

    [createNewEmptyTask.pending]: (state, action) => { },
    [createNewEmptyTask.fulfilled]: (state, action) => {
      state.tasks = [action.payload, ...state.tasks];
    },
    [createNewEmptyTask.rejected]: (state, action) => { },

    [deleteSelectedTasks.pending]: (state, action) => {},
    [deleteSelectedTasks.fulfilled]: (state, action) => {

      
      state.tasks = state.tasks.filter( value => state.selected.includes(value["task_id"]) !== true)

      state.selected = []
    },
    [deleteSelectedTasks.rejected]: (state, action) => {},
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