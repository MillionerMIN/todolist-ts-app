import React, { useState } from 'react';
import { v1 } from 'uuid';
import s from './App.module.css';
import { TaskType, Todolist } from '../Todolist/Todolist';
import { AddItemForm } from '../AddItemForm/AddItemForm';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

export type FilterTodolistType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterTodolistType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todolistId1 = v1();
    const todolistId2 = v1();

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {
            id: todolistId1,
            title: 'What to learn',
            filter: 'all',
        },
        {
            id: todolistId2,
            title: 'What to buy',
            filter: 'all',
        },
    ]);

    const [tasks, setTasks] = useState({
        [todolistId1]: [
            { id: v1(), title: 'HTML', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
        ],
        [todolistId2]: [
            { id: v1(), title: 'Milk', isDone: true },
            { id: v1(), title: 'React Book', isDone: true },
        ]
    });

    function addTask(title: string, todolistId: string) {
        let task = { id: v1(), title, isDone: false };
        let todolistTasks = tasks[todolistId];
        tasks[todolistId] = [task, ...todolistTasks];
        setTasks({ ...tasks })
    }
    function removeTask(id: string, todolistId: string) {
        let todolistTasks = tasks[todolistId];
        tasks[todolistId] = todolistTasks.filter(t => t.id !== id);
        setTasks({ ...tasks });
    }
    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        let todolistTasks = tasks[todolistId];
        let task = todolistTasks.find(t => t.id === id);
        if (task) {
            task.title = newTitle;
            setTasks({ ...tasks })
        }
    }
    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        let todolistTasks = tasks[todolistId];
        let task = todolistTasks.find(t => t.id === id);
        if (task) {
            task.isDone = isDone;
            setTasks({ ...tasks })
        }
    }


    function removeTodolist(id: string) {
        setTodolists(todolists.filter(tl => tl.id !== id));
        delete tasks[id];
        setTasks({ ...tasks });
    }
    function addTodolist(title: string) {
        const newTodolistId = v1();
        const newTodolist: TodolistType = {
            id: newTodolistId,
            title: title,
            filter: 'all',
        }
        setTodolists([...todolists, newTodolist]);
        setTasks({
            ...tasks,
            [newTodolistId]: []
        });
    }
    function changeFilter(value: FilterTodolistType, todolistId: string) {
        const updateTodolistFilter = todolists.map(tl => tl.id === todolistId ? {...tl, value} : tl)
        setTodolists(updateTodolistFilter);
    }
    function changeTitleTodolist(title: string, todolistId: string) {
        const updateTodolistTitle = todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl)
        setTodolists(updateTodolistTitle);
    }

    return (
        <div className={s.app}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" >
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{ padding: '20px' }}>
                    <AddItemForm onAddItem={addTodolist} />
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === 'active') {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                            }
                            return <Grid item>
                                <Paper elevation={3}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        onAddTask={addTask}
                                        tasks={tasksForTodolist}
                                        onRemoveTask={removeTask}
                                        onChangeFilter={changeFilter}
                                        onChangeStatus={changeStatus}
                                        onChangeValue={changeTaskTitle}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        onChangeTitle={changeTitleTodolist}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
