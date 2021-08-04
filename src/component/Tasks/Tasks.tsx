import { Checkbox, IconButton, Tooltip } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import { TaskType } from "../Todolist/Todolist";
import s from './Tasks.module.css';

type TaskaType = {
   todolistId: string
   task: TaskType
   onChangeStatus: (id: string, isDone: boolean, todolistId: string) => void
}

 export const Tasks = React.memo(
   ({ task, ...props}: TaskaType) => {
      // const onClickHandler = () => props.onRemoveTask(t.id, id);
      // // const onChangStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
      //    let newIsDoneValue = e.currentTarget.checked;
      //    props.onChangeStatus(t.id, newIsDoneValue, id);
      // }
      // const onChangeValueHandler = (newTitle: string) => {
      //    props.onChangeValue(t.id, newTitle, id)
      // }

      return <div key={task.id} className={task.isDone ? s.is_done : ''}>
         <Checkbox color="primary" checked={task.isDone} onChange={onChangStatusHandler} />
         <EditableSpan
            value={task.title}
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