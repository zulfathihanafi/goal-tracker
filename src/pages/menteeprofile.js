import { useState,useEffect } from "react";
import { auth, db } from "../components/firebase";
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
import { useParams } from "react-router";
import WorkIcon from '@mui/icons-material/Work';
import FinancialGoalPost from "../components/financialGoalPost";
import WorkGoalPost from "../components/workGoalPost";


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

const Item3 = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none',
    borderRadius: "10px"
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
    const { id } = useParams(); // id is email for mentee
    const [userData,setUserData] = useState({ name: '', email: '',occupation:'', phone: '' ,imageUrl :''})
    const [userRole,setUserRole] = useState('')
    const [financialGoals, setFinancialGoals] = useState([]);
    const [workGoals, setWorkGoals] = useState([]);
    useEffect(() => {
        console.log("Home context "+id)
        

        db.collection("users").doc(id).get().then((doc) => {
            var data = doc.data()
            setUserData({ name: data.displayName, email: id,occupation:data.occupation, phone: data.phoneNumber,imageUrl :data.imageUrl })
            setUserRole(data.role)
          })
          var dbRef = db.collection('users').doc(id).collection("Goals").doc('Financial').collection('FinancialGoals')
          dbRef.onSnapshot(snapshot => {
              setFinancialGoals(snapshot.docs.map(doc => ({
                  id: doc.id,
                  post: doc.data(),
                  name: doc.data().Title,
                  percentage : doc.data().currentPercentage
              })));
          })
          console.log(financialGoals)

          var dbRefWork = db.collection('users').doc(id).collection("Goals").doc('Work').collection('WorkGoals')
        dbRefWork.onSnapshot(snapshot => {
            setWorkGoals(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data(),
                name: doc.data().title,
                percentage : doc.data().percentage
            })));
        })
          
      }, []);

      
    
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
        scales: {
            x: { // defining min and max so hiding the dataset does not change scale range
              min: 0,
              max: 100
            }
          }
    };

    return (
        <ThemeProvider theme={theme}>
            <body class="homeBody">
                <div class="container home">
                    <Typography variant="h3" style={{paddingTop:'20px'}}>
                        Mentee Profile
                        <FaceIcon sx={{ width: 50, height: 50, marginLeft: '10px', marginBottom: '10px' }} fontSize="large" />
                    </Typography>
                    
                    {/* Profile Area */}

                    <div style={{ height: '100%', width: '100%' }}>
                    <Grid container spacing={2} justifyContent="flex-start" alignItems="flex-start" >
                        <Grid item xs={4} style={{ marginTop: "40px", height: "100%" }}>
                            <Item3 sx={{ height: '100%', backgroundColor: '#f7f6f6' }}>
                                <Box display='flex' justifyContent='center' alignItems='center'>
                                    <Avatar src={userData.imageUrl == '' ? "https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png" : userData.imageUrl} sx={{ width: '200px', height: '200px' }} />
                                </Box>

                                {/* Profile content */}

                                <Container sx={{ marginLeft: '10px', marginTop: '30px' }}>
                                    <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'left' }}>{userData.name}</Typography>
                                    <Typography variant="h6" style={{ marginTop: '5px', textAlign: 'left' }}><WorkIcon sx={{ marginRight: '10px' }} />{userData.occupation}</Typography>
                                    <Typography variant="h6" style={{ marginTop: '5px', textAlign: 'left' }}><EmailIcon sx={{ marginRight: '10px' }} />{userData.email}</Typography>
                                    <Typography variant="h6" style={{ marginTop: '5px', textAlign: 'left' }}><LocalPhoneIcon sx={{ marginRight: '10px' }} />{userData.phone}</Typography>
                                    <Typography variant="h4" sx={{ marginTop: '70px', textAlign: 'left' }}>Ongoing Activities</Typography>
                                    <Box display='flex' justifyContent='flex-start' alignItems='center' sx={{ backgroundColor: '#26a326', borderRadius: '16px', marginTop: '20px', width: '200px' }}>
                                        <TrackChangesIcon sx={{ color: 'white', width: '50px', height: '50px', marginLeft: '10px', marginRight: '10px' }} />
                                        <Typography sx={{ marginBottom: '20px', color: 'white' }}>Work Goals: {workGoals.length}</Typography>
                                    </Box>
                                    <Box display='flex' justifyContent='flex-start' alignItems='center' sx={{ backgroundColor: '#c22370', borderRadius: '16px', marginTop: '20px', width: '200px' }}>
                                        <MonetizationOnIcon sx={{ color: 'white', width: '50px', height: '50px', marginLeft: '10px', marginRight: '10px' }} />
                                        <Typography sx={{ marginBottom: '20px', color: 'white' }}>Financial Goal: {financialGoals.length}</Typography>
                                    </Box>
                                </Container>
                            </Item3>
                        </Grid>
                        <Grid item xs={8} style={{ paddingLeft : '3%'}}>
                            <Item3 sx={{ height: '100%', marginTop: '40px',marginBottom:'40px', backgroundColor: '#f7f6f6' }}>

                                <Grid >
                                    <Grid item xs={9}>
                                        <Item2>
                                            <Typography variant="h4" textAlign="center" style={{ marginLeft: "10px" }}>Work Goal Progress</Typography>
                                            {/* Progress Bar */}
                                            <Bar options={options} 
                                            data={{
                                                labels : workGoals.map(({ name }) => name),
                                                datasets: [
                                                    {
                                                        label: 'Percentage %',
                                                        data: workGoals.map(({ percentage }) => percentage),
                                                        // borderColor: 'rgb(255, 99, 132)',
                                                        // backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                                        borderColor: '#04870f',
                                                        backgroundColor: '#89f592',
                                                    },
                                                ],
                                            }
                                            } 
                                            style={{ marginTop: "10px", marginBottom: "30px" }} />

                                        </Item2>
                                        
                                    </Grid>
                                    
                                </Grid>

                                <Grid >
                                    <Grid item xs={9} style={{marginTop:'20px'}}>
                                        <Item2>
                                            <Typography variant="h4" textAlign="center" style={{ marginLeft: "10px" }}>Financial Goal Progress</Typography>
                                            {/* Progress Bar */}
                                            <Bar options={options} 
                                            data={{
                                                labels : financialGoals.map(({ name }) => name),
                                                datasets: [
                                                    {
                                                        label: 'Percentage %',
                                                        data: financialGoals.map(({ percentage }) => percentage),
                                                        borderColor: 'rgb(255, 99, 132)',
                                                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                                        // borderColor: '#04870f',
                                                        // backgroundColor: '#89f592',
                                                    },
                                                ],
                                            }
                                            }  
                                            style={{ marginTop: "10px", marginBottom: "30px" }} />

                                        </Item2>
                                        
                                    </Grid>
                                    
                                </Grid>
                            </Item3>
                        </Grid>
                    </Grid>

                </div>
            

                    {/* Goals area */}
                    <Typography variant="h3" sx={{ marginBottom: '30px', marginTop: '50px' }}>
                        Work Goals
                        <TrackChangesIcon sx={{ width: 50, height: 50, marginLeft: '10px', marginBottom: '10px' }} fontSize="large" />
                    </Typography>
                    {/* For Work data */}
                    {workGoals.map((goal, index) => (
                        <WorkGoalPost 
                        goalData ={goal.post} 
                        id={goal.id}
                        email={id}/>
                    )) }


                    <div></div>
                    <Typography variant="h3" sx={{ marginBottom: '30px', marginTop: '50px' }}>
                        Financial Goals
                        <MonetizationOnIcon sx={{ width: 50, height: 50, marginLeft: '10px', marginBottom: '10px' }} fontSize="large" />
                    </Typography>
                    {financialGoals.map((goal, index) => (
                        <FinancialGoalPost
                            goalData = {goal.post}
                            id = {goal.id}
                            email = {id}
                        />))}
                </div>
            </body>
        </ThemeProvider>
    )
}

export default MenteeProfile;