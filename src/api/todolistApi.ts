import axios from "axios";

const instance = axios.create({
   baseURL: 'https://social-network.samuraijs.com/api/1.1/',
   withCredentials: true,
   headers: {
      'API-KEY': 'd001792c-6a9d-4195-832e-06eaa9587214'
   },
})

type TodolistType = {
   id: string
   addedDate: string
   order: number
   title: string
}

type CommontResponsType<T> = {
   data: T
   resultCode: number
   messages: number
}

export const todolistApi = {
   getTodolist() {
     return instance.get<TodolistType>('todo-lists',)
   },
   createTodolist(title: string) {
      return instance.post<CommontResponsType<{ item: TodolistType }>>('todo-lists', { title })
   },
   updateTodolist(todolistId: string, title: string) {
      return instance.put<CommontResponsType<{}>>(`todo-lists/${todolistId}`, { title})
   },
   deleteTodolist(todolistId: string) {
      return instance.delete<CommontResponsType<{}>>(`todo-lists/${todolistId}`)
   }
}