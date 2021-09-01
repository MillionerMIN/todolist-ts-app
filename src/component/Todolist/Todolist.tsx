import React, { useCallback, useEffect } from 'react';
import { AddItemForm } from '../AddItemForm/AddItemForm';
import s from './Todolist.module.css';
import { EditableSpan } from '../EditableSpan/EditableSpan';
import { Button, IconButton, Tooltip } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { TasksWithRedux } from '../Tasks/Tasks';
import { useDispatch } from 'react-redux';
import { fetchTasksThunk } from '../../redux/todolists-reducer/tasks-reducer';
import { TaskStatuses, TaskType } from '../../api/taskApi';
import { FilterTodolistType } from '../../redux/todolists-reducer/todolists-reducer';

type TodolistType = {
    id: string
    title: string
    tasks: Array<TaskType>
    addTask: (title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterTodolistType, todolistsId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTitleTask: (id: string, newTitle: string, todolistId: string) => void
    filter: FilterTodolistType
    removeTodolist: (id: string) => void
    changeTitleTodolist: (newTitle: string, todolistId: string) => void
}

export const Todolist = React.memo(({
    id,
    title,
    tasks,
    addTask,
    changeTitleTodolist,
    changeFilter,
    removeTodolist,
    removeTask,
    changeTaskStatus,
    changeTitleTask,
    ...props }: TodolistType) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTasksThunk(id))
    }, [dispatch, id])

    const onAddTask = useCallback((title: string) => {
        addTask(title, id)
    }, [addTask, id]);

    const onRemoveTodolist = useCallback(() => {
        removeTodolist(id)
    }, [removeTodolist, id])

    const onChangeTitleTodolist = useCallback((newTitle: string) => {
        changeTitleTodolist(newTitle, id)
    }, [changeTitleTodolist, id])

    const allClickHandler = useCallback(() => {
        changeFilter('all', id)
    }, [changeFilter, id])

    const activeClickHandler = useCallback(() => {
        changeFilter('active', id)
    }, [changeFilter, id])

    const completedClickHandler = useCallback(() => {
        changeFilter('completed', id)
    }, [changeFilter, id])

    let tasksForTodolist = tasks

    if (props.filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return <div className={s.wrapper}>
        <h3>
            <EditableSpan
                value={title}
                onChange={onChangeTitleTodolist} />
            <Tooltip title="Delete">
                <IconButton onClick={onRemoveTodolist}>
                    <Delete />
                </IconButton>
            </Tooltip>
        </h3>
        <AddItemForm addItem={onAddTask} />
        <div>
            {tasksForTodolist.map(t => <TasksWithRedux key={t.id} task={t} todolistId={id}
                onRemoveTask={removeTask}
                onChangeTaskStatus={changeTaskStatus}
                onChangeTitle={changeTitleTask}
            />)
            }
        </div>
        <div>
            <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                onClick={allClickHandler}
                color='default'
            >All</Button>
            <Button className={props.filter === 'active' ? s.active_filter : ''}
                variant={props.filter === 'active' ? 'outlined' : 'text'}
                onClick={activeClickHandler}
                color='primary'
            >Active</Button>
            <Button className={props.filter === 'completed' ? s.active_filter : ''}
                variant={props.filter === 'completed' ? 'outlined' : 'text'}
                onClick={completedClickHandler}
                color='secondary'
            >Completed</Button>
        </div>
    </div>
}
)