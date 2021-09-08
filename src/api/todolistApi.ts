import { instance } from "./api"

export type TodolistType = {
   id: string
   addedDate: string
   order: number
   title: string
}

type CommontResponsType<T> = {
   data: T
   resultCode: number
   messages: string[]
}

export type ResponseType<D = {}> = {
   resultCode: number
   messages: string[]
   data: D
}

export const todolistApi = {
   getTodolists() {
      return instance.get<TodolistType[]>('todo-lists',)
   },
   createTodolist(title: string) {
      return instance.post<CommontResponsType<{ item: TodolistType }>>('todo-lists', { title })
   },
   updateTodolist(todolistId: string, title: string) {
      return instance.put<CommontResponsType<{ title: string }>>(`todo-lists/${todolistId}`, { title })
   },
   deleteTodolist(todolistId: string) {
      return instance.delete<CommontResponsType<{}>>(`todo-lists/${todolistId}`)
   }
}