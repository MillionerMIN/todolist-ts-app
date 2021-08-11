import React, { useReducer } from 'react';
import { v1 } from 'uuid';
import s from './App.module.css';
import { TaskType, Todolist } from '../Todolist/Todolist';
import { AddItemForm } from '../AddItemForm/AddItemForm';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer } from '../../redux/todolists-reducer/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from '../../redux/todolists-reducer/tasks-reducer';

export type FilterTodolistType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterTodolistType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {

    const todolistId1 = v1();
    const todolistId2 = v1();

    const [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
        {
            id: todolistId1,
            title: 'What to learn',
            filter: 'all',
        },
        {
            id: todolistId2,
            title: 'What to buy',
            filter: 'all',
        }]);

    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
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

        const action = addTaskAC(title, todolistId)
        dispatchTasks(action)
    }
    function removeTask(id: string, todolistId: string) {

        const action = removeTaskAC(id, todolistId)
        dispatchTasks(action)
    }
    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {

        const action = changeTaskTitleAC(id, newTitle, todolistId)
        dispatchTasks(action)
    }
    function changeStatus(id: string, isDone: boolean, todolistId: string) {

        const action = changeTaskStatusAC(id, isDone, todolistId)
        dispatchTasks(action)
    }

    //useing hook useReducer
    function removeTodolist(id: string) {
        const action = removeTodolistAC(id)
        dispatchTasks(action)
        dispatchTodolists(action)
    }
    function addTodolist(title: string) {
        const action = addTodolistAC(title)
        dispatchTasks(action)
        dispatchTodolists(action)
    }
    function changeFilter(value: FilterTodolistType, todolistId: string) {
        const action = changeTodolistFilterAC(value, todolistId)
        dispatchTodolists(action)
    }

    function changeTitleTodolist(title: string, todolistId: string) {
        const action = changeTodolistTitleAC(title, todolistId)
        dispatchTodolists(action)
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
                            return <Grid key={tl.id} item>
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
                                        onRemoveTodolist={removeTodolist}
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

export default AppWithReducers;
