import logo from "../logo192.png";
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
import '../styles/homementor.css'
import { work, financial } from "../data/goals";
import AddTaskIcon from '@mui/icons-material/AddTask';
import Input from '@mui/material/Input';
import { Navigate, useNavigate } from 'react-router-dom'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { mentee } from "../data/user";
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

import ViewListIcon from '@mui/icons-material/ViewList';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import FaceIcon from '@mui/icons-material/Face';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ForumIcon from '@mui/icons-material/Forum';
import PeopleIcon from '@mui/icons-material/People';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
const HomeMentor = ({ userRole }) => {

    const theme = createTheme({
        typography: {
            fontFamily: [
                'Nunito', 
                'sans-serif',
            ].join(','),
        },
    });
    
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'white' ? '#fff' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.primary,
    }));

    const Item2 = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'white' ? '#fff' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        boxShadow: 'none',
    }));
    

    if (userRole == "mentor") {
        return (
            <ThemeProvider theme={theme}>
                <body class="homebody">
                    <div class="container home" style={{ paddingTop: '20px' }}>
                        <Typography variant="h3" sx={{ textAlign: 'center' }}>
                            Welcome back, Fathi!
                        </Typography>

                        <Grid container spacing={1} sx={{ marginTop: '20px' }}>
                            <Grid item xs={6}>
                                <Item>
                                    <Typography variant="h4" sx={{ marginTop: "20px", marginBottom: "30px" }}>
                                        Current Activities
                                        <AppRegistrationIcon fontSize="large" sx={{ width: 40, height: 40, marginLeft: '10px', marginBottom: '10px' }} />
                                    </Typography>
                                    <Stack sx={{ marginTop: "30px", marginBottom: '30px' }} justifyContent='space-evenly' alignItems='baseline' direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
                                        <Item2>
                                            <FaceIcon color="primary" fontSize="large" sx={{ width: 70, height: 70, marginBottom: '20px' }} />
                                            <Typography variant="h5">
                                                20<br></br>Active Mentee
                                            </Typography>
                                        </Item2>
                                        <Item2>
                                            <CheckCircleIcon color="success" fontSize="large" sx={{ width: 70, height: 70, marginBottom: '20px' }} />
                                            <Typography variant="h5">
                                                101<br></br>Completed Goals
                                            </Typography>
                                        </Item2>
                                        <Item2>
                                            <HighlightOffIcon color="error" fontSize="large" sx={{ width: 70, height: 70, marginBottom: '20px' }} />
                                            <Typography variant="h5">
                                                365<br></br>Incomplete Goals
                                            </Typography>
                                        </Item2>
                                    </Stack>
                                </Item>
                            </Grid>
                            <Grid item xs={6}>
                                <Item sx={{ height: '100%' }}>
                                    <Typography variant="h4" sx={{ marginTop: "20px", marginBottom: "30px" }}>
                                        Overview
                                        <ForumIcon fontSize="large" sx={{ width: 40, height: 40, marginLeft: '20px' }} />
                                    </Typography>
                                    <Grid container spacing="1">
                                        <Grid item2 xs={4}>
                                            <Item2>
                                                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                                    <CircularProgress style={{ 'position': 'absolute', 'color': '#c0c0c0' }} variant="determinate" size={70} thickness={5} value={100} />
                                                    <CircularProgress style={{ 'color': 'blue' }} variant="determinate" size={70} thickness={5} value={40} />
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
                                                            40%
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <Typography variant="h5" sx={{ marginTop: '20px' }}>
                                                    Response percentage
                                                </Typography>
                                            </Item2>
                                        </Grid>
                                        <Grid item2 xs={4}>
                                            <Item2 justifyContent="flex-start" alignItems="flex-start">
                                                <DriveFileRenameOutlineIcon color="primary" fontSize="large" sx={{ width: 70, height: 70, marginBottom: '20px', marginRight: '20px' }} />
                                                <Typography variant="h5">
                                                    24 Comments Given
                                                </Typography>
                                            </Item2>
                                        </Grid>
                                        <Grid item2 xs={4}>
                                            <Item2>
                                                <CheckCircleIcon color="success" fontSize="large" sx={{ width: 70, height: 70, marginBottom: '20px', marginRight: '20px' }} />
                                                <Typography variant="h5">
                                                    6 Comments Accepted
                                                </Typography>
                                            </Item2>
                                        </Grid>
                                    </Grid>
                                    <Box display="flex" justifyContent='flex-end' alignItems='center' sx={{ marginTop: "10px", marginRight: '20px', marginBottom: '10px' }}>
                                        <Button color="primary" variant="contained" >
                                            Check All Comments
                                        </Button>
                                    </Box>
                                </Item>
                            </Grid>
                        </Grid>
                        <Typography variant="h4" sx={{ marginTop: "80px", marginBottom: "30px" }}>
                            Mentee List
                            <PeopleIcon fontSize="large" sx={{ width: 40, height: 40, marginLeft: '20px', marginBottom: '10px' }} />
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <Item sx={{ height: '100%', border: 1, borderColor: 'secondary.main' }}>
                                    <Box display="flex" justifyContent='center' alignItems='center' sx={{ marginTop: "10px" }}>
                                        <Avatar sx={{ width: "80px", height: "80px", bgcolor: deepPurple[500] }}>M1</Avatar>
                                    </Box>
                                    <Typography variant="h5" sx={{ marginTop: "20px", color: "black" }}>
                                        Mentee 1
                                    </Typography>
                                    <Stack sx={{ marginTop: "20px" }} justifyContent='center' alignItems='baseline' direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
                                        <Item2>
                                            <Typography variant="h6">
                                                3 <br></br>completed
                                            </Typography>
                                        </Item2>
                                        <Item2>
                                            <Typography variant="h6">
                                                12 <br></br> incomplete
                                            </Typography>
                                        </Item2>
                                    </Stack>
                                    <Button variant="outlined" sx={{ marginTop: '20px', marginBottom: '20px' }}>
                                        View Profile
                                    </Button>
                                </Item>
                            </Grid>
                            <Grid item xs={3}>
                                <Item sx={{ height: '100%', border: 1, borderColor: 'secondary.main' }}>
                                    <Box display="flex" justifyContent='center' alignItems='center' sx={{ marginTop: "10px" }}>
                                        <Avatar sx={{ width: "80px", height: "80px", bgcolor: deepPurple[500] }}>M1</Avatar>
                                    </Box>
                                    <Typography variant="h5" sx={{ marginTop: "20px", color: "black" }}>
                                        Mentee 1
                                    </Typography>
                                    <Stack sx={{ marginTop: "20px" }} justifyContent='center' alignItems='baseline' direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
                                        <Item2>
                                            <Typography variant="h6">
                                                3 <br></br>completed
                                            </Typography>
                                        </Item2>
                                        <Item2>
                                            <Typography variant="h6">
                                                12 <br></br> incomplete
                                            </Typography>
                                        </Item2>
                                    </Stack>
                                    <Button variant="outlined" sx={{ marginTop: '20px', marginBottom: '20px' }}>
                                        View Profile
                                    </Button>
                                </Item>
                            </Grid>
                            <Grid item xs={3}>
                                <Item sx={{ height: '100%', border: 1, borderColor: 'secondary.main' }}>
                                    <Box display="flex" justifyContent='center' alignItems='center' sx={{ marginTop: "10px" }}>
                                        <Avatar sx={{ width: "80px", height: "80px", bgcolor: deepPurple[500] }}>M1</Avatar>
                                    </Box>
                                    <Typography variant="h5" sx={{ marginTop: "20px", color: "black" }}>
                                        Mentee 1
                                    </Typography>
                                    <Stack sx={{ marginTop: "20px" }} justifyContent='center' alignItems='baseline' direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
                                        <Item2>
                                            <Typography variant="h6">
                                                3 <br></br>completed
                                            </Typography>
                                        </Item2>
                                        <Item2>
                                            <Typography variant="h6">
                                                12 <br></br> incomplete
                                            </Typography>
                                        </Item2>
                                    </Stack>
                                    <Button variant="outlined" sx={{ marginTop: '20px', marginBottom: '20px' }}>
                                        View Profile
                                    </Button>
                                </Item>
                            </Grid>
                            <Grid item xs={3}>
                                <Item sx={{ height: '100%', border: 1, borderColor: 'secondary.main' }}>
                                    <Box display="flex" justifyContent='center' alignItems='center' sx={{ marginTop: "10px" }}>
                                        <Avatar sx={{ width: "80px", height: "80px", bgcolor: deepPurple[500] }}>M1</Avatar>
                                    </Box>
                                    <Typography variant="h5" sx={{ marginTop: "20px", color: "black" }}>
                                        Mentee 1
                                    </Typography>
                                    <Stack sx={{ marginTop: "20px" }} justifyContent='center' alignItems='baseline' direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
                                        <Item2>
                                            <Typography variant="h6">
                                                3 <br></br>completed
                                            </Typography>
                                        </Item2>
                                        <Item2>
                                            <Typography variant="h6">
                                                12 <br></br> incomplete
                                            </Typography>
                                        </Item2>
                                    </Stack>
                                    <Button variant="outlined" sx={{ marginTop: '20px', marginBottom: '20px' }}>
                                        View Profile
                                    </Button>
                                </Item>
                            </Grid>
                            <Grid item xs={3}>
                                <Item sx={{ height: '100%', border: 1, borderColor: 'secondary.main' }}>
                                    <Box display="flex" justifyContent='center' alignItems='center' sx={{ marginTop: "10px" }}>
                                        <Avatar sx={{ width: "80px", height: "80px", bgcolor: deepPurple[500] }}>M1</Avatar>
                                    </Box>
                                    <Typography variant="h5" sx={{ marginTop: "20px", color: "black" }}>
                                        Mentee 1
                                    </Typography>
                                    <Stack sx={{ marginTop: "20px" }} justifyContent='center' alignItems='baseline' direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
                                        <Item2>
                                            <Typography variant="h6">
                                                3 <br></br>completed
                                            </Typography>
                                        </Item2>
                                        <Item2>
                                            <Typography variant="h6">
                                                12 <br></br> incomplete
                                            </Typography>
                                        </Item2>
                                    </Stack>
                                    <Button variant="outlined" sx={{ marginTop: '20px', marginBottom: '20px' }}>
                                        View Profile
                                    </Button>
                                </Item>
                            </Grid>
                            <Grid item xs={3}>
                                <Item sx={{ height: '100%', border: 1, borderColor: 'secondary.main' }}>
                                    <Box display="flex" justifyContent='center' alignItems='center' sx={{ marginTop: "10px" }}>
                                        <Avatar sx={{ width: "80px", height: "80px", bgcolor: deepPurple[500] }}>M1</Avatar>
                                    </Box>
                                    <Typography variant="h5" sx={{ marginTop: "20px", color: "black" }}>
                                        Mentee 1
                                    </Typography>
                                    <Stack sx={{ marginTop: "20px" }} justifyContent='center' alignItems='baseline' direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
                                        <Item2>
                                            <Typography variant="h6">
                                                3 <br></br>completed
                                            </Typography>
                                        </Item2>
                                        <Item2>
                                            <Typography variant="h6">
                                                12 <br></br> incomplete
                                            </Typography>
                                        </Item2>
                                    </Stack>
                                    <Button variant="outlined" sx={{ marginTop: '20px', marginBottom: '20px' }}>
                                        View Profile
                                    </Button>
                                </Item>
                            </Grid>
                            <Grid item xs={3}>
                                <Item sx={{ height: '100%', border: 1, borderColor: 'secondary.main' }}>
                                    <Box display="flex" justifyContent='center' alignItems='center' sx={{ marginTop: "10px" }}>
                                        <Avatar sx={{ width: "80px", height: "80px", bgcolor: deepPurple[500] }}>M1</Avatar>
                                    </Box>
                                    <Typography variant="h5" sx={{ marginTop: "20px", color: "black" }}>
                                        Mentee 1
                                    </Typography>
                                    <Stack sx={{ marginTop: "20px" }} justifyContent='center' alignItems='baseline' direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
                                        <Item2>
                                            <Typography variant="h6">
                                                3 <br></br>completed
                                            </Typography>
                                        </Item2>
                                        <Item2>
                                            <Typography variant="h6">
                                                12 <br></br> incomplete
                                            </Typography>
                                        </Item2>
                                    </Stack>
                                    <Button variant="outlined" sx={{ marginTop: '20px', marginBottom: '20px' }}>
                                        View Profile
                                    </Button>
                                </Item>
                            </Grid>
                            <Grid item xs={3}>
                                <Item sx={{ height: '100%', border: 1, borderColor: 'secondary.main' }}>
                                    <Box display="flex" justifyContent='center' alignItems='center' sx={{ marginTop: "10px" }}>
                                        <Avatar sx={{ width: "80px", height: "80px", bgcolor: deepPurple[500] }}>M1</Avatar>
                                    </Box>
                                    <Typography variant="h5" sx={{ marginTop: "20px", color: "black" }}>
                                        Mentee 1
                                    </Typography>
                                    <Stack sx={{ marginTop: "20px" }} justifyContent='center' alignItems='baseline' direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
                                        <Item2>
                                            <Typography variant="h6">
                                                3 <br></br>completed
                                            </Typography>
                                        </Item2>
                                        <Item2>
                                            <Typography variant="h6">
                                                12 <br></br> incomplete
                                            </Typography>
                                        </Item2>
                                    </Stack>
                                    <Button variant="outlined" sx={{ marginTop: '20px', marginBottom: '20px' }}>
                                        View Profile
                                    </Button>
                                </Item>
                            </Grid>
                        </Grid>
                    </div>
                    <div >

                    </div>
                </body>
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

export default HomeMentor