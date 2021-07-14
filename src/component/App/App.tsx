import React, { useState } from 'react';
import { v1 } from 'uuid';
import s from './App.module.css';
import { TaskType, Todolist } from '../Todolist/Todolist';
import { AddItemForm } from '../AddItemForm/AddItemForm';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

export type FilterTodolistType = 'all' | 'active' | 'completed'

type TodolistsType = {
    id: string
    title: string
    filter: FilterTodolistType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
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

    let [tasks, setTasks] = useState({
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

    function removeTodolist(id: string) {
        setTodolists(todolists.filter(tl => tl.id !== id));
        delete tasks[id];
        setTasks({ ...tasks });
    }

    function addTodolist(title: string) {
        let newTodolistId = v1();
        let newTodolist: TodolistsType = {
            id: newTodolistId,
            title: title,
            filter: 'all',
        }
        setTodolists([newTodolist, ...todolists]);
        setTasks({
            ...tasks,
            [newTodolistId]: []
        });
    }

    function changeFilter(value: FilterTodolistType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists]);
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

    function changeValue(id: string, newTitle: string, todolistId: string) {
        let todolistTasks = tasks[todolistId];
        let task = todolistTasks.find(t => t.id === id);
        if (task) {
            task.title = newTitle;
            setTasks({ ...tasks })
        }
    }

    function changeTitleTodolist(newTitleTodo: string, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.title = newTitleTodo;
            setTodolists([...todolists]);
        }

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
                                        onChangeValue={changeValue}
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
