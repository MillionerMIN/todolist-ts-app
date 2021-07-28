import React from 'react';
import s from './App.module.css';
import { TaskType, Todolist } from '../Todolist/Todolist';
import { AddItemForm } from '../AddItemForm/AddItemForm';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from '../../redux/todolists-reducer/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from '../../redux/todolists-reducer/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../../redux/store';

export type FilterTodolistType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterTodolistType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)

    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    function addTask(title: string, todolistId: string) {

        const action = addTaskAC(title, todolistId)
        dispatch(action)
    }
    function removeTask(id: string, todolistId: string) {

        const action = removeTaskAC(id, todolistId)
        dispatch(action)
    }
    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {

        const action = changeTaskTitleAC(id, newTitle, todolistId)
        dispatch(action)
    }
    function changeStatus(id: string, isDone: boolean, todolistId: string) {

        const action = changeTaskStatusAC(id, isDone, todolistId)
        dispatch(action)
    }

    //useing hook useReducer
    function removeTodolist(id: string) {
        const action = removeTodolistAC(id)
        dispatch(action)
    }
    function addTodolist(title: string) {
        const action = addTodolistAC(title)
        dispatch(action)
    }
    function changeFilter(value: FilterTodolistType, todolistId: string) {
        const action = changeTodolistFilterAC(value, todolistId)
        dispatch(action)
    }

    function changeTitleTodolist(title: string, todolistId: string) {
        const action = changeTodolistTitleAC(title, todolistId)
        dispatch(action)
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

export default AppWithRedux;
