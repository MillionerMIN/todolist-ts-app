import { Dispatch } from 'redux';
import { ResponseType } from '../api/todolistApi';
import { setAppError, SetAppErrorAT, setAppStatus, SetAppStatusAT } from '../redux/app-reducer';


// generic function 
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
  if (data.messages.length) {
    debugger
    dispatch(setAppError(data.messages[0]))
  } else {
    dispatch(setAppError('Some error occurred'))
  }
  dispatch(setAppStatus('failed'))
}

export const handleServerNetworkError = (message: string, dispatch: ErrorUtilsDispatchType) => {
  dispatch(setAppError(message))
  dispatch(setAppStatus('failed'))
}

type ErrorUtilsDispatchType = Dispatch<SetAppErrorAT | SetAppStatusAT>