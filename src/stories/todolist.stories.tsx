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
      const todolistId = '1002e3b9-2fee-499f-8b72-211c8be69f35';
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
      const todolistId = '1002e3b9-2fee-499f-8b72-211c8be69f35';
      const title = 'React';
      todolistApi.updateTodolist(todolistId, title)
         .then((res) => {
            setState(res.data)
         })
   }, [])
   return <div>{JSON.stringify(state)}</div>
}

