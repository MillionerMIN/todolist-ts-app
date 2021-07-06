import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { Todolist } from './component/Todolist/Todolist';

export type FilterTodolistType = 'all' | 'active' | 'completed'

function App() {

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
    let [filter, setFilter] = useState<FilterTodolistType>('all');

    let tasksForTodolist = tasks;
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }
    function changeFilter(value: FilterTodolistType) {
        setFilter(value);
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                onAddTask={addTask}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                onChangeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
