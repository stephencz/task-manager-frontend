import {
  sortTasksByDefault, 
  sortTasksByTag,
  sortTasksByDescription
} from './features/tasks';

const sortTasks = (dispatch, mode, task_tags, tags) => {
  if(mode === 'default' || mode === 'date') {
    dispatch(sortTasksByDefault({task_tags: task_tags, tags: tags }));
  }

  if(mode === 'description') {
    dispatch(sortTasksByDescription())
  }

  if(mode === 'tag') {
    dispatch(sortTasksByTag({task_tags: task_tags, tags: tags }));
  }
}

export default sortTasks;