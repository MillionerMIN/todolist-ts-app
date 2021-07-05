import React from 'react';
import './App.css';
import { Todolist } from './component/Todolist/Todolist';

function App() {

    const tasks1 = [
        { id: 1, title: 'HTML', isDone: true},
        { id: 2, title: 'JS', isDone: true }, 
        { id: 3, title: 'ReactJS', isDone: false },
    ]

    const tasks2 = [
        { id: 1, title: 'Hello world', isDone: true },
        { id: 2, title: 'I am Happy', isDone: false },
        { id: 3, title: 'I`m find', isDone: false },
    ]
    return (
        <div className="App">
            <Todolist title="What to learn" tasks={tasks1}/>
            <Todolist title="Songs" tasks={tasks2}/>
            {/* <Todolist title="Books" /> */}
        </div>
    );
}

export default App;
