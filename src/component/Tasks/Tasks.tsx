import { Checkbox, IconButton, Tooltip } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React, { ChangeEvent, useCallback } from "react";
import { EditableSpan } from "../EditableSpan/EditableSpan";

import s from './Tasks.module.css';
import { TaskType, TaskStatuses } from '../../api/taskApi';

type TaskPropsType = {
   todolistId: string
   task: TaskType
   onRemoveTask: (taskId: string, todolistId: string) => void
   onChangeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
   onChangeTitle: (taskId: string, newTitle: string, todolistId: string) => void
}


export const TasksWithRedux = React.memo((props: TaskPropsType) => {
   const { todolistId, task, onRemoveTask, onChangeTaskStatus, onChangeTitle } = props
   const onClickHandler = useCallback(() => {
      onRemoveTask(task.id, todolistId)
   }, [onRemoveTask, task.id, todolistId])

   const onChangStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      let newIsDoneValue = e.currentTarget.checked
      onChangeTaskStatus(task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, todolistId)
   }, [onChangeTaskStatus, task.id, todolistId])

   const onChangeTitleHandler = useCallback((newTitle: string) => {
      onChangeTitle(task.id, newTitle, todolistId)
   }, [onChangeTitle, task.id, todolistId])


   return <div key={task.id} className={task.status === TaskStatuses.Completed ? s.is_done : ''}>
      <Checkbox color="primary"
         checked={task.status === TaskStatuses.Completed}
         onChange={onChangStatusHandler} />
      <EditableSpan
         value={task.title}
         onChange={onChangeTitleHandler}
      />
      <Tooltip title="Delete">
         <IconButton onClick={onClickHandler}>
            <Delete />
         </IconButton>
      </Tooltip>
   </div>

}
)