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
import FaceIcon from '@mui/icons-material/Face';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ViewListIcon from '@mui/icons-material/ViewList';
import PeopleIcon from '@mui/icons-material/People';
import ForumIcon from '@mui/icons-material/Forum';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';


const Comments = () => {

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
        borderRadius: 0,
        boxShadow: '3',
    }));

    const Item2 = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'white' ? '#fff' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        alignItems: 'flex-end',
        color: theme.palette.text.secondary,
        borderRadius: 0,
        boxShadow: 'none',
    }));
    

    return (
        <ThemeProvider theme={theme}>
            <body class="homebody">
                <div class="container home">
                    <Typography variant="h4" justifyContent="flex-start" alignItems="flex-start" sx={{ textAlign: 'left', marginBottom: '20px' }}>
                        Unchecked Comments
                    </Typography>
                    <Stack container spacing={2}>
                        <Item2 sx={{ boxShadow: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <Item2 sx={{ height: '100%' }}>
                                        <Box display="flex" justifyContent='center' alignItems='center' sx={{ marginTop: "10px" }}>
                                            <Avatar sx={{ width: "50px", height: "50px", backgroundColor: 'blue' }}>FI</Avatar>
                                        </Box>
                                        <Typography variant="h6" sx={{ color: 'black', marginTop: '10px' }}>
                                            Fatehi Imran
                                        </Typography>
                                    </Item2>
                                </Grid>
                                <Grid item xs={6}>
                                    <Item2>
                                        <Typography variant="h6" sx={{ color: 'black', textAlign: 'center' }}>
                                            Comment
                                        </Typography>
                                        <Typography alignItems='center' sx={{ textAlign: 'left' }}>
                                            The progress of the goal is very good. All the tasks were done before the deadline. Other than that, please make sure that your last 3 tasks are finished before the deadline because it is very crucial for you to reach the final objective.
                                        </Typography>
                                    </Item2>
                                </Grid>
                                <Grid item xs={2}>
                                    <Item2>
                                        <Typography variant="h6" sx={{ color: 'black', textAlign: 'center' }}>
                                            Goal Detail
                                        </Typography>
                                        <Typography alignItems='center' sx={{ textAlign: 'center' }}>
                                            Web Programming,<br></br> Work Goal
                                        </Typography>
                                    </Item2>
                                </Grid>
                                <Grid item xs={1.5}>
                                    <Item2>
                                        <Typography variant="h6" sx={{ color: 'black', textAlign: 'center' }}>
                                            Date Given
                                        </Typography>
                                        <Typography alignItems='center' sx={{ alignItems:'center', textAlign: 'center' }}>
                                            10 July 2022
                                        </Typography>
                                    </Item2>
                                </Grid>
                                <Grid item xs={0.5}>
                                    <Item2 justifyContent='center' alignItems='center' sx={{ height: '100%'}}>
                                        <Box display="flex" justifyContent='center' alignItems='center' sx={{ height: '100%'}}>
                                            <IconButton aria-label="upload picture" component="span" justifyContent='center' alignItems='center' sx={{ marginLeft: '55px', width: '60px', height: '60px', backgroundColor: 'primary.dark', color: 'white', '&:hover': {backgroundColor: 'primary.main'},  }}>
                                                <ArrowForwardIosIcon />
                                            </IconButton>
                                        </Box>
                                    </Item2>
                                </Grid>
                            </Grid>
                        </Item2>
                        <Item2 sx={{ boxShadow: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <Item2 sx={{ height: '100%' }}>
                                        <Box display="flex" justifyContent='center' alignItems='center' sx={{ marginTop: "10px" }}>
                                            <Avatar sx={{ width: "50px", height: "50px", bgcolor: deepPurple[500] }}>SP</Avatar>
                                        </Box>
                                        <Typography variant="h6" sx={{ color: 'black', marginTop: '10px' }}>
                                            Shawn Pakhruddin
                                        </Typography>
                                    </Item2>
                                </Grid>
                                <Grid item xs={6}>
                                    <Item2>
                                        <Typography variant="h6" sx={{ color: 'black', textAlign: 'center' }}>
                                            Comment
                                        </Typography>
                                        <Typography alignItems='center' sx={{ textAlign: 'left' }}>
                                            The progress of the goal is very good. All the tasks were done before the deadline. Other than that, please make sure that your last 3 tasks are finished before the deadline because it is very crucial for you to reach the final objective.
                                        </Typography>
                                    </Item2>
                                </Grid>
                                <Grid item xs={2}>
                                    <Item2>
                                        <Typography variant="h6" sx={{ color: 'black', textAlign: 'center' }}>
                                            Goal Detail
                                        </Typography>
                                        <Typography alignItems='center' sx={{ textAlign: 'center' }}>
                                            Tabung Kahwin,<br></br> Financial Goal
                                        </Typography>
                                    </Item2>
                                </Grid>
                                <Grid item xs={1.5}>
                                    <Item2>
                                        <Typography variant="h6" sx={{ color: 'black', textAlign: 'center' }}>
                                            Date Given
                                        </Typography>
                                        <Typography alignItems='center' sx={{ alignItems:'center', textAlign: 'center' }}>
                                            10 July 2022
                                        </Typography>
                                    </Item2>
                                </Grid>
                                <Grid item xs={0.5}>
                                    <Item2 justifyContent='center' alignItems='center' sx={{ height: '100%'}}>
                                        <Box display="flex" justifyContent='center' alignItems='center' sx={{ height: '100%'}}>
                                            <IconButton aria-label="upload picture" component="span" justifyContent='center' alignItems='center' sx={{ marginLeft: '55px', width: '60px', height: '60px', backgroundColor: 'primary.dark', color: 'white', '&:hover': {backgroundColor: 'primary.main'},  }}>
                                                <ArrowForwardIosIcon />
                                            </IconButton>
                                        </Box>
                                    </Item2>
                                </Grid>
                            </Grid>
                        </Item2>
                        <Item2 sx={{ boxShadow: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <Item2 sx={{ height: '100%' }}>
                                        <Box display="flex" justifyContent='center' alignItems='center' sx={{ marginTop: "10px" }}>
                                            <Avatar sx={{ width: "50px", height: "50px", backgroundColor: 'red' }}>YY</Avatar>
                                        </Box>
                                        <Typography variant="h6" sx={{ color: 'black', marginTop: '10px' }}>
                                            Yang Yang
                                        </Typography>
                                    </Item2>
                                </Grid>
                                <Grid item xs={6}>
                                    <Item2>
                                        <Typography variant="h6" sx={{ color: 'black', textAlign: 'center' }}>
                                            Comment
                                        </Typography>
                                        <Typography alignItems='center' sx={{ textAlign: 'left' }}>
                                            The progress of the goal is very good. All the tasks were done before the deadline. Other than that, please make sure that your last 3 tasks are finished before the deadline because it is very crucial for you to reach the final objective.
                                        </Typography>
                                    </Item2>
                                </Grid>
                                <Grid item xs={2}>
                                    <Item2>
                                        <Typography variant="h6" sx={{ color: 'black', textAlign: 'center' }}>
                                            Goal Detail
                                        </Typography>
                                        <Typography alignItems='center' sx={{ textAlign: 'center' }}>
                                            Software Modelling,<br></br> Work Goal
                                        </Typography>
                                    </Item2>
                                </Grid>
                                <Grid item xs={1.5}>
                                    <Item2>
                                        <Typography variant="h6" sx={{ color: 'black', textAlign: 'center' }}>
                                            Date Given
                                        </Typography>
                                        <Typography alignItems='center' sx={{ alignItems:'center', textAlign: 'center' }}>
                                            10 July 2022
                                        </Typography>
                                    </Item2>
                                </Grid>
                                <Grid item xs={0.5}>
                                    <Item2 justifyContent='center' alignItems='center' sx={{ height: '100%'}}>
                                        <Box display="flex" justifyContent='center' alignItems='center' sx={{ height: '100%'}}>
                                            <IconButton aria-label="upload picture" component="span" justifyContent='center' alignItems='center' sx={{ marginLeft: '55px', width: '60px', height: '60px', backgroundColor: 'primary.dark', color: 'white', '&:hover': {backgroundColor: 'primary.main'},  }}>
                                                <ArrowForwardIosIcon />
                                            </IconButton>
                                        </Box>
                                    </Item2>
                                </Grid>
                            </Grid>
                        </Item2>
                    </Stack>
                    <Typography variant="h4" justifyContent="flex-start" alignItems="flex-start" sx={{ textAlign: 'left', marginTop: '70px', marginBottom: '30px' }}>
                        Checked Comments
                    </Typography>
                    <Stack container spacing={2}>
                        <Item2 sx={{ boxShadow: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <Item2 sx={{ height: '100%' }}>
                                        <Box display="flex" justifyContent='center' alignItems='center' sx={{ marginTop: "10px" }}>
                                            <Avatar sx={{ width: "50px", height: "50px", backgroundColor: 'blue' }}>FI</Avatar>
                                        </Box>
                                        <Typography variant="h6" sx={{ color: 'black', marginTop: '10px' }}>
                                            Fatehi Imran
                                        </Typography>
                                    </Item2>
                                </Grid>
                                <Grid item xs={6}>
                                    <Item2>
                                        <Typography variant="h6" sx={{ color: 'black', textAlign: 'center' }}>
                                            Comment
                                        </Typography>
                                        <Typography alignItems='center' sx={{ textAlign: 'left' }}>
                                            The progress of the goal is very good. All the tasks were done before the deadline. Other than that, please make sure that your last 3 tasks are finished before the deadline because it is very crucial for you to reach the final objective.
                                        </Typography>
                                    </Item2>
                                </Grid>
                                <Grid item xs={2}>
                                    <Item2>
                                        <Typography variant="h6" sx={{ color: 'black', textAlign: 'center' }}>
                                            Goal Detail
                                        </Typography>
                                        <Typography alignItems='center' sx={{ textAlign: 'center' }}>
                                            Web Programming,<br></br> Work Goal
                                        </Typography>
                                    </Item2>
                                </Grid>
                                <Grid item xs={1.5}>
                                    <Item2>
                                        <Typography variant="h6" sx={{ color: 'black', textAlign: 'center' }}>
                                            Date Given
                                        </Typography>
                                        <Typography alignItems='center' sx={{ alignItems:'center', textAlign: 'center' }}>
                                            10 July 2022
                                        </Typography>
                                    </Item2>
                                </Grid>
                                <Grid item xs={0.5}>
                                    <Item2 justifyContent='center' alignItems='center' sx={{ height: '100%'}}>
                                        <Box display="flex" justifyContent='center' alignItems='center' sx={{ height: '100%'}}>
                                            <IconButton aria-label="upload picture" component="span" justifyContent='center' alignItems='center' sx={{ marginLeft: '55px', width: '60px', height: '60px', backgroundColor: 'primary.dark', color: 'white', '&:hover': {backgroundColor: 'primary.main'},  }}>
                                                <ArrowForwardIosIcon />
                                            </IconButton>
                                        </Box>
                                    </Item2>
                                </Grid>
                            </Grid>
                        </Item2>
                        <Item2 sx={{ boxShadow: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <Item2 sx={{ height: '100%' }}>
                                        <Box display="flex" justifyContent='center' alignItems='center' sx={{ marginTop: "10px" }}>
                                            <Avatar sx={{ width: "50px", height: "50px", bgcolor: deepPurple[500] }}>SP</Avatar>
                                        </Box>
                                        <Typography variant="h6" sx={{ color: 'black', marginTop: '10px' }}>
                                            Shawn Pakhruddin
                                        </Typography>
                                    </Item2>
                                </Grid>
                                <Grid item xs={6}>
                                    <Item2>
                                        <Typography variant="h6" sx={{ color: 'black', textAlign: 'center' }}>
                                            Comment
                                        </Typography>
                                        <Typography alignItems='center' sx={{ textAlign: 'left' }}>
                                            The progress of the goal is very good. All the tasks were done before the deadline. Other than that, please make sure that your last 3 tasks are finished before the deadline because it is very crucial for you to reach the final objective.
                                        </Typography>
                                    </Item2>
                                </Grid>
                                <Grid item xs={2}>
                                    <Item2>
                                        <Typography variant="h6" sx={{ color: 'black', textAlign: 'center' }}>
                                            Goal Detail
                                        </Typography>
                                        <Typography alignItems='center' sx={{ textAlign: 'center' }}>
                                            Tabung Kahwin,<br></br> Financial Goal
                                        </Typography>
                                    </Item2>
                                </Grid>
                                <Grid item xs={1.5}>
                                    <Item2>
                                        <Typography variant="h6" sx={{ color: 'black', textAlign: 'center' }}>
                                            Date Given
                                        </Typography>
                                        <Typography alignItems='center' sx={{ alignItems:'center', textAlign: 'center' }}>
                                            10 July 2022
                                        </Typography>
                                    </Item2>
                                </Grid>
                                <Grid item xs={0.5}>
                                    <Item2 justifyContent='center' alignItems='center' sx={{ height: '100%'}}>
                                        <Box display="flex" justifyContent='center' alignItems='center' sx={{ height: '100%'}}>
                                            <IconButton aria-label="upload picture" component="span" justifyContent='center' alignItems='center' sx={{ marginLeft: '55px', width: '60px', height: '60px', backgroundColor: 'primary.dark', color: 'white', '&:hover': {backgroundColor: 'primary.main'},  }}>
                                                <ArrowForwardIosIcon />
                                            </IconButton>
                                        </Box>
                                    </Item2>
                                </Grid>
                            </Grid>
                        </Item2>
                        <Item2 sx={{ boxShadow: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <Item2 sx={{ height: '100%' }}>
                                        <Box display="flex" justifyContent='center' alignItems='center' sx={{ marginTop: "10px" }}>
                                            <Avatar sx={{ width: "50px", height: "50px", backgroundColor: 'red' }}>YY</Avatar>
                                        </Box>
                                        <Typography variant="h6" sx={{ color: 'black', marginTop: '10px' }}>
                                            Yang Yang
                                        </Typography>
                                    </Item2>
                                </Grid>
                                <Grid item xs={6}>
                                    <Item2>
                                        <Typography variant="h6" sx={{ color: 'black', textAlign: 'center' }}>
                                            Comment
                                        </Typography>
                                        <Typography alignItems='center' sx={{ textAlign: 'left' }}>
                                            The progress of the goal is very good. All the tasks were done before the deadline. Other than that, please make sure that your last 3 tasks are finished before the deadline because it is very crucial for you to reach the final objective.
                                        </Typography>
                                    </Item2>
                                </Grid>
                                <Grid item xs={2}>
                                    <Item2>
                                        <Typography variant="h6" sx={{ color: 'black', textAlign: 'center' }}>
                                            Goal Detail
                                        </Typography>
                                        <Typography alignItems='center' sx={{ textAlign: 'center' }}>
                                            Software Modelling,<br></br> Work Goal
                                        </Typography>
                                    </Item2>
                                </Grid>
                                <Grid item xs={1.5}>
                                    <Item2>
                                        <Typography variant="h6" sx={{ color: 'black', textAlign: 'center' }}>
                                            Date Given
                                        </Typography>
                                        <Typography alignItems='center' sx={{ alignItems:'center', textAlign: 'center' }}>
                                            10 July 2022
                                        </Typography>
                                    </Item2>
                                </Grid>
                                <Grid item xs={0.5}>
                                    <Item2 justifyContent='center' alignItems='center' sx={{ height: '100%'}}>
                                        <Box display="flex" justifyContent='center' alignItems='center' sx={{ height: '100%'}}>
                                            <IconButton aria-label="upload picture" component="span" justifyContent='center' alignItems='center' sx={{ marginLeft: '55px', width: '60px', height: '60px', backgroundColor: 'primary.dark', color: 'white', '&:hover': {backgroundColor: 'primary.main'},  }}>
                                                <ArrowForwardIosIcon />
                                            </IconButton>
                                        </Box>
                                    </Item2>
                                </Grid>
                            </Grid>
                        </Item2>
                    </Stack>
                </div>
            </body>
        </ThemeProvider>
    )
}

export default Comments