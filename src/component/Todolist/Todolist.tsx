import React, { useCallback } from 'react';
import { AddItemForm } from '../AddItemForm/AddItemForm';
import { FilterTodolistType } from '../App/App';
import s from './Todolist.module.css';
import { EditableSpan } from '../EditableSpan/EditableSpan';
import { Button, IconButton, Tooltip } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { Tasks } from '../Tasks/Tasks';

type TodolistType = {
    id: string
    title: string
    tasks: Array<TaskType>
    onAddTask: (title: string, todolistId: string) => void
    onRemoveTask: (taskId: string, todolistId: string) => void
    onChangeFilter: (value: FilterTodolistType, todolistsId: string) => void
    onChangeStatus: (id: string, isDone: boolean, todolistId: string) => void
    onChangeValue: (id: string, newTitle: string, todolistId: string) => void
    filter: FilterTodolistType
    removeTodolist: (id: string) => void
    onChangeTitle: (newTitle: string, todolistId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = React.memo(({
    id,
    title,
    tasks,
    onAddTask,
    onChangeTitle,
    onChangeFilter,
    ...props }: TodolistType) => {
    console.log('Todolist call');

    const addTask = useCallback(
        (title: string) => { onAddTask(title, id) }, [onAddTask, id]);

    const removeTodolist = useCallback(
        () => { props.removeTodolist(id) }, [props])

    const onChangeTitleTodolist = useCallback(
        (newTitle: string) => { onChangeTitle(newTitle, id) }, [onChangeTitle, id])

    const onAllClickHandler = useCallback(
        () => { onChangeFilter('all', id) }, [onChangeFilter, id])

    const onActiveClickHandler = useCallback(
        () => { onChangeFilter('active', id) }, [onChangeFilter, id])

    const onCompletedClickHandler = useCallback(
        () => { onChangeFilter('completed', id) }, [onChangeFilter, id])

    let tasksForTodolist = tasks

    if (props.filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (props.filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }

    return <div className={s.wrapper}>
        <h3>
            <EditableSpan
                value={title}
                onChange={onChangeTitleTodolist} />
            <Tooltip title="Delete">
                <IconButton onClick={removeTodolist}>
                    <Delete />
                </IconButton>
            </Tooltip>
        </h3>
        <AddItemForm onAddItem={addTask} />
        {tasksForTodolist.map(t => {

            return <Tasks
                key={t.id}
                task={t}
                todolistId={id}
                onAddTask={addTask}
                onRemoveTask={removeTodolist} 
                onChangeStatus={props.onChangeStatus}
                onChangeValue={props.onChangeValue}/>
        })}
        {/* <div>
            {tasksForTodolist.map(t => {
                const onClickHandler = () => props.onRemoveTask(t.id, id);
                const onChangStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    let newIsDoneValue = e.currentTarget.checked;
                    props.onChangeStatus(t.id, newIsDoneValue, id);
                }
                const onChangeValueHandler = (newTitle: string) => {
                    props.onChangeValue(t.id, newTitle, id)
                }
                return <div key={t.id} className={t.isDone ? s.is_done : ''}>
                    <Checkbox color="primary" checked={t.isDone} onChange={onChangStatusHandler} />
                    <EditableSpan
                        value={t.title}
                        onChange={onChangeValueHandler}
                    />
                    <Tooltip title="Delete">
                        <IconButton onClick={onClickHandler}>
                            <Delete />
                        </IconButton>
                    </Tooltip>
                </div>
            })
            }
        </div> */}
        <div>
            <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                onClick={onAllClickHandler}
                color='default'
            >All</Button>
            <Button className={props.filter === 'active' ? s.active_filter : ''}
                variant={props.filter === 'active' ? 'outlined' : 'text'}
                onClick={onActiveClickHandler}
                color='primary'
            >Active</Button>
            <Button className={props.filter === 'completed' ? s.active_filter : ''}
                variant={props.filter === 'completed' ? 'outlined' : 'text'}
                onClick={onCompletedClickHandler}
                color='secondary'
            >Completed</Button>
        </div>
    </div>
}
)