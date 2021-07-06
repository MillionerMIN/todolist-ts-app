import React from 'react';
import { FilterTodolistType } from '../../App';

type TodolistType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    onChangeFilter: (value: FilterTodolistType) => void
}

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export function Todolist(props: TodolistType) {
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input />
            <button>+</button>
        </div>
        <ul>
            {props.tasks.map(t => <li key={t.id}>
                <input type="checkbox" checked={t.isDone} />
                <span>{t.title}</span>
                <button onClick={() => { props.removeTask(t.id) }}>X</button>
            </li>)}
        </ul>
        <div>
            <button onClick={()=> {props.onChangeFilter('all')}}>All</button>
            <button onClick={() => { props.onChangeFilter('active') }}>Active</button>
            <button onClick={() => { props.onChangeFilter('completed') }}>Completed</button>
        </div>
    </div>;
}
