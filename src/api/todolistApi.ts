import axios from "axios";

const instance = axios.create({
   baseURL: 'https://social-network.samuraijs.com/api/1.1/',
   withCredentials: true,
   headers: {
      "API-KEY": "d1b29d5c-6533-4608-8d8c-d6c93230636b"
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