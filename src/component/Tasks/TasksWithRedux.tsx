import { Checkbox, IconButton, Tooltip } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";

import { EditableSpan } from "../EditableSpan/EditableSpan";
import { TaskType } from "../Todolist/Todolist";

import s from './Tasks.module.css';
import { removeTaskAC, changeTaskStatusAC, changeTaskTitleAC } from '../../redux/todolists-reducer/tasks-reducer';

type TaskPropsType = {
   todolistId: string
   task: TaskType
}


export const TasksWithRedux = React.memo(
   (props: TaskPropsType) => {
      console.log('Task call');

      // const task = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

      const dispatch = useDispatch();

      const onClickHandler = () => {
         const action = removeTaskAC(props.task.id, props.todolistId)
         dispatch(action);
      }

      const onChangStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
         let newIsDoneValue = e.currentTarget.checked;
         const action = changeTaskStatusAC(props.task.id, newIsDoneValue, props.todolistId)
         dispatch(action)
      }
      const onChangeValueHandler = (newTitle: string) => {
         const action = changeTaskTitleAC(props.task.id, newTitle, props.todolistId)
         dispatch(action)
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