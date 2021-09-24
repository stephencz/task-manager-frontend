import {
  sortTasksByDefault
} from './features/tasks';

const sortTasks = (dispatch, mode, task_tags, tags) => {
  if(mode === 'default') {
    dispatch(sortTasksByDefault({task_tags: task_tags, tags: tags }));
  }
}

export default sortTasks;