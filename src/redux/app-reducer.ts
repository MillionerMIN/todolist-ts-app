import { AppActionType } from "./store"

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type InitialStateType = typeof initialState

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as null | string
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionType) => {
  switch (action.type) {
    case 'APP/SET-STATUS': {
      return { ...state, status: action.status }
    }
    case 'APP/SET-ERROR': {
      return { ...state, error: action.error }
    }
    default:
      return state
  }
}

export const setAppStatus = (status: RequestStatusType) => ({ type: 'APP/SET-STATUS', status } as const);
export const setAppError = (error: null | string) => ({ type: 'APP/SET-ERROR', error } as const);


export type SetAppStatusAT = ReturnType<typeof setAppStatus>
export type SetAppErrorAT = ReturnType<typeof setAppError>

export type AppReducerActionType = SetAppStatusAT
  | SetAppErrorAT