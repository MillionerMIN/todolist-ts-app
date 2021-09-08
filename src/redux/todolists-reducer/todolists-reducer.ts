import { AxiosError } from 'axios';
import { todolistApi, TodolistType } from '../../api/todolistApi';
import { setAppStatus, RequestStatusType } from '../app-reducer';
import { AppThunk } from '../store';
import { handleServerNetworkError, handleServerAppError } from '../../utils/error-utils';

export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>
export type AddTodolistAT = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsAT = ReturnType<typeof setTodolistsAC>
export type ChangeEntityStatusAT = ReturnType<typeof changeTodolistEntityStatus>

export type TodolistActionType = RemoveTodolistAT
   | AddTodolistAT
   | ChangeTodolistTitleAT
   | ChangeTodolistFilterAT
   | SetTodolistsAT
   | ChangeEntityStatusAT

const initialState: Array<TodolistDomainType> = []

export type FilterTodolistType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
   filter: FilterTodolistType,
   entityStatus: RequestStatusType
}

export const todolistsReducer = (
   state: TodolistDomainType[] = initialState,
   action: TodolistActionType): TodolistDomainType[] => {
   switch (action.type) {
      case 'REMOVE-TODOLIST':
         return state.filter(tl => tl.id !== action.id);
      case 'ADD-TODOLIST':
         return [{...action.todolist, filter: 'all',entityStatus: 'idle'}, ...state]
      case 'CHANGE-TODOLIST-TITLE':
         return state.map(tl => tl.id === action.todolistId ? { ...tl, title: action.title } : tl)
      case 'CHANGE-TODOLIST-FILTER':
         return state.map(tl => tl.id === action.todolistId ? { ...tl, filter: action.newFilterValue } : tl)
      case 'SET_TODOLISTS':
         return action.todolists.map((tl) => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
      case 'CHANGE-TODOLIST-ENTITY-STATUS': {
         return state.map(tl => tl.id === action.id ? ({ ...tl, entityStatus: action.entityStatus }) : tl)
      }
      default:
         return state
   }
}

export const removeTodolistAC = (todolistId: string) => {
   return { type: 'REMOVE-TODOLIST', id: todolistId } as const
}

export const addTodolistAC = (todolist: TodolistType) => {
   return { type: 'ADD-TODOLIST', todolist } as const
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

export const changeTodolistEntityStatus = (id: string, entityStatus: RequestStatusType) => ({ type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, entityStatus } as const)

//Thuk 
export const fetchTodolistThunk = (): AppThunk => (dispatch) => {
   dispatch(setAppStatus('loading'))
   todolistApi.getTodolists()
      .then((res) => {
         dispatch(setTodolistsAC(res.data))
         dispatch(setAppStatus('succeeded'))
      })
      .catch((err: AxiosError) => {
         handleServerNetworkError(err.message, dispatch)
      })
}

export const deleteTodolistThunk = (todolistId: string): AppThunk => (dispatch) => {
   dispatch(setAppStatus('loading'))
   dispatch(changeTodolistEntityStatus(todolistId, 'loading'))
   todolistApi.deleteTodolist(todolistId)
      .then((res) => {
         if (res.data.resultCode === 0) {
            dispatch(removeTodolistAC(todolistId))
            dispatch(setAppStatus('succeeded'))
            dispatch(changeTodolistEntityStatus(todolistId, 'succeeded'))
         } else {
            handleServerAppError<{}>(res.data, dispatch)
         }
      })
      .catch((err: AxiosError) => {
         handleServerNetworkError(err.message, dispatch)
      })
}

export const addTodolistThunk = (title: string): AppThunk => (dispatch) => {
   dispatch(setAppStatus('loading'))
   todolistApi.createTodolist(title)
      .then((res) => {
         if (res.data.resultCode === 0) {
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(setAppStatus('succeeded'))
         } else {
            handleServerAppError<{ item: TodolistType }>(res.data, dispatch)
         }
      })
      .catch((err: AxiosError) => {
         debugger
         handleServerNetworkError(err.message, dispatch)
      })
}

export const changeTodolistTitleThunk = (todolistId: string, title: string): AppThunk => (dispatch) => {
   dispatch(setAppStatus('loading'))
   todolistApi.updateTodolist(todolistId, title)
      .then((res) => {
         if (res.data.resultCode === 0) {
            dispatch(changeTodolistTitleAC(todolistId, title))
            dispatch(setAppStatus('succeeded'))
         } else {
            handleServerAppError<{ title: string }>(res.data, dispatch)
         }
      })
      .catch((err: AxiosError) => {
         handleServerNetworkError(err.message, dispatch)
      })
}
