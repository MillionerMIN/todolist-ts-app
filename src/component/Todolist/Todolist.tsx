import React, { ChangeEvent } from 'react';
import { AddItemForm } from '../AddItemForm/AddItemForm';
import { FilterTodolistType } from '../App/App';
import s from './Todolist.module.css';
import { EditableSpan } from '../EditableSpan/EditableSpan';

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

export function Todolist(props: TodolistType) {

    const addTask = (title: string) => {
        props.onAddTask(title, props.id)
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }

    const onChangeTitleTodolist = (newTitle: string) => {
        props.onChangeTitle(newTitle, props.id)
    }

    const onAllClickHandler = () => {
        props.onChangeFilter('all', props.id);
    }
    const onActiveClickHandler = () => {
        props.onChangeFilter('active', props.id);
    }
    const onCompletedClickHandler = () => {
        props.onChangeFilter('completed', props.id);
    }

    return <div className={s.wrapper}>
        <h3>
            <EditableSpan
                value={props.title}
                onChange={onChangeTitleTodolist} />
            <button onClick={removeTodolist}>X</button>
        </h3>
        <AddItemForm onAddItem={addTask} />
        <ul>
            {props.tasks.map(t => {
                const onClickHandler = () => props.onRemoveTask(t.id, props.id);
                const onChangStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    let newIsDoneValue = e.currentTarget.checked;
                    props.onChangeStatus(t.id, newIsDoneValue, props.id);
                }
                const onChangeValueHandler = (newTitle: string) => {
                    props.onChangeValue(t.id, newTitle, props.id)
                }
                return <li key={t.id} className={t.isDone ? s.is_done : ''}>
                    <input type="checkbox" checked={t.isDone} onChange={onChangStatusHandler} />
                    <EditableSpan
                        value={t.title}
                        onChange={onChangeValueHandler}
                    />
                    <button onClick={onClickHandler}>X</button>
                </li>
            })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? s.active_filter : ''} onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? s.active_filter : ''} onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === 'completed' ? s.active_filter : ''} onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
