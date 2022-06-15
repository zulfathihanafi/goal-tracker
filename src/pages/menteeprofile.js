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
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import FaceIcon from '@mui/icons-material/Face';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Stack from '@mui/material/Stack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import zul from './zul.jpg';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Item2 = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'white' ? '#fff' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none',
}));

const theme = createTheme({
    typography: {
        fontFamily: [
            'Nunito', 
            'sans-serif',
        ].join(','),
    },
});

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

const MenteeProfile = () => {

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

    const labels = ['Goal 1', 'Goal 2', 'Goal 3', 'Goal 4'];
    const perc = [30,60,10,90];

    const data = {
        labels,
        datasets: [
          {
            label: 'Percentage%',
            data: [30,60,10,90,100],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
    };

    const options = {
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Goals Completion Percentage',
          },
        },
    };

    return (
        <ThemeProvider theme={theme}>
            <body class="homeBody">
                <div class="container home">
                    <Typography variant="h3">
                        Mentee Profile
                        <FaceIcon sx={{ width: 50, height: 50, marginLeft: '10px', marginBottom: '10px' }} fontSize="large" />
                    </Typography>
                    <Grid container spacing={1}> 
                        <Grid item xs={4}>
                            <Item2 sx={{ boxShadow: '2' }}>
                                <Box display='flex' justifyContent='center' alignItems='center' sx={{ marginTop: '20px' }}>
                                        <Avatar src={zul} sx={{ width: '200px', height: '200px' }} />
                                </Box>
                                <Container sx={{ marginLeft: '60px', marginTop: '30px', marginBottom: '30px' }}>
                                    <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'left' }}>@fatehiimran</Typography>
                                    <Typography sx={{ textAlign: 'left', fontSize: '15' }}>Student</Typography> 
                                    <Typography variant="h6" style={{ marginTop: '25px', textAlign: 'left' }}><LocationOnIcon sx={{ marginRight: '10px' }}/>Kemamang, Ganu</Typography>                                   
                                    <Typography variant="h6" style={{ marginTop: '5px', textAlign: 'left'}}><EmailIcon sx={{ marginRight: '10px' }}/>fatehiimran@gmail.com</Typography>
                                    <Typography variant="h6" style={{ marginTop: '5px', textAlign: 'left' }}><LocalPhoneIcon sx={{ marginRight: '10px' }}/>0182026040</Typography>
                                    <Box display='flex' justifyContent='flex-start' alignItems='center' sx={{ backgroundColor: '#26a326', borderRadius: '16px', marginTop: '20px', width: '200px' }}>                                        
                                            <TrackChangesIcon sx={{ color: 'white', width: '50px', height: '50px', marginLeft: '10px', marginRight: '10px' }}/>
                                            <Typography sx={{ marginBottom: '20px', color: 'white' }}>Work Goals: 3</Typography>
                                    </Box>
                                    <Box display='flex' justifyContent='flex-start' alignItems='center' sx={{ backgroundColor: '#c22370', borderRadius: '16px', marginTop: '20px', width: '200px' }}>                                        
                                            <MonetizationOnIcon sx={{ color: 'white', width: '50px', height: '50px', marginLeft: '10px', marginRight: '10px' }}/>
                                            <Typography sx={{ marginBottom: '20px', color: 'white' }}>Financial Goal: 4</Typography>
                                    </Box>
                                </Container>
                            </Item2>
                        </Grid>
                        <Grid item xs={8}>
                            <Item2 sx={{ boxShadow: '2' }}>
                                <Bar options={options} data={data} style={{marginTop:"10px", marginBottom: "30px"}}/>
                                <Stack sx={{ marginTop: "30px", marginBottom: '30px' }} justifyContent='center' alignItems='baseline' direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
                                    <Item2>
                                        <CheckCircleOutlineIcon color="success" fontSize="large" sx={{ width: 70, height: 70, marginBottom: '20px'}} />
                                        <Typography variant="h5">
                                            3<br></br>Completed Goals
                                        </Typography>
                                    </Item2>
                                    <Item2>
                                        <HighlightOffIcon color="error" fontSize="large" sx={{ width: 70, height: 70, marginBottom: '20px' }} />
                                        <Typography variant="h5">
                                            12<br></br>Incomplete Goals
                                        </Typography>
                                    </Item2>
                                </Stack>
                            </Item2>
                        </Grid>
                    </Grid>
                    <Typography variant="h3" sx={{ marginBottom: '30px', marginTop: '50px' }}>
                        Work Goals
                        <TrackChangesIcon sx={{ width: 50, height: 50, marginLeft: '10px', marginBottom: '10px' }} fontSize="large" />
                    </Typography>
                    {workDrop ? work.map((goal, index) => (
                        <Link to={`/goal/${index}`} class="link">
                            <Grid container spacing={1} >
                                <Grid item xs={12} >
                                    <Item sx={{ height: '100%', boxShadow: 3}} style={{ padding: '20px', backgroundColor: "white" }}>
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
                                                <Item sx={{ height: '100%', border: 1}} style={{ backgroundColor: "#f7f6f6" }}>
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
                    <Typography variant="h3" sx={{ marginBottom: '30px', marginTop: '50px' }}>
                        Financial Goals
                        <MonetizationOnIcon sx={{ width: 50, height: 50, marginLeft: '10px', marginBottom: '10px' }} fontSize="large" />
                    </Typography>
                    {financialDrop ? financial.map((goal, index) => (
                        <Link to={`/goal3/${index}`} class="link">
                            <Grid container spacing={1} >
                                <Grid item xs={12} >
                                    <Item sx={{ height: '100%', boxShadow: 3}} style={{ padding: '20px', backgroundColor: "white" }}>
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
                                                <Item sx={{ height: '100%', border: 1}} style={{ backgroundColor: "#f7f6f6" }}>
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
                                                <Item sx={{ height: '100%', border: 1}} style={{ backgroundColor: "#f7f6f6" }}>
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
            </body>
        </ThemeProvider>
    )
}

export default MenteeProfile;