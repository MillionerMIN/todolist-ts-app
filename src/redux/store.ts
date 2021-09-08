import { TaskActionsType, tasksReducer } from './todolists-reducer/tasks-reducer';
import { TodolistActionType, todolistsReducer } from './todolists-reducer/todolists-reducer';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import { appReducer, AppReducerActionType } from './app-reducer';

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
   tasks: tasksReducer,
   todolists: todolistsReducer,
   app: appReducer,
})
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunk));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
//типизатия всех экшенов для всего App
export type AppActionType = TodolistActionType
   | TaskActionsType
   | AppReducerActionType
//типизация для всех thunk
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   AppRootStateType,
   unknown,
   AppActionType
>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store