import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import '../styles/nonhabitual.css'
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import { Navigate, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import Typography from '@mui/material/Typography';
import GppGoodIcon from '@mui/icons-material/GppGood';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FaceIcon from '@mui/icons-material/Face';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

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
    textAlign: 'left',
    color: theme.palette.text.secondary,
    boxShadow: 'none',
}));

const MenteeNonhabitual = () => {
    
    const theme = createTheme({
        typography: {
            fontFamily: [
                'Nunito', 
                'sans-serif',
            ].join(','),
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <div className="pageLayout">
                <Breadcrumbs aria-label="breadcrumb" sx={{ backgroundColor: 'white', marginTop: '20px' }}>
                    <Link underline="hover" sx={{ display: 'flex', alignItems: 'center'}} href="/home">
                        <HomeIcon sx={{ mr: 0.5 }} fontSize="large" />
                        Home
                    </Link>
                    <Link underline="hover" sx={{ display: 'flex', alignItems: 'center'}} href="/workgoals">
                        <FaceIcon sx={{ mr: 0.5 }} fontSize="large" />
                        Fatehi Imran
                    </Link>
                    <Link sx={{ display: 'flex', alignItems: 'center' }} color="text.primary">
                        <GppGoodIcon sx={{ mr: 0.5 }} fontSize="large" />
                        Web Programming
                    </Link>
                </Breadcrumbs>
                <div className="container">
                    <h1 className='boxtitle textheader' style={{ textAlign: 'left', fontSize: '50px', marginTop: '20px' }}>
                        Web Programming
                    </h1>
                    <br></br>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Item sx={{ height: '100%', border: 1, borderColor: 'secondary.main', borderShadow: 0 }}>
                                <div class="align-self-left" style={{ width: '100%', textAlign: 'center', marginTop: '10px' }}>
                                    <h1>Current Progress</h1>
                                </div>
                                <div class="progress" style={{ height: '32px', marginTop: '20px', marginBottom: '20px' }}>
                                    <div class="progress-bar bg-success" role="progressbar" style={{ width: 650 }}>50%</div>
                                </div>
                            </Item>
                        </Grid>
                    </Grid>
                    <Grid container spacing = {1}>
                        <Grid item xs={12}>
                            <Item sx={{ marginTop: '30px', height: '100%', border: 1, borderColor: 'secondary.main', borderShadow: 0 }}>
                                <div className='boxactivity'>
                                    <div className="row">

                                        <div className="col align-content-end">
                                            <h1>Pending Activities</h1>
                                        </div>

                                    </div>

                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col" class="col-2">#</th>
                                                <th scope="col" class="col-6">Goal</th>
                                                <th scope="col" class="col-4">Due Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                           
                                                <tr>
                                                    <th scope="row">
                                                        1
                                                    </th>
                                                    <td>Figma design</td>
                                                    <td>20 Jun 2022</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">
                                                        2
                                                    </th>
                                                    <td>
                                                        Start coding
                                                    </td>
                                                    <td>20 Jun 2022</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">
                                                        3
                                                    </th>
                                                    <td>
                                                        Presentation
                                                    </td>
                                                    <td>18 July 2022</td>
                                                    </tr>
                                        </tbody>
                                    </table>

                                    <h1 style={{ marginTop: '40px' }}>Finished Activities</h1>
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col" class="col-2">#</th>
                                                <th scope="col" class="col-6">Goal</th>
                                                <th scope="col" class="col-4">Due Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            
                                            <tr>
                                                <th scope="row">
                                                    1
                                                </th>
                                                <td>Task delegation</td>
                                                <td>20 April 2022</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">
                                                    2
                                                </th>
                                                <td>User research</td>
                                                <td>30 June 2022</td>
                                            </tr>
                                            
                                        </tbody>
                                    </table>
                                </div>
                            </Item>
                        </Grid>
                    </Grid>
                    <Grid container spacing = {1} sx={{ marginTop: '80px' }}>
                        <Grid item xs = {12}>
                            <Item2>
                                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                    Leave your comment here:
                                </Typography>
                                <TextField id="outlined-textarea" label="Comment" multiline sx={{ marginTop: '20px', width: '100%' }} />
                                <Box display="flex" justifyContent='flex-end' alignItems='center' sx={{ marginTop: "10px" }}>
                                    <Button startIcon={<CheckCircleIcon />} color="success" size="large" variant="contained" sx={{ marginTop: "10px" }}>
                                        Submit
                                    </Button>
                                </Box>
                            </Item2>
                        </Grid>
                    </Grid>
                    <Grid container spacing = {1} sx={{ marginTop: '80px' }}>
                        <Grid item xs = {12}>
                            <Item2>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '30px' }}>
                                    Previous comment
                                </Typography>
                                <Stack container spacing={2}>
                                    <Item2 sx={{ boxShadow: 2 }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={9}>
                                                <Item2>
                                                    <Typography variant="h5" sx={{ color: 'black', textAlign: 'center', marginBottom: '20px' }}>
                                                        Comment
                                                    </Typography>
                                                    <Typography variant="h6" alignItems='center' sx={{ textAlign: 'left' }}>
                                                        The progress of the goal is very good. All the tasks were done before the deadline. Other than that, please make sure that your last 3 tasks are finished before the deadline because it is very crucial for you to reach the final objective.
                                                    </Typography>
                                                </Item2>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Item2>
                                                    <Typography variant="h5" sx={{ color: 'black', textAlign: 'center', marginBottom: '20px' }}>
                                                        Date Given
                                                    </Typography>
                                                    <Typography variant="h6" alignItems='center' sx={{ alignItems:'center', textAlign: 'center' }}>
                                                        10 July 2022
                                                    </Typography>
                                                </Item2>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Item2 justifyContent='center' alignItems='center' sx={{ height: '100%'}}>
                                                    <Box display="flex" justifyContent='center' alignItems='center' sx={{ height: '100%'}}>
                                                        <CheckCircleOutlineIcon color="primary" sx={{ width: '40px', height: '40px' }}/>
                                                    </Box>
                                                </Item2>
                                            </Grid>
                                        </Grid>
                                    </Item2>
                                    <Item2 sx={{ boxShadow: 2 }}>
                                        <Grid container spacing={2}>
                                        <Grid item xs={9}>
                                                <Item2>
                                                    <Typography variant="h5" sx={{ color: 'black', textAlign: 'center', marginBottom: '20px' }}>
                                                        Comment
                                                    </Typography>
                                                    <Typography variant="h6" alignItems='center' sx={{ textAlign: 'left' }}>
                                                        The progress of the goal is very good. All the tasks were done before the deadline. Other than that, please make sure that your last 3 tasks are finished before the deadline because it is very crucial for you to reach the final objective.
                                                    </Typography>
                                                </Item2>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Item2>
                                                    <Typography variant="h5" sx={{ color: 'black', textAlign: 'center', marginBottom: '20px' }}>
                                                        Date Given
                                                    </Typography>
                                                    <Typography variant="h6" alignItems='center' sx={{ alignItems:'center', textAlign: 'center' }}>
                                                        10 July 2022
                                                    </Typography>
                                                </Item2>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Item2 justifyContent='center' alignItems='center' sx={{ height: '100%'}}>
                                                    <Box display="flex" justifyContent='center' alignItems='center' sx={{ height: '100%'}}>
                                                        <CheckCircleOutlineIcon sx={{ width: '40px', height: '40px' }}/>
                                                    </Box>
                                                </Item2>
                                            </Grid>
                                        </Grid>
                                    </Item2>
                                    <Item2 sx={{ boxShadow: 2 }}>
                                        <Grid container spacing={2}>
                                        <Grid item xs={9}>
                                                <Item2>
                                                    <Typography variant="h5" sx={{ color: 'black', textAlign: 'center', marginBottom: '20px' }}>
                                                        Comment
                                                    </Typography>
                                                    <Typography variant="h6" alignItems='center' sx={{ textAlign: 'left' }}>
                                                        The progress of the goal is very good. All the tasks were done before the deadline. Other than that, please make sure that your last 3 tasks are finished before the deadline because it is very crucial for you to reach the final objective.
                                                    </Typography>
                                                </Item2>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Item2>
                                                    <Typography variant="h5" sx={{ color: 'black', textAlign: 'center', marginBottom: '20px' }}>
                                                        Date Given
                                                    </Typography>
                                                    <Typography variant="h6" alignItems='center' sx={{ alignItems:'center', textAlign: 'center' }}>
                                                        10 July 2022
                                                    </Typography>
                                                </Item2>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Item2 justifyContent='center' alignItems='center' sx={{ height: '100%'}}>
                                                    <Box display="flex" justifyContent='center' alignItems='center' sx={{ height: '100%'}}>
                                                        <CheckCircleOutlineIcon sx={{ width: '40px', height: '40px' }}/>
                                                    </Box>
                                                </Item2>
                                            </Grid>
                                        </Grid>
                                    </Item2>
                                </Stack>
                            </Item2>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default MenteeNonhabitual;