import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterTodolistType } from '../../App';

type TodolistType = {
    title: string
    tasks: Array<TaskType>
    onAddTask: (title: string) => void
    removeTask: (taskId: string) => void
    onChangeFilter: (value: FilterTodolistType) => void
}

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export function Todolist(props: TodolistType) {

    let [title, setTitle] = useState('');
    const addTask = () => {
        props.onAddTask(title);
        setTitle('');
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => e.charCode === 13 ? addTask() : '';
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
                onKeyPress={onKeyPressHandler} />
            <button onClick={addTask}>+</button>
        </div>
        <ul>
            {props.tasks.map(t => {
                const onClickHandler = () => props.removeTask(t.id);
                return <li key={t.id}>
                    <input type="checkbox" checked={t.isDone} />
                    <span>{t.title}</span>
                    <button onClick={onClickHandler}>X</button>
                </li>})
            }
        </ul>
        <div>
            <button onClick={onAllClickHandler}>All</button>
            <button onClick={onActiveClickHandler}>Active</button>
            <button onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
