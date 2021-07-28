import { v1 } from 'uuid';
import { FilterTodolistType, TodolistType } from '../../component/App/App';

export type RemoveTodolistAT = {
   type: 'REMOVE-TODOLIST'
   id: string
}

export type AddTodolistAT = {
   type: 'ADD-TODOLIST'
   title: string
   todolistId: string
}

type ChangeTodolistTitleAT = {
   type: 'CHANGE-TODOLIST-TITLE'
   title: string
   todolistId: string
}

type ChangeTodolistFilterAT = {
   type: 'CHANGE-TODOLIST-FILTER'
   newFilterValue: FilterTodolistType
   todolistId: string
}

export type ActionType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT

const initialState: Array<TodolistType> = []

export const todolistsReducer = (
   state: TodolistType[] = initialState,
   action: ActionType) => {
   switch (action.type) {
      case 'REMOVE-TODOLIST':
         return state.filter(tl => tl.id !== action.id);
      case 'ADD-TODOLIST':
         const newTodolistId = action.todolistId;
         const newTodolist: TodolistType = {
            id: newTodolistId,
            title: action.title,
            filter: 'all',
         }
         return [...state, newTodolist];
      case 'CHANGE-TODOLIST-TITLE':
         return state.map(tl => tl.id === action.todolistId ? { ...tl, title: action.title } : tl)
      case 'CHANGE-TODOLIST-FILTER':
         return state.map(tl => tl.id === action.todolistId ? { ...tl, filter: action.newFilterValue } : tl)
      default:
         return state
   }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistAT => {
   return { type: 'REMOVE-TODOLIST', id: todolistId}
}

export const addTodolistAC = (title: string): AddTodolistAT => {
   return { type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}

export const changeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleAT => {
   return { type: 'CHANGE-TODOLIST-TITLE', todolistId, title }
}

export const changeTodolistFilterAC = (newFilterValue: FilterTodolistType, todolistId: string): ChangeTodolistFilterAT => {
   return { type: 'CHANGE-TODOLIST-FILTER', newFilterValue, todolistId }
}