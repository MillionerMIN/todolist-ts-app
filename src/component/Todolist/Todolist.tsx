import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterTodolistType } from '../App/App';
import s from './Todolist.module.css';

type TodolistType = {
    id: string
    title: string
    tasks: Array<TaskType>
    onAddTask: (title: string) => void
    removeTask: (taskId: string) => void
    onChangeFilter: (value: FilterTodolistType, todolistsId: string) => void
    onChangeStatus: (id: string, isDone: boolean) => void
    filter: string
}

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export function Todolist(props: TodolistType) {

    let [title, setTitle] = useState('');
    let [error, setError] = useState<string | null>(null);

    const addTask = () => {
        if (title.trim() !== '') {
            props.onAddTask(title);
            setTitle('');
        } else {
            setError('Title is required');
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask()
        }
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
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? s.error : ''} />
            <button onClick={addTask}>+</button>
            {error && <div className={s.error_message}>{error}</div>}
        </div>
        <ul>
            {props.tasks.map(t => {
                const onClickHandler = () => props.removeTask(t.id);
                const onChangHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    let newIsDoneValue = e.currentTarget.checked;
                    props.onChangeStatus(t.id, newIsDoneValue);
                }
                return <li key={t.id} className={t.isDone ? s.is_done: ''}>
                    <input type="checkbox" checked={t.isDone} onChange={onChangHandler} />
                    <span>{t.title}</span>
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
