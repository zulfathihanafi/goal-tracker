import { useState } from "react";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { pink } from '@mui/material/colors';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Divider from '@mui/material/Divider';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link } from 'react-router-dom';
import '../styles/home.css'
import { work, financial } from "../data/goals";
import AddTaskIcon from '@mui/icons-material/AddTask';
import Input from '@mui/material/Input';
import { Navigate, useNavigate } from 'react-router-dom'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { mentee } from "../data/user";
import { createTheme, ThemeProvider } from '@mui/material/styles';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const theme = createTheme({
    typography: {
        fontFamily: [
            'Nunito', 
            'sans-serif',
        ].join(','),
    },
});

const WorkGoals = () => {

    const [newWorkGoal, setNewWorkGoal] = React.useState({
        title: "",
        percentage: 0,
        dueDate: '',
        pendingTasks: [{ task: '', due: '' }],
        finishedTasks: []
    })
    
    const [openWork, setOpenWork] = React.useState(false);
    const [workDrop, setWorkDrop] = React.useState(true)
    const [financialDrop, setFinancialDrop] = React.useState(true)
    const [newTask, setNewTask] = React.useState([])
    
    const [enableEdit,setEdit] = React.useState(true)
    const [currentUser,setUser] = React.useState(mentee)

    let navigate = useNavigate()
    function addTasks() {

    }

    function addWorkGoal() {
        setOpenWork(false)
        navigate(`/goal/0`)
        alert("Please add your task in the goal page.")
        var currentWork = work
        currentWork.unshift(newWorkGoal)
        work = currentWork
        console.log(work)

        setNewWorkGoal({
            title: "",
            percentage: 0,
            dueDate: '',
            pendingTasks: [{ task: '', due: '' }],
            finishedTasks: []
        })
    }

    return (
        <ThemeProvider theme={theme}>
            <body class="homeBody">
                <div class="container home">
                    <Button variant="contained" size="large" Click={e => { setOpenWork(true) }} style={{marginTop: '30px', marginBottom: "20px"}}>
                        Add Work
                    </Button>
                    <Dialog open={openWork} onClose={e => { setOpenWork(false) }} fullWidth="xl">
                        <DialogTitle style={{ fontSize: "30px" }}>Add New Work Goal</DialogTitle>
                        <FormControl>
                            <DialogContent>
                                <DialogContentText style={{ fontWeight: 'bold' }}>
                                    Title
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="title"
                                    label="Goal Title"
                                    type="title"
                                    fullWidth
                                    variant="standard"
                                    onChange={e => { newWorkGoal.title = e.target.value }}
                                />
                                
                                <DialogContentText style={{ fontWeight: 'bold', marginTop: '5px', marginBottom: "10px" }}>
                                    Goal Deadline
                                </DialogContentText>
                                <input
                                    type="date"
                                    id="birthdaytime"
                                    name="birthdaytime"
                                    onChange={e => { newWorkGoal.dueDate = e.target.value }}>

                                </input>

                            </DialogContent>
                        </FormControl>
                        <DialogActions>
                            <Button onClick={e => setOpenWork(false)}>Cancel</Button>
                            <Button onClick={e => addWorkGoal()}>Add</Button>
                        </DialogActions>
                    </Dialog>
                                
                    {workDrop ? work.map((goal, index) => (
                        <Link to={`/goal/${index}`} class="link">
                            <Grid container spacing={1} >
                                <Grid item xs={12} >
                                    <Item sx={{ height: '100%', boxShadow: '3' }} style={{ padding: '20px', backgroundColor: "white" }}>
                                        <div className="row">
                                            <div className="col-8">
                                                <Typography variant="h4" justifyContent="flex-start" style={{ textAlign: 'left', paddingLeft: '10px', marginTop: '5px', marginBottom: '5px', color: 'black' }}>{goal.title}</Typography>
                                            </div>
                                            <div className="col-4">
                                                <Typography variant="h4" justifyContent="flex-start" style={{ textAlign: 'left', paddingLeft: '10px', marginTop: '5px', marginBottom: '5px', color: 'black' }}><CalendarMonthIcon fontSize="large" style={{ marginRight: '10px' }} />{goal.dueDate}</Typography>
                                            </div>
                                        </div>
                                        <Divider style={{ marginBottom: '15px' }} />
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={4}>
                                                <Item sx={{ height: '100%', border: 1 }} style={{ backgroundColor: "#f7f6f6" }}>
                                                    <Typography variant="h6" style={{ color: "black", textAlign: "left", paddingLeft: '10px' }}>Overall Status</Typography>
                                                    <Box sx={{ position: 'relative', display: 'inline-flex' }} style={{ marginTop: '30px' }}>
                                                        <CircularProgress style={{ 'position': 'absolute', 'color': '#fff' }} variant="determinate" size={100} thickness={7} value={100} />
                                                        <CircularProgress style={{ 'color': 'blue' }} variant="determinate" size={100} thickness={7} value={goal.percentage} />
                                                        <Box
                                                            sx={{
                                                                top: 0,
                                                                left: 0,
                                                                bottom: 0,
                                                                right: 0,
                                                                position: 'absolute',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                            }}
                                                        >
                                                            <Typography variant="h6" component="div" color="text.secondary">
                                                                {`${Math.round(goal.percentage)}%`}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                    <Typography>{goal.percentage}% Completed</Typography>
                                                </Item>
                                            </Grid>
                                            <Grid item xs={12} md={8}>
                                                <Item sx={{ height: '100%', border: 1 }} style={{ backgroundColor: "#f7f6f6" }}>
                                                    <Typography variant="h6" style={{ color: "black", textAlign: "left", paddingLeft: '10px', marginRight: '20px' }}>To-do List <AddTaskIcon /></Typography>
                                                    <div style={{ margin: '5px 50px' }}>
                                                        <table class="table">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col" class="col-1">#</th>
                                                                    <th scope="col" class="col-8">Task</th>
                                                                    <th scope="col" class="col-3">Due Date</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {goal.pendingTasks.map((activity, index) => (
                                                                    <tr>
                                                                        <th scope="row">
                                                                            {index + 1}
                                                                        </th>
                                                                        <td>{activity.task}</td>
                                                                        <td>{activity.due}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </Item>

                                            </Grid>
                                            {/* <Grid item xs={12} md={12}>
                                            <Item sx={{ height: '100%' }}>
                                                <h6 variant="h6" style={{ color: "black", textAlign: "left", paddingLeft: '10px' }}>Description</h6>
                                                <p sx={{ textAlign: 'left', pl: '10px' }}>
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                                                    blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
                                                    neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
                                                    quasi quidem quibusdam.
                                                </p>
                                            </Item>
                                        </Grid> */}
                                        </Grid>
                                    </Item>

                                </Grid>

                                <Divider variant="middle" style={{ margin: "30px" }} />
                            </Grid>
                        </Link>)) : <div ></div>}
                    <div></div>
                </div>
            </body>
        </ThemeProvider>
    )
}

export default WorkGoals;