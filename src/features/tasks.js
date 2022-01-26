import { createSlice } from '@reduxjs/toolkit';

/**
 * Sorts tasks by their date from oldest to newest.
 * @param {*} tasks 
 */
const sortByDate = (tasks) => {
  // Sort date portion from earliest to latest
  tasks.sort((a, b) => {
    let dateA = new Date(a.task_date);
    let dateB = new Date(b.task_date);

    if(dateA < dateB) return -1;
    if(dateA > dateB) return 1;

    return 0;
  });
}

/**
 * Sorts tasks alphabetically by tag
 * @param {*} tasks 
 * @param {*} task_tags 
 * @param {*} tags 
 * @returns 
 */
const sortAlphabeticallyByTag = (tasks, task_tags, tags) => {
  return tasks.sort((a, b) => {

    // Get task_tag objects belonging to task a
    let a_tags = task_tags.filter((x) => {
      if(a.task_id === x.task_id) {
        return x.tag_id;
      }

      return false;
    });

    // Get task_tag objects belonging to task b
    let b_tags = task_tags.filter((x) => {
      if(b.task_id === x.task_id) {
        return x.tag_id;
      }

      return false;
    });

    // If either task a or b doesn't have a tag push it to the bottom
    if(a_tags.length <= 0 || b_tags.length <= 0){
      if(a_tags.length <= 0) {
        return 1;
      } else {
        return -1;
      }
    }

    else {
      // Get tag objects matching a's task_tags
      let a_text = tags.filter((x) => {
        if(a_tags[0].tag_id === x.tag_id) {
          return x
        }

        return false;
      })

      // Get tag objects matching b's task_tags
      let b_text = tags.filter((x) => {
        if(b_tags[0].tag_id === x.tag_id) {
          return x
        }

        return false;
      });

      // Sort on text.
      let a_lower = a_text[0].tag_text.toLowerCase();
      let b_lower = b_text[0].tag_text.toLowerCase();

      if(a_lower < b_lower) return -1;
      if(a_lower > b_lower) return 1;

      return 0;
    }
  });
}

/**
 * Sorts the tasks alphabetically by their description.
 * @param {*} tasks 
 * @param {*} task_tags 
 * @param {*} tags 
 * @returns 
 */
const sortAlphabeticallyByDescription = (tasks) => {
  return tasks.sort((a, b) => {

    let a_lower = a.task_description.toLowerCase()
    let b_lower = b.task_description.toLowerCase()

    if(a_lower < b_lower) return -1;
    if(a_lower > b_lower) return 1;

    return 0;
  });
}

/**
 * FOR THE FRONTEND DEMO ONLY: Generates the next task id.
 * @param {*} tasks The array of tasks.
 * @returns integer
 */
const getNextTaskID = (tasks) => {
  if(tasks.length <= 0) {
    return 1;
  } else {
    let max = 0;
    tasks.forEach(task => {
      if(task.task_id > max) {
        max = task.task_id
      }
    })

    return max + 1;
  }
}

export const tasksSlice = createSlice({
  name: 'tasks',
  
  initialState: {
    tasks: [],              // An Array of Task Objects
    selected: [],           // An Array of task ids representing tasks that have been selected.
    unsaved: [],            // An Array of task ids representing tasks that have been changed, but not saved.
    status: null,           // The status of task loading.
    sort_mode: 'default',   // Which sort mode the task manager is in.
    show_mode: 'all'        // Which show mode the task manager is in.
  },
  
  reducers: {

    createNewEmptyTask(state, action) {
      state.tasks = [...state.tasks, {
        task_id: getNextTaskID(state.tasks),
        task_date: null,
        task_description: "Describe your task here...",
      }]

      //Clear selected tasks.
      state.selected = [];
    },

    deleteSelectedTasks(state, action) {
      if(state.selected.length > 0) {
        state.tasks = state.tasks.filter((task) => {
          if(state.selected.includes(task.task_id)) {
            return false;
          }

          return true;
        })
      }
    },

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
    },

    /**
     * Sets the sort mode of the task manager.
     * @param {*} state 
     * @param {*} action 
     */
    setSortMode(state, action) {
      state.sort_mode = action.payload;
    },

    setShowMode(state, action) {
      state.show_mode = action.payload;
    },

    sortTasksByDefault(state, action) {

      let task_tags = action.payload.task_tags;
      let tags = action.payload.tags;

      let hasDate = [];
      let noDate = [];

      //Dividing tasks into tags with dates and tasks without dates.
      state.tasks.forEach((x) => {
        if(x.task_date !== null) {
          hasDate.push(x);
        } else {
          noDate.push(x);
        }
      });

      sortAlphabeticallyByTag(noDate, task_tags, tags);
      sortByDate(hasDate);

      //Set tasks to combined array
      state.tasks = [...hasDate, ...noDate];
    },

    sortTasksByTag(state, action) {

      let task_tags = action.payload.task_tags;
      let tags = action.payload.tags;
  
      state.tasks = sortAlphabeticallyByTag(state.tasks, task_tags, tags);
    },

    sortTasksByDescription(state, action) {
      state.tasks = sortAlphabeticallyByDescription(state.tasks);
    },

    filterForSearch(state, action) {
      state.tasks = state.tasks.map((x) => {
        if(x.task_description.includes(action.payload.text)) {
          return {...x, hidden: false}
        } else {
          return {...x, hidden: true}
        }
      })
    },

    filterForShowMode(state, action) {

      let mode = action.payload.mode;
      let task_tags = action.payload.task_tags;
      let tags = action.payload.task_tags;

      if(mode == -1) {
        state.tasks = state.tasks.map((x) => {
          return { ...x, hidden: false };
        });
      } else {

        state.tasks = state.tasks.map((i) => {
          let ids = task_tags.filter((j) => {

            return j.tag_id == mode && i.task_id == j.task_id;
          })

          if(ids.length > 0) {
            return {...i, hidden: false };
          } else {
            return {...i, hidden: true };
          }
        })
        
      }
    },

    addDemoTasks(state, action) {
      state.tasks = [
        {
          task_id: 1,
          task_description: "Welcome to Task Manager! A full stack web application built by Stephen Czekalski. This is a frontend only live demo. ",
          task_date: null
        },
        {
          task_id: 2,
          task_description: "Click new task to create a new empty task, or a new tag by clicking add tag in the tag manager.",
          task_date: null
        },
        {
          task_id: 3,
          task_description: "Add a date to a task by clicking the clock icon to the right, or a tag by clicking the plus.",
          task_date: null
        },
        {
          task_id: 4,
          task_description: "Delete a task by clicking the trash can icon, and delete tags by selecting a tag and clicking remove tag.",
          task_date: null
        },
        {
          task_id: 5,
          task_description: "Select task or tag items by clicking the nine dots to the left. Holding shift or control will let you select multiple items.",
          task_date: null
        }
      ]
    }
  }
});

export const { 

  createNewEmptyTask,
  deleteSelectedTasks,

  setTaskDescription,
  setTaskDate,

  toggleDate,

  setSelected,
  addSelected,
  removeSelected,
  clearSelected,

  addUnsaved,
  clearUnsaved,

  setSortMode,
  setShowMode,

  sortTasksByDefault,
  sortTasksByDescription,
  sortTasksByTag,

  filterForSearch,
  filterForShowMode,

  addDemoTasks

} = tasksSlice.actions;

export default tasksSlice.reducer;