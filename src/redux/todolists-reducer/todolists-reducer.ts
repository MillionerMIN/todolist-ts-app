import { Dispatch } from 'redux';
import { v1 } from 'uuid';
import { todolistApi, TodolistType } from '../../api/todolistApi';
import { AppThunk, AppRootStateType } from '../store';

export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>
export type AddTodolistAT = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsAT = ReturnType<typeof setTodolistsAC>

export type TodolistActionType = RemoveTodolistAT
   | AddTodolistAT
   | ChangeTodolistTitleAT
   | ChangeTodolistFilterAT
   | SetTodolistsAT

const initialState: Array<TodolistDomainType> = []

export type FilterTodolistType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
   filter: FilterTodolistType
}

export const todolistsReducer = (
   state: TodolistDomainType[] = initialState,
   action: TodolistActionType): TodolistDomainType[] => {
   switch (action.type) {
      case 'REMOVE-TODOLIST':
         return state.filter(tl => tl.id !== action.id);
      case 'ADD-TODOLIST':
         return [{
            id: action.todolistId,
            title: action.title,
            addedDate: '',
            order: 0,
            filter: 'all',
         }, ...state]
      case 'CHANGE-TODOLIST-TITLE':
         return state.map(tl => tl.id === action.todolistId ? { ...tl, title: action.title } : tl)
      case 'CHANGE-TODOLIST-FILTER':
         return state.map(tl => tl.id === action.todolistId ? { ...tl, filter: action.newFilterValue } : tl)
      case 'SET_TODOLISTS': {
         return action.todolists.map((tl) => {
            return { ...tl, filter: 'all' }
         })
      }
      default:
         return state
   }
}

export const removeTodolistAC = (todolistId: string) => {
   return { type: 'REMOVE-TODOLIST', id: todolistId } as const
}

export const addTodolistAC = (title: string) => {
   return { type: 'ADD-TODOLIST', title: title, todolistId: v1() } as const
}

export const changeTodolistTitleAC = (todolistId: string, title: string) => {
   return { type: 'CHANGE-TODOLIST-TITLE', todolistId, title } as const
}

export const changeTodolistFilterAC = (newFilterValue: FilterTodolistType, todolistId: string) => {
   return { type: 'CHANGE-TODOLIST-FILTER', newFilterValue, todolistId } as const
}

export const setTodolistsAC = (todolists: TodolistType[]) => {
   return { type: 'SET_TODOLISTS', todolists } as const
}

//Thuk 
export const fetchTodolistThunk = (): AppThunk => (dispatch) => {
   todolistApi.getTodolists()
      .then((res) => {
         dispatch(setTodolistsAC(res.data))
      })
}

export const deleteTodolistThunk = (todolistId: string): AppThunk => (dispatch) => {
   todolistApi.deleteTodolist(todolistId)
      .then(() => {
         dispatch(removeTodolistAC(todolistId))
      })
}

export const addTodolistThunk = (title: string): AppThunk => (dispatch) => {
   todolistApi.createTodolist(title)
      .then((res) => {
         let newTodo = res.data.data.item.title
         dispatch(addTodolistAC(newTodo))
      })
}

export const changeTodolistTitleThunk = (todolistId: string, title: string): AppThunk => (dispatch) => {
   todolistApi.updateTodolist(todolistId, title)
      .then((res) => {
         dispatch(changeTodolistTitleAC(todolistId, title))
      })
}
