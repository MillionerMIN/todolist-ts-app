import React, { useState, useEffect } from "react";
import { tasksApi } from "../api/taskApi";


export default {
   title: 'API'
}


export const GetTasks = () => {
   const [state, setState] = useState<any>(null);

   useEffect(() => {
      const todolistId = '26636fb3-3257-4ce0-bd13-1556ea64c9fa'
      tasksApi.getTasks(todolistId)
         .then((res) => {
            setState(res.data)
         })
   }, [])
   return <div>{JSON.stringify(state)}</div>
}

export const CreateTasks = () => {
   const [state, setState] = useState<any>(null);

   useEffect(() => {
      const todolistId = 'ec2f4e76-13e5-4c91-a1ad-8279cb8151b0';
      const title = 'NEW task';
      tasksApi.creatTasks(todolistId, title)
         .then((res) => {
            setState(res.data)
         })
         .catch((err) => {

         })
   }, []);
   return <div>{JSON.stringify(state)}</div>
}

export const UpdateTasks = () => {
   const [state, setState] = useState<any>(null);

   useEffect(() => {
      const todolistId = 'ec2f4e76-13e5-4c91-a1ad-8279cb8151b0';
      const taskId ='6a3cdb71-0bb7-43de-8d50-d734587d598e'
      const title = 'Rename NEW task';
      tasksApi.updateTasks(todolistId, taskId, title)
         .then((res) => {
            setState(res.data)
         })
   }, [])
   return <div>{JSON.stringify(state)}</div>
}

export const DeleteTasks = () => {
   const [state, setState]=useState<any>(null)

   useEffect(() => {
      const todolistId = '26636fb3-3257-4ce0-bd13-1556ea64c9fa';
      const taskId = '89234fe7-7581-4b40-beab-337684056fb9';
      tasksApi.deleteTasks(todolistId, taskId)
      .then((res)=>{
setState(res.data)
      })
   }, []);
   return <div>{JSON.stringify(state)}</div>
}

