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
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const actions = [
    { icon: <FileCopyIcon />, name: 'Copy' },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <PrintIcon />, name: 'Print' },
    { icon: <ShareIcon />, name: 'Share' },
];

const Home = () => {
    const [newWorkGoal, setNewWorkGoal] = React.useState({
        title: "",
        percentage: 0,
        dueDate: '',
        pendingTasks: [{ task: '', due: '' }],
        finishedTasks: []
    })
    const [newFinanceGoal, setNewFinanceGoal] = React.useState({
        title: "",
        target: 0,
        current: 0,
        percentage: 0,
        dueDate: '',
        transactions: [
            { details: '', amount: 0, type: '', date: "" }]
    })
    const [openFinance, setOpenFinance] = React.useState(false);
    const [openWork, setOpenWork] = React.useState(false);
    const [workDrop, setWorkDrop] = React.useState(true)
    const [financialDrop, setFinancialDrop] = React.useState(true)
    const [newTask, setNewTask] = React.useState([])
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
    function addFinanceGoal() {
        setOpenFinance(false)
        navigate(`/goal3/0`)
        alert("Please add your transaction in the goal page.")
        var currentWork = financial
        currentWork.unshift(newFinanceGoal)
        financial = currentWork
        console.log(work)


        setNewFinanceGoal({
            title: "",
            target: 0,
            current: 0,
            percentage: 0,
            dueDate: '',
            transactions: [
                { details: '', amount: 0, type: '', date: "" }]
        })
    }
    return (

        <div class="container home">

            <Grid container spacing={2} justifyContent="flex-start" alignItems="center" style={{ marginTop: "10px" }}>
                <Grid item xs={12} md={11} >
                    <Item style={{ boxShadow: 0, backgroundColor: "#d9d9d9" }} sx={{ border: 0, boxShadow: 0 }}>

                        <Typography onClick={e => { setWorkDrop(!workDrop) }} variant="h4" style={{ marginTop: "20px", marginBottom: "10px", textAlign: "left", color: "black", cursor: "pointer" }}>Work Goals
                            <ArrowDropDownIcon style={{ marginLeft: "5px" }} />
                        </Typography>
                    </Item>
                </Grid>
                <Grid item xs={12} md={1}>
                    <Item style={{ boxShadow: 0, backgroundColor: "#d9d9d9" }} sx={{ border: 0, boxShadow: 0 }}>
                        <div>
                            <Fab color="success" aria-label="add" onClick={e => { setOpenWork(true) }} size="medium" >
                                <AddIcon />
                            </Fab>
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
                        </div>
                    </Item>
                </Grid>
            </Grid>
            <Divider style={{ marginBottom: '15px' }} />
            {workDrop ? work.map((goal, index) => (
                <Link to={`/goal/${index}`} class="link">
                    <Grid container spacing={1} >
                        <Grid item xs={12} >
                            <Item sx={{ height: '100%' }} style={{ padding: '20px', backgroundColor: "#92eea8" }}>
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
                                        <Item sx={{ height: '100%' }} style={{ backgroundColor: "#d9d9d9" }}>
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
                                        <Item sx={{ height: '100%' }} style={{ backgroundColor: "#d9d9d9" }}>
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
            <Grid container spacing={2} justifyContent="flex-start" alignItems="center" style={{ marginTop: "10px" }}>
                <Grid item xs={12} md={11} >
                    <Item style={{ boxShadow: 0, backgroundColor: "#d9d9d9" }} sx={{ border: 0, boxShadow: 0 }}>

                        <Typography onClick={e => { setFinancialDrop(!financialDrop) }} variant="h4" style={{ marginTop: "20px", marginBottom: "10px", textAlign: "left", color: "black", cursor: "pointer" }}>Financial Goals
                            <ArrowDropDownIcon style={{ marginLeft: "5px" }} />
                        </Typography>
                    </Item>
                </Grid>
                <Grid item xs={12} md={1}>
                    <Item style={{ boxShadow: 0, backgroundColor: "#d9d9d9" }} sx={{ border: 0, boxShadow: 0 }}>
                        <div>
                            <Fab color="success" aria-label="add" onClick={e => { setOpenFinance(true) }} size="medium" >
                                <AddIcon />
                            </Fab>
                            <Dialog open={openFinance} onClose={e => { setOpenFinance(false) }} fullWidth="xl">
                                <DialogTitle style={{ fontSize: "30px" }}>Add New Finance Goal</DialogTitle>
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
                                            onChange={e => { newFinanceGoal.title = e.target.value}}
                                        />
                                        <DialogContentText style={{ fontWeight: 'bold' }}>
                                            Target
                                        </DialogContentText>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="title"
                                            label="Goal Target"
                                            type="title"
                                            fullWidth
                                            variant="standard"
                                            onChange={e => { newFinanceGoal.target = Number(e.target.value) }}
                                        />
                                        <DialogContentText style={{ fontWeight: 'bold', marginTop: '15px', marginBottom: "10px" }}>
                                            Goal Deadline
                                        </DialogContentText>
                                        <input 
                                        type="date" id="birthdaytime" 
                                        name="birthdaytime"
                                        onChange={e => { newFinanceGoal.dueDate = e.target.value }}></input>
                                    </DialogContent>
                                </FormControl>
                                <DialogActions>
                                    <Button onClick={e => setOpenFinance(false)}>Cancel</Button>
                                    <Button onClick={e => addFinanceGoal()}>Add</Button>

                                </DialogActions>
                            </Dialog>
                        </div>
                    </Item>
                </Grid>
            </Grid>
            <Divider style={{ marginBottom: '15px' }} />
            {financialDrop ? financial.map((goal, index) => (
                <Link to={`/goal3/${index}`} class="link">
                    <Grid container spacing={1} >
                        <Grid item xs={12} >
                            <Item sx={{ height: '100%' }} style={{ padding: '20px', backgroundColor: "#fffd89" }}>
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
                                        <Item sx={{ height: '100%' }} style={{ backgroundColor: "#d9d9d9" }}>
                                            <Typography variant="h6" style={{ color: "black", textAlign: "left", paddingLeft: '10px' }}>Overall Status</Typography>
                                            <Box sx={{ position: 'relative', display: 'inline-flex' }} style={{ marginTop: '30px' }}>
                                                <CircularProgress style={{ 'position': 'absolute', 'color': '#fff' }} variant="determinate" size={100} thickness={7} value={100} />
                                                <CircularProgress style={{ 'color': "blue" }} variant="determinate" size={100} thickness={7} value={goal.percentage} />
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
                                        <Item sx={{ height: '100%' }} style={{ backgroundColor: "#d9d9d9" }}>
                                            <Typography variant="h6" style={{ color: "black", textAlign: "left", paddingLeft: '10px', marginRight: '20px' }}>Recent Transaction <CurrencyExchangeIcon /></Typography>
                                            <div style={{ margin: '5px 50px' }}>
                                                <table class="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col" class="col-1">#</th>
                                                            <th scope="col" class="col-8">Transaction</th>
                                                            <th scope="col" class="col-3">Amount</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {goal.transactions.slice(0, 3).map((transaction, index) => (
                                                            <tr>
                                                                <th scope="row">
                                                                    {index + 1}
                                                                </th>
                                                                <td>{transaction.details}</td>
                                                                <td>{transaction.type == 'Credit' ?
                                                                    <strong
                                                                        style={{ color: 'green' }}
                                                                    >+ {transaction.amount.toFixed(2)}</strong> :
                                                                    <strong
                                                                        style={{ color: 'red' }}
                                                                    >- {transaction.amount.toFixed(2)}</strong>}</td>
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
        </div>

    )
}

export default Home;