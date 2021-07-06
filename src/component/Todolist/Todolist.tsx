import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterTodolistType } from '../../App';

type TodolistType = {
    title: string
    tasks: Array<TaskType>
    onAddTask: (title: string) => void
    removeTask: (taskId: string) => void
    onChangeFilter: (value: FilterTodolistType) => void
    onChangeStatus: (id: string, isDone: boolean) => void
    onfilter: string
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
        props.onChangeFilter('all');
    }
    const onActiveClickHandler = () => {
        props.onChangeFilter('active');
    }
    const onCompletedClickHandler = () => {
        props.onChangeFilter('completed');
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? 'error' : ''} />
            <button onClick={addTask}>+</button>
            {error && <div className='error-message'>{error}</div>}
        </div>
        <ul>
            {props.tasks.map(t => {
                const onClickHandler = () => props.removeTask(t.id);
                const onChangHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    let newIsDoneValue = e.currentTarget.checked;
                    props.onChangeStatus(t.id, newIsDoneValue);
                }
                return <li key={t.id} className={t.isDone ? 'is-done': ''}>
                    <input type="checkbox" checked={t.isDone} onChange={onChangHandler} />
                    <span>{t.title}</span>
                    <button onClick={onClickHandler}>X</button>
                </li>
            })
            }
        </ul>
        <div>
            <button className={props.onfilter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
            <button className={props.onfilter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active</button>
            <button className={props.onfilter === 'completed' ? 'active-filter' : ''} onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
