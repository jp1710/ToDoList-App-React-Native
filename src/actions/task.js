import { ADD_TASK, DELETE_TASK , UPDATE_TASK} from './types';

export const addTask = (payload) => (
  {
    type: ADD_TASK,
    payload
  }
);

export const deleteTask = (payload) => (
  {
    type: DELETE_TASK,
    payload
  }
);
export const updateTask=(payload)=>(
    {
    type: UPDATE_TASK,
    payload
    }
)
