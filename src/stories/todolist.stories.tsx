import React, { useState, useEffect } from "react";
import { todolistApi } from '../api/todolistApi';



export default {
   title: 'API'
}

export const GetTodolist = () => {
   const [state, setState] = useState<any>(null)

   useEffect(() => {
      todolistApi.getTodolist()
         .then((res) => {
            setState(res.data)
         })
   }, [])
   return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      todolistApi.createTodolist('TodoListNEW')
         .then((res) => {
            setState(res.data);
         }).catch((err) => {
         })
   }, [])
   return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
   const [state, setState] = useState<any>(null);
   useEffect(() => {
      const todolistId = '26636fb3-3257-4ce0-bd13-1556ea64c9fa';
      todolistApi.deleteTodolist(todolistId)
         .then((res) => {
            setState(res.data);
         })
   }, [])
   return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolist = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      const todolistId = 'eb1dacae-a1be-47da-bbc4-8e043ed76203';
      const title = 'React';
      todolistApi.updateTodolist(todolistId, title)
         .then((res) => {
            setState(res.data)
         })
   }, [])
   return <div>{JSON.stringify(state)}</div>
}

