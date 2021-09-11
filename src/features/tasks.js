import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/** Returns a JSON Array of all Tasks. */
export const getAllTasks = 
  createAsyncThunk('tasks/getAllTasks', async (dispatch, thunkAPI) => {
    const response = await axios.get('/tasks/get/all');
    return response.data;
  });

/** Creates a new empty task and adds it to the database. */
export const createNewEmptyTask = 
  createAsyncThunk('tasks/createNewEmptyTask', async (dispatch, thunkAPI) => {    
    await axios.post('/tasks/new/empty');
    const response = await axios.get('/tasks/get/latest')
    return response.data[0];
  });

export const saveTasks = 
  createAsyncThunk('tasks/saveTasks', async (dispatch, thunkAPI) => {

    const tasks = thunkAPI.getState().tasks.tasks;
    const unsaved_ids = thunkAPI.getState().tasks.unsaved;
    const unsaved_tasks = tasks.filter((element) => { 
      return unsaved_ids.includes(element.task_id) 
    });

    const response = await axios.post('/tasks/save', unsaved_tasks);
    return response;
  });

/** Deletes all tasks that are currently selected */
export const deleteSelectedTasks =
  createAsyncThunk('tasks/deleteSelectedTasks', async (dispatch, thunkAPI) => {
    const state = thunkAPI.getState();
    if(state.tasks.selected.length > 0) {
      const response = await axios.delete('/tasks/delete/:selected', {
        params: {
          selected: state.tasks.selected
        }
      });

      console.log(response);
      return response;
    }
  });

export const tasksSlice = createSlice({
  name: 'tasks',
  
  initialState: {
    tasks: [],              // An Array of Task Objects
    selected: [],           // An Array of task ids representing tasks that have been selected.
    unsaved: [],            // An Array of task ids representing tasks that have been changed, but not saved.
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
      state.tasks = state.tasks.map((task, index) => {
        if(task.task_id !== action.payload.id) {
          return task;
        }

        return {...task, task_date_status: action.payload.dateToggle };
      });
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
    },

    /**
     * Add an unsaved task id to the unsaved array.
     * 
     * Expected payload: 
     *
     * {
     *    id: The id of the task that is 'unsaved'. 
     * }
     * 
     * @param {*} state 
     * @param {*} action 
     */
    addUnsaved(state, action) {
      if(!state.unsaved.includes(action.payload.id)) {
        state.unsaved = [...state.unsaved, action.payload.id];
      }
    },

    /**
     * Clears the unsaved array. No payload expected.
     * @param {*} state 
     * @param {*} action 
     */
    clearUnsaved(state, action) {
      state.unsaved = [];
    }
  },

  extraReducers: {

    /** When tasks are loading, the stauts changes to reflect that they are loading. */
    [getAllTasks.pending]: (state, action) => {
      state.status = "Loading Tasks!";
    },

    /** 
     * Sets the tasks to the payload recieved from the backend, and null
     * the status because it won't be displayed anymore.
     */
    [getAllTasks.fulfilled]: (state, action) => {
      state.tasks = action.payload;
      state.status = null;
    },

    /** If tasks fail to load, the status changes to reflect the failure. */
    [getAllTasks.rejected]: (state, action) => {
      state.status = "Failed to load tasks."
    },

    /** Creates a new empty task and adds it to the task list. */
    [createNewEmptyTask.fulfilled]: (state, action) => {
      state.tasks = [action.payload, ...state.tasks];
    },

    /** Saves all tasks in the unsaved array. */
    [saveTasks.fulfilled]: (state, action) => {
      state.unsaved = [];
    },

    /**
     * If tasks are successfully removed from database, then they are removed
     * from our local copy of the task's.
     */
    [deleteSelectedTasks.fulfilled]: (state, action) => {
      state.tasks = state.tasks.filter( value => state.selected.includes(value["task_id"]) !== true)
      state.selected = []
    },
  }
});

export const { 

  setTaskDescription,
  setTaskDate,

  toggleDate,

  setSelected,
  addSelected,
  removeSelected,
  clearSelected,

  addUnsaved,
  clearUnsaved

} = tasksSlice.actions;

export default tasksSlice.reducer;