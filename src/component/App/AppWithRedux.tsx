import React, { useCallback } from 'react';
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

    const addTask = useCallback(
        (title: string, todolistId: string) => {
            const action = addTaskAC(title, todolistId)
            dispatch(action)
        },
        [dispatch],
    )
    const removeTask = useCallback((id: string, todolistId: string) => {

        const action = removeTaskAC(id, todolistId)
        dispatch(action)
    }, [dispatch])

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        const action = changeTaskTitleAC(id, newTitle, todolistId)
        dispatch(action)
    }, [dispatch])

    const changeStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
        const action = changeTaskStatusAC(id, isDone, todolistId)
        dispatch(action)
    }, [dispatch])

    const removeTodolist = useCallback((id: string) => {
        const action = removeTodolistAC(id)
        dispatch(action)
    }, [dispatch])

    const addTodolist = useCallback(
        (title: string) => {
            const action = addTodolistAC(title)
            dispatch(action)
        }, [dispatch])

    const changeFilter = useCallback((value: FilterTodolistType, todolistId: string) => {
        const action = changeTodolistFilterAC(value, todolistId)
        dispatch(action)
    }, [dispatch])

    const changeTitleTodolist = useCallback((title: string, todolistId: string) => {
        const action = changeTodolistTitleAC(title, todolistId)
        dispatch(action)
    }, [dispatch])

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

                            return <Grid key={tl.id} item>
                                <Paper elevation={3}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        onAddTask={addTask}
                                        tasks={tasks[tl.id]}
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
