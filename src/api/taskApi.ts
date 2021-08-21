import axios from "axios";

const instance = axios.create({
   baseURL: 'https://social-network.samuraijs.com/api/1.1/',
   withCredentials: true,
   headers: {
      "API-KEY": "d1b29d5c-6533-4608-8d8c-d6c93230636b",
   },
})

type TaskType={
   id: string
   todoListId: string
   title: string
   description: string
   completed: boolean
   status: number
   priority: number
   startDate: null|string
   deadline: null | string
   order: number
   addedDate: string
}

type CommplitTasksType<T> = {
   data: T
   resultCode: number
   messages: number
}

export const tasksApi = {
   getTasks(todolistId: string){
      return instance.get<TaskType>(`todo-lists/${todolistId}/tasks`)
   },
   creatTasks(todolistId: string, title: string) {
      return instance.post<CommplitTasksType<{ item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title})
   },
   updateTasks(todolistId: string, taskId: string, title: string) {
      return instance.put<CommplitTasksType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`, { title})
   },
   deleteTasks(todolistId: string, taskId: string){
      return instance.delete<CommplitTasksType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`)
   }
}