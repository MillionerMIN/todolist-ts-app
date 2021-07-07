import React, { useState } from 'react';
import { v1 } from 'uuid';
import s from './App.module.css';
import { Todolist } from '../Todolist/Todolist';

export type FilterTodolistType = 'all' | 'active' | 'completed'

type TodolistsType = {
    id: string
    title: string
    filter: string
}

function App() {

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {
            id: v1(),
            title: 'What to learn',
            filter: 'all',
        },
        {
            id: v1(),
            title: 'What to buy',
            filter: 'all',
        }
    ])

    let [tasks, setTasks] = useState([
        { id: v1(), title: 'HTML', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'ReactJS', isDone: false },
        { id: v1(), title: 'rest api', isDone: false },
        { id: v1(), title: 'graphQL', isDone: false },
    ])

    function addTask(title: string) {
        let task = { id: v1(), title: title, isDone: false };
        let newTasks = [task, ...tasks];
        setTasks(newTasks);
    }
    function removeTask(id: string) {
        let filterTasks = tasks.filter(t => t.id !== id);
        setTasks(filterTasks);
    }
    
    function changeFilter(value: FilterTodolistType,todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists]);
        }
    }

    function changeStatus(id: string, isDone: boolean) {
        let task = tasks.find(t => t.id === id);
        if (task) {
            task.isDone = isDone;
            setTasks([...tasks])
        }
    }

    return (
        <div className={s.app}>
            {
                todolists.map(tl => {
                    let tasksForTodolist = tasks;

                    if (tl.filter === 'active') {
                        tasksForTodolist = tasks.filter(t => t.isDone === false);
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodolist = tasks.filter(t => t.isDone === true);
                    }
                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        onAddTask={addTask}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        onChangeFilter={changeFilter}
                        onChangeStatus={changeStatus}
                        filter={tl.filter}
                    />
                })
            }
        </div>
    );
}

export default App;
