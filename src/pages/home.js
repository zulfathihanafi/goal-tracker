import logo from "../logo192.png";
import { auth, db } from "../components/firebase";
import { UserContext } from '../userContext'
import { useState, useEffect, useContext } from "react";
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
    borderRadius: "10px"
}));

const Item2 = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: 0,
    boxShadow: 'none',
    borderRadius: "10px"
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

const Home = () => {
    // var userRole ="Mentee"
    const { user, setUser } = useContext(UserContext);

    const [userData, setUserData] = useState({ name: '', email: '', occupation: '', phone: '',imageUrl :'' })
    const [userRole, setUserRole] = useState('')

    const [financialGoals, setFinancialGoals] = useState([])
    const [workGoals, setWorkGoals] = useState([])

    const [workNames, setWorkNames] = useState([])
    const [financialNames, setFinancialNames] = useState([])
    const [workPercentages, setWorkPercentages] = useState([])
    const [financialPercentages, setFinancialPercentages] = useState([])
    const [workDatas, setWorkDatas] = useState()


    useEffect(() => {
        console.log("Home context " + user.email)


        db.collection("users").doc(user.email).get().then((doc) => {
            var data = doc.data()
            setUserData({ name: data.displayName, email: user.email, occupation: data.occupation, phone: data.phoneNumber, imageUrl:data.imageUrl })
            setUserRole(data.role)
        })

        // var dbRefFinancial = db.collection('users').doc(user.email).collection("Goals").doc('Financial').collection('FinancialGoals')
        // dbRefFinancial.onSnapshot(snapshot => {
        //     setFinancialGoals(snapshot.docs.map(doc => ({
        //         id: doc.id,
        //         name: doc.data().Title,
        //         percentage : doc.data().currentPercentage
        //     })));
        // })
        

        // var dbRefWork = db.collection('users').doc(user.email).collection("Goals").doc('Work').collection('WorkGoals')
        // dbRefWork.onSnapshot(snapshot => {
        //     setWorkGoals(snapshot.docs.map(doc => ({
        //         id: doc.id,
        //         name: doc.data().title,
        //         percentage : doc.data().percentage
        //     })));
        // })

        

    }, []);

    useEffect(() => {
        var dbRef = db.collection('users').doc(user.email).collection("Goals").doc('Financial').collection('FinancialGoals')
        dbRef.onSnapshot(snapshot => {
            setFinancialGoals(snapshot.docs.map(doc => ({
                id: doc.id,
                name: doc.data().Title,
                percentage : doc.data().currentPercentage
            })));
            setFinancialNames(financialGoals.map(({ name }) => name))
            setFinancialPercentages(financialGoals.map(({ percentage }) => percentage))
        });

        var dbRef2 = db.collection('users').doc(user.email).collection("Goals").doc('Work').collection('WorkGoals')
        dbRef2.onSnapshot(snapshot => {
            setWorkGoals(snapshot.docs.map(doc => ({
                id: doc.id,
                name: doc.data().title,
                percentage : doc.data().percentage
            })));

            
            
        })
        setWorkNames(workGoals.map(({ name }) => name))
        console.log(workNames)
    }, [userRole])




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

    if (userRole == "Mentee") {
        return (
            <ThemeProvider theme={theme}>
                <div class="homeBody" style={{ height: '100%', width: '100%' }}>
                    <Grid container spacing={2} justifyContent="flex-start" alignItems="flex-start" >
                        <Grid item xs={3} style={{ marginTop: "40px", height: "100%" }}>
                            <Item3 sx={{ height: '100%', backgroundColor: '#f7f6f6' }}>
                                <Box display='flex' justifyContent='center' alignItems='center'>
                                    <Avatar src={userData.imageUrl == '' ? "https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png" : userData.imageUrl} sx={{ width: '200px', height: '200px' }} />
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
                                        <Typography sx={{ marginBottom: '20px', color: 'white' }}>Work Goals: {workGoals.length}</Typography>
                                    </Box>
                                    <Box display='flex' justifyContent='flex-start' alignItems='center' sx={{ backgroundColor: '#c22370', borderRadius: '16px', marginTop: '20px', width: '200px' }}>
                                        <MonetizationOnIcon sx={{ color: 'white', width: '50px', height: '50px', marginLeft: '10px', marginRight: '10px' }} />
                                        <Typography sx={{ marginBottom: '20px', color: 'white' }}>Financial Goal: {financialGoals.length}</Typography>
                                    </Box>
                                </Container>
                            </Item3>
                        </Grid>
                        <Grid item xs={9} style={{ paddingLeft : '5%'}}>
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