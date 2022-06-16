import logo from "../logo192.png";
import { auth, db } from "../components/firebase";
import { useState, useEffect,useContext } from "react";
import { UserContext } from '../userContext'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper';
import WorkIcon from '@mui/icons-material/Work';
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
import Stack from '@mui/material/Stack';
import AddTaskIcon from '@mui/icons-material/AddTask';
import Input from '@mui/material/Input';
import { Navigate, useNavigate } from 'react-router-dom'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { mentee } from "../data/user";
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Avatar from '@mui/material/Avatar';
import zul from './zul.jpg';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { deepPurple } from '@mui/material/colors';

import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import FaceIcon from '@mui/icons-material/Face';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ForumIcon from '@mui/icons-material/Forum';
import PeopleIcon from '@mui/icons-material/People';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import BadgeIcon from '@mui/icons-material/Badge';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const theme = createTheme({
    typography: {
        fontFamily: [
            'Nunito',
            'sans-serif',
        ].join(','),
    },
});

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Item2 = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: 0,
    boxShadow: 'none',
}));

const Item3 = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none',
}));

const Home = () => {
    //var userRole ="Mentee
    const {user,setUser} = useContext(UserContext);
    
    const [userData,setUserData] = useState({ name: '', email: '',occupation:'', phone: '' })
    const [userRole,setUserRole] = useState('')
    useEffect(() => {
        console.log("Home context "+user.email)
        

        db.collection("users").doc(user.email).get().then((doc) => {
            var data = doc.data()
            setUserData({ name: data.displayName, email: user.email,occupation:data.occupation, phone: data.phoneNumber })
            setUserRole(data.role)
          })
          
          
      }, [user]);





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

    const labels = ['Goal 1', 'Goal 2', 'Goal 3', 'Goal 4', 'Goal 5', 'Goal 6'];
    const perc = [30, 60, 70, 10, 100, 40, 80];

    const data = {
        labels,
        datasets: [
            {
                label: 'Percentage%',
                data: [30, 60, 70, 10, 100, 40, 80],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

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

    const [enableEdit, setEdit] = React.useState(true)
    

    let navigate = useNavigate()
    

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


    if (userRole == "Mentee") {
        return (
            <ThemeProvider theme={theme}>
                <div class="homeBody" style={{ height: '100%', width: '100%' }}>
                    <Grid container spacing={2} justifyContent="flex-start" alignItems="flex-start" >
                            <Grid item xs={3} style={{ marginTop: "40px", height: "100%" }}>
                                <Item3 sx={{ height: '100%', backgroundColor: '#f7f6f6' }}>
                                    <Box display='flex' justifyContent='center' alignItems='center'>
                                        <Avatar src={zul} sx={{ width: '200px', height: '200px' }} />
                                    </Box>

                                    {/* Profile content */}

                                    <Container sx={{ marginLeft: '60px', marginTop: '30px' }}>
                                        <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'left' }}>{userData.name}</Typography>
                                        <Typography variant="h6" style={{ marginTop: '5px', textAlign: 'left' }}><WorkIcon sx={{ marginRight: '10px' }} />{userData.occupation}</Typography>
                                        <Typography variant="h6" style={{ marginTop: '5px', textAlign: 'left' }}><EmailIcon sx={{ marginRight: '10px' }} />{userData.email}</Typography>
                                        <Typography variant="h6" style={{ marginTop: '5px', textAlign: 'left' }}><LocalPhoneIcon sx={{ marginRight: '10px' }} />{userData.phone}</Typography>
                                        <Typography variant="h4" sx={{ marginTop: '70px', textAlign: 'left' }}>Ongoing Activities</Typography>
                                        <Box display='flex' justifyContent='flex-start' alignItems='center' sx={{ backgroundColor: '#26a326', borderRadius: '16px', marginTop: '20px', width: '200px' }}>
                                            <TrackChangesIcon sx={{ color: 'white', width: '50px', height: '50px', marginLeft: '10px', marginRight: '10px' }} />
                                            <Typography sx={{ marginBottom: '20px', color: 'white' }}>Work Goals: 3</Typography>
                                        </Box>
                                        <Box display='flex' justifyContent='flex-start' alignItems='center' sx={{ backgroundColor: '#c22370', borderRadius: '16px', marginTop: '20px', width: '200px' }}>
                                            <MonetizationOnIcon sx={{ color: 'white', width: '50px', height: '50px', marginLeft: '10px', marginRight: '10px' }} />
                                            <Typography sx={{ marginBottom: '20px', color: 'white' }}>Financial Goal: 4</Typography>
                                        </Box>
                                    </Container>
                                </Item3>
                            </Grid>
                        <Grid item xs={9} >
                            <Item3 sx={{ height: '100%', marginRight: '100px', marginTop: '40px', backgroundColor: '#f7f6f6' }}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Item2>
                                            <Typography variant="h4" textAlign="center" style={{ marginLeft: "10px" }}>Current Progress</Typography>
                                            <Bar options={options} data={data} style={{ marginTop: "10px", marginBottom: "30px" }} />
                                        </Item2>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Item2>
                                            <Typography variant="h5">
                                                Work Goals Statistic
                                            </Typography>
                                            <Box sx={{ position: 'relative', display: 'inline-flex' }} style={{ marginTop: '30px' }}>
                                                <CircularProgress style={{ 'position': 'absolute', 'color': '#d9d9d9' }} variant="determinate" size={100} thickness={7} value={100} />
                                                <CircularProgress style={{ 'color': 'blue' }} variant="determinate" size={100} thickness={7} value={50} />
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
                                                        50%
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Stack sx={{ marginTop: "20px" }} justifyContent='center' alignItems='baseline' direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
                                                <Item2 sx={{ borderRadius: '30px!important', color: "grey" }}>
                                                    <Typography variant="h4" style={{ padding: "10px", marginTop: "10px", height: "100%", color: "black" }}>
                                                        3 <br></br>
                                                    </Typography>
                                                    <Typography variant="h6" style={{ padding: "5px", height: "100%" }}>
                                                        Completed goals
                                                    </Typography>
                                                </Item2>
                                                <Item2 sx={{ borderRadius: '50px!important' }}>
                                                    <Typography variant="h4" style={{ padding: "10px", marginTop: "10px", height: "100%", color: "black" }}>
                                                        12 <br></br>
                                                    </Typography>
                                                    <Typography variant="h6" style={{ padding: "5px", height: "100%" }}>
                                                        Incomplete goals
                                                    </Typography>
                                                </Item2>
                                            </Stack>
                                        </Item2>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Item2>
                                            <Typography variant="h5">
                                                Financial Goals Statistic
                                            </Typography>
                                            <Box sx={{ position: 'relative', display: 'inline-flex' }} style={{ marginTop: '30px' }}>
                                                <CircularProgress style={{ 'position': 'absolute', 'color': '#d9d9d9' }} variant="determinate" size={100} thickness={7} value={100} />
                                                <CircularProgress style={{ 'color': 'blue' }} variant="determinate" size={100} thickness={7} value={70} />
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
                                                        70%
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Stack sx={{ marginTop: "20px" }} justifyContent='center' alignItems='baseline' direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
                                                <Item2 sx={{ borderRadius: '50px!important', color: "grey" }}>
                                                    <Typography variant="h4" style={{ padding: "10px", marginTop: "10px", height: "100%", color: "black" }}>
                                                        3 <br></br>
                                                    </Typography>
                                                    <Typography variant="h6" style={{ padding: "5px", height: "100%" }}>
                                                        Completed goals
                                                    </Typography>
                                                </Item2>
                                                <Item2 sx={{ borderRadius: '50px!important' }}>
                                                    <Typography variant="h4" style={{ padding: "10px", marginTop: "10px", height: "100%", color: "black" }}>
                                                        12 <br></br>
                                                    </Typography>
                                                    <Typography variant="h6" style={{ padding: "5px", height: "100%" }}>
                                                        Incomplete goals
                                                    </Typography>
                                                </Item2>
                                            </Stack>
                                        </Item2>
                                    </Grid>
                                </Grid>
                            </Item3>
                        </Grid>
                    </Grid>

                </div>
            </ThemeProvider>
        )
    } else {
        return (

            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100vh' }}
            >
                <Grid item xs={3}>
                    <div>
                    <Avatar className="App-logo" src={logo} sx={{ width: '200px', height: '200px' }} />
                </div>
                </Grid>

            </Grid>
        )
    }

}

export default Home;