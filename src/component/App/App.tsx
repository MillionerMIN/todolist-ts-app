import React, { useCallback, useEffect, } from 'react';
import s from './App.module.css';
import { Todolist } from '../Todolist/Todolist';
import { AddItemForm } from '../AddItemForm/AddItemForm';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {
    addTodolistThunk,
    changeTodolistFilterAC,
    changeTodolistTitleThunk,
    deleteTodolistThunk,
    fetchTodolistThunk,
    FilterTodolistType,
    TodolistDomainType
} from '../../redux/todolists-reducer/todolists-reducer';
import { addTaskThunk, removeTaskThunk, changeTaskStatusThunk, changeTaskTitleThunk } from '../../redux/todolists-reducer/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../../redux/store';
import { TaskStatuses, TaskType } from '../../api/taskApi';

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodolistThunk())
    }, [dispatch]);

    const addTask = useCallback(
        (title: string, todolistId: string) => {
            dispatch(addTaskThunk(title, todolistId))
        },
        [dispatch],
    )
    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskThunk(todolistId, id))
    }, [dispatch])

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleThunk(todolistId, id, newTitle))
    }, [dispatch])

    const changeTaskStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
        dispatch(changeTaskStatusThunk(todolistId, id, status))
    }, [dispatch])

    const removeTodolist = useCallback((id: string) => {
        dispatch(deleteTodolistThunk(id))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
            dispatch(addTodolistThunk(title))
        }, [dispatch])

    const changeFilter = useCallback((value: FilterTodolistType, todolistId: string) => {
        const action = changeTodolistFilterAC(value, todolistId)
        dispatch(action)
    }, [dispatch])

    const changeTitleTodolist = useCallback((title: string, todolistId: string) => {
        dispatch(changeTodolistTitleThunk(todolistId, title))
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
                    <AddItemForm addItem={addTodolist} />
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
                                        addTask={addTask}
                                        tasks={tasks[tl.id]}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        changeTaskStatus={changeTaskStatus}
                                        changeTitleTask={changeTaskTitle}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTitleTodolist={changeTitleTodolist}
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
