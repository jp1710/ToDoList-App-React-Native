
import { connect } from 'react-redux';
import { updateTask } from '../src/actions/task';
import { ADD_TASK, DELETE_TASK, UPDATE_TASK } from '../src/actions/types';

const initialState = {
  tasks: []
}

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        //...state,
        tasks: [...state.tasks,action.payload]
        
      };
    case DELETE_TASK:
      return {
        //...state,
        tasks: handleDeleteTask(action.payload,state.tasks)
      };
      case UPDATE_TASK:
        // const tasksIndex=(item,tasks)=>{
        //   tasks.findIndex(item);
        // }
        // const updatedTask=new (action.tasks[tasksIndex]);
        // const updatedUserTask=[...state.tasks];
        // updatedUserTask[tasksIndex]=updatedTask;
        // const upd=[state.tasks]
        return{
          //...state,
          
          tasks:handleUpdateTask(action.payload,state.tasks)
        };
    default:
      return state;
  }
}
const handleDeleteTask=(item,tasks)=> {
  const taskIndex=tasks.indexOf(item);
  tasks.splice(taskIndex,1);
  return tasks;
}
const handleUpdateTask=(item,tasks)=>{
  //console.log(item)
  
  const remove=tasks.findIndex(task=>
    (task.task===item.oldData.task))
    console.log(tasks)
    tasks.splice(remove,1);
  const updVal={
      id:item.id,
      task:item.task,
      Date:item.Date,
      Time:item.Time
  }
  tasks.push(updVal);
  return tasks;
  }
  // const taskValues=tasks.map(
  //   tasks=>{
  //     if(item.id!==tasks.id){
  //       return{
  //         ...tasks,
          
  //       }
  //   }
  //     return tasks
  //     // tasks=tasks.splice(taskIndex,1),
  //     //...tasks,
      
  //   }
    
  // )
  // const taskIndex=tasks.indexOf(item);
  // tasks[taskIndex].Date=item.Date
  // tasks[taskIndex].Time=item.Time
  // tasks[taskIndex].task=item.task
  // tasks[taskIndex].id=item.id
  
  
  
  

  // const updatedTask=new(action.tasks[tasksIndex]);
  // const updatedUserTask=[...state.tasks];
  // updatedUserTask[tasksIndex]=updatedTask;
  


export default taskReducer;