import { instance } from "./api"

export type TaskType={
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

export enum TaskStatuses {
   New = 0,
   InProgress = 1,
   Completed = 2,
   Draft = 3
}

type CommplitTasksType<T> = {
   data: T
   resultCode: number
   messages: number
}

type GetTasksRespons = {
   error: null | string
   totalCount: number
   items: TaskType[]
}

export type UpdateTaskModelType = {
   title: string
   description: string
   completed: boolean
   status: number
   priority: number
   startDate: string | null
   deadline: string | null
}

export const tasksApi = {
   getTasks(todolistId: string){
      return instance.get<GetTasksRespons>(`todo-lists/${todolistId}/tasks`)
   },
   creatTasks(todolistId: string, title: string) {
      return instance.post<CommplitTasksType<{ item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title})
   },
   updateTasks(todolistId: string, taskId: string, model: UpdateTaskModelType) {
      return instance.put<CommplitTasksType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, { ...model})
   },
   deleteTasks(todolistId: string, taskId: string){
      return instance.delete<CommplitTasksType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`)
   }
}