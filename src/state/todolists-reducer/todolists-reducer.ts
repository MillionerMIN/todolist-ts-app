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

export const todolistsReducer = (
   todolists: TodolistType[],
   action: ActionType) => {
   switch (action.type) {
      case 'REMOVE-TODOLIST':
         return todolists.filter(tl => tl.id !== action.id);
      case 'ADD-TODOLIST':
         const newTodolistId = action.todolistId;
         const newTodolist: TodolistType = {
            id: newTodolistId,
            title: action.title,
            filter: 'all',
         }
         return [...todolists, newTodolist];
      case 'CHANGE-TODOLIST-TITLE':
         return todolists.map(tl => tl.id === action.todolistId ? { ...tl, title: action.title } : tl)
      case 'CHANGE-TODOLIST-FILTER':
         return todolists.map(tl => tl.id === action.todolistId ? { ...tl, filter: action.newFilterValue } : tl)
      default:
         return todolists
   }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistAT => {
   return { type: 'REMOVE-TODOLIST', id: todolistId}
}

export const AddTodolistAC = (title: string): AddTodolistAT => {
   return { type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}

export const ChangeTodolistTitle = (todolistId: string, title: string): ChangeTodolistTitleAT => {
   return { type: 'CHANGE-TODOLIST-TITLE', todolistId, title }
}

export const ChangeTodolistFilter = (newFilterValue: FilterTodolistType, todolistId: string): ChangeTodolistFilterAT => {
   return { type: 'CHANGE-TODOLIST-FILTER', newFilterValue, todolistId }
}