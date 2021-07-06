import React, { useState } from 'react';
import './App.css';
import { Todolist } from './component/Todolist/Todolist';

export type FilterTodolistType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState([
        { id: 1, title: 'HTML', isDone: true },
        { id: 2, title: 'JS', isDone: true },
        { id: 3, title: 'ReactJS', isDone: false },
        { id: 4, title: 'rest api', isDone: false },
        { id: 5, title: 'graphQL', isDone: false },
    ])



    function removeTask(id: number) {
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
                tasks={tasksForTodolist}
                removeTask={removeTask} 
                onChangeFilter={changeFilter}/>
        </div>
    );
}

export default App;
