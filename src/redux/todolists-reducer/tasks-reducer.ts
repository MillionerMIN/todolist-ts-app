import { TasksStateType } from '../../component/App/App';
import { TaskType } from '../../component/Todolist/Todolist';
import { AddTodolistAT, RemoveTodolistAT } from './todolists-reducer';

export type RemoveTaskAT = {
   type: 'REMOVE-TASK'
   taskId: string
   todolistId: string
}

export type AddTaskAT = {
   type: 'ADD-TASK'
   title: string
   todolistId: string
}

export type ChangeTaskStatusAC = {
   type: 'CHANGE-TASK-STATUS'
   id: string
   isDone: boolean
   todolistId: string
}

export type ChangeTaskTitleAC = {
   type: 'CHANGE-TASK-TITLE'
   id: string
   newTitle: string
   todolistId: string
}

export type ActionsType = RemoveTaskAT 
| AddTaskAT 
| ChangeTaskStatusAC 
| ChangeTaskTitleAC 
| AddTodolistAT 
| RemoveTodolistAT

const initialState: TasksStateType = {}

export const tasksReducer = (
   state: TasksStateType = initialState,
   action: ActionsType) => {
   switch (action.type) {
      case 'REMOVE-TASK': {
         const copyState = { ...state }
         copyState[action.todolistId] = copyState[action.todolistId].filter(task => task.id !== action.taskId)
         return copyState
      }
      case 'ADD-TASK': {
         const newTask: TaskType = { id: action.todolistId, title: action.title, isDone: false };
         return {
            ...state,
            [action.todolistId]: [newTask, ...state[action.todolistId]]
         }
      }
      case 'CHANGE-TASK-STATUS': {
         return {...state, [action.todolistId]: state[action.todolistId].map(task => {
               if (task.id === action.id) {
                  return { ...task, isDone: action.isDone }
               } else {
                  return task
               }
            })
         }
      }
      case 'CHANGE-TASK-TITLE': {
         return {...state, [action.todolistId]: state[action.todolistId].map(task => 
               task.id === action.todolistId? { ...task, title: action.newTitle } : task)
         }
      }
      case 'ADD-TODOLIST': {
         return {...state, [action.todolistId]: []}
      }
      case 'REMOVE-TODOLIST': {
         const copyState = {...state}
         delete copyState[action.id]
         return copyState
      }
      default:
         return state;
   }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskAT => {
   return {
      type: 'REMOVE-TASK',
      taskId,
      todolistId
   }
}

export const addTaskAC = (title: string, todolistId: string): AddTaskAT => {
   return { type: 'ADD-TASK', title, todolistId }
}

export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string): ChangeTaskStatusAC => {
   return { type: 'CHANGE-TASK-STATUS', id, isDone, todolistId }
}

export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string): ChangeTaskTitleAC => {
   return { type: 'CHANGE-TASK-TITLE', id, newTitle, todolistId }
}
