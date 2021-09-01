import { Dispatch } from 'redux';
import { tasksApi, TaskStatuses, TaskType, UpdateTaskModelType } from '../../api/taskApi';
import { TasksStateType } from '../../component/App/App';
import { AppRootStateType } from '../store';
import { AddTodolistAT, RemoveTodolistAT, SetTodolistsAT } from './todolists-reducer';

export type RemoveTaskAT = {
   type: 'REMOVE-TASK'
   taskId: string
   todolistId: string
}

export type AddTaskAT = {
   type: 'ADD-TASK'
   task: TaskType
}

export type ChangeTaskStatusAC = {
   type: 'CHANGE-TASK-STATUS'
   id: string
   status: TaskStatuses
   todolistId: string
}

export type ChangeTaskTitleAC = {
   type: 'CHANGE-TASK-TITLE'
   id: string
   newTitle: string
   todolistId: string
}

export type SetTasksType = ReturnType<typeof setTasksAC>

export type ActionsType = RemoveTaskAT
   | AddTaskAT
   | ChangeTaskStatusAC
   | ChangeTaskTitleAC
   | AddTodolistAT
   | RemoveTodolistAT
   | SetTodolistsAT
   | SetTasksType

const initialState: TasksStateType = {
   /*"todolistId1": [
       { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
           startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
       { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
           startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
       { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
           startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
   ],
   "todolistId2": [
       { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
           startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
       { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
           startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
       { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
           startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
   ]*/
}

export const tasksReducer = (
   state: TasksStateType = initialState,
   action: ActionsType): TasksStateType => {
   switch (action.type) {
      case 'SET_TASKS': {
         const stateCopy = { ...state }
         stateCopy[action.todolistId] = action.tasks
         return stateCopy
      }
      case 'REMOVE-TASK': {
         const copyState = { ...state }
         copyState[action.todolistId] = copyState[action.todolistId].filter(task => task.id !== action.taskId)
         return copyState
      }
      case 'ADD-TASK': {
         const stateCopy = { ...state }
         const tasks = stateCopy[action.task.todoListId]
         const newTask = [action.task, ...tasks]
         stateCopy[action.task.todoListId] = newTask
         return stateCopy
      }
      case 'CHANGE-TASK-STATUS': {
         return {
            ...state, [action.todolistId]: state[action.todolistId].map(task => {
               if (task.id === action.id) {
                  return { ...task, status: action.status }
               } else {
                  return task
               }
            })
         }
      }
      case 'CHANGE-TASK-TITLE': {
         return {
            ...state, [action.todolistId]: state[action.todolistId].map(task =>
               task.id === action.id ? { ...task, title: action.newTitle } : task)
         }
      }
      case 'ADD-TODOLIST': {
         return { ...state, [action.todolistId]: [] }
      }
      case 'REMOVE-TODOLIST': {
         const copyState = { ...state }
         delete copyState[action.id]
         return copyState
      }
      case 'SET_TODOLISTS': {
         const stateCopy = { ...state }
         action.todolists.forEach((tl) => {
            stateCopy[tl.id] = []
         })
         return stateCopy
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

export const addTaskAC = (task: TaskType): AddTaskAT => {
   return { type: 'ADD-TASK', task }
}

export const changeTaskStatusAC = (id: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusAC => {
   return { type: 'CHANGE-TASK-STATUS', id, status, todolistId }
}

export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string): ChangeTaskTitleAC => {
   return { type: 'CHANGE-TASK-TITLE', id, newTitle, todolistId }
}

export const setTasksAC = (tasks: TaskType[], todolistId: string) => {
   return { type: 'SET_TASKS', tasks, todolistId } as const
}

//Thunk

export const fetchTasksThunk = (todolistId: string) => (dispatch: Dispatch) => {
   tasksApi.getTasks(todolistId)
      .then((res) => {
         const tasks = res.data.items
         dispatch(setTasksAC(tasks, todolistId))
      })
}

export const removeTaskThunk = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
   tasksApi.deleteTasks(todolistId, taskId)
      .then(() => {
         dispatch(removeTaskAC(taskId, todolistId))
      })
}

export const addTaskThunk = (title: string, todolistId: string) => (dispatch: Dispatch) => {
   tasksApi.creatTasks(todolistId, title)
      .then((res) => {
         let newTask = res.data.data.item
         dispatch(addTaskAC(newTask))
      })
}

export const changeTaskStatusThunk = (todolistId: string, taskId: string, status: TaskStatuses) => (dispatch: Dispatch, getState: () => AppRootStateType) => {

   const state = getState();
   const allTasks = state.tasks;
   const tasksForClickedTodo = allTasks[todolistId];
   const currentTask = tasksForClickedTodo.find(task => task.id === taskId)

   if (currentTask) {
      let model: UpdateTaskModelType = {
         title: currentTask.title,
         description: currentTask.description,
         completed: currentTask.completed,
         status: status,
         priority: currentTask.priority,
         startDate: currentTask.startDate,
         deadline: currentTask.deadline,
      }
      tasksApi.updateTasks(todolistId, taskId, model)
         .then((res) => {
            dispatch(changeTaskStatusAC(taskId, status, todolistId))
         })
   }
}

export const changeTaskTitleThunk = (todolistId: string, taskId: string, newTitle: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {

   const state = getState();
   const allTasks = state.tasks;
   const tasksForClickedTodo = allTasks[todolistId];
   const currentTask = tasksForClickedTodo.find(task => task.id === taskId)

   if (currentTask) {
      let model: UpdateTaskModelType = {
         title: newTitle,
         description: currentTask.description,
         completed: currentTask.completed,
         status: currentTask.status,
         priority: currentTask.priority,
         startDate: currentTask.startDate,
         deadline: currentTask.deadline,
      }

      tasksApi.updateTasks(todolistId, taskId, model)
         .then((res) => {
            dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))
         })
   }
}