import { Checkbox, IconButton, Tooltip } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React, { ChangeEvent } from "react";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import { TaskType } from "../Todolist/Todolist";

import s from './Tasks.module.css';

type TaskPropsType = {
   todolistId: string
   task: TaskType
   onAddTask: (title: string, todolistId: string) => void
   onRemoveTask: (taskId: string, todolistId: string) => void
   onChangeStatus: (id: string, isDone: boolean, todolistId: string) => void
   onChangeValue: (id: string, newTitle: string, todolistId: string) => void 
}
   

 export const Tasks = React.memo(
    (props: TaskPropsType ) => {
       const onClickHandler = () => props.onRemoveTask(props.task.id, props.todolistId);
       const onChangStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
          let newIsDoneValue = e.currentTarget.checked;
          props.onChangeStatus(props.task.id, newIsDoneValue, props.todolistId);
       }
       const onChangeValueHandler = (newTitle: string) => {
          props.onChangeValue(props.task.id, newTitle, props.todolistId)
       }
      
      return <div className={props.task.isDone ? s.is_done : ''}>
         <Checkbox color="primary" checked={props.task.isDone} onChange={onChangStatusHandler} />
         <EditableSpan
            value={props.task.title}
            onChange={onChangeValueHandler}
         />
         <Tooltip title="Delete">
            <IconButton onClick={onClickHandler}>
               <Delete />
            </IconButton>
         </Tooltip>
      </div>

   }
)