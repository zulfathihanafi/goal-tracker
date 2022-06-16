import logo from "../logo192.png";
import { useState, useContext, useEffect } from "react";
import { auth, db } from "../components/firebase";
import * as React from 'react';
import { styled } from '@mui/material/styles';

import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper';

import CircularProgress from '@mui/material/CircularProgress';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import '../styles/homementor.css'

import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import FaceIcon from '@mui/icons-material/Face';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ForumIcon from '@mui/icons-material/Forum';
import PeopleIcon from '@mui/icons-material/People';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { UserContext } from '../userContext'
import MenteeCard from "../components/menteeCard";

const HomeMentor = () => {
    const { user, setUser } = useContext(UserContext);
    const [userRole, setUserRole] = useState('')
    const [mentees, setMentees] = useState([]);
    useEffect(() => {
        console.log("Home context " + user.email)
        

        db.collection("users").doc(user.email).get().then((doc) => {
            var data = doc.data()
            setUserRole(data.role)
        })

        var dbRef = db.collection('users').where("role","==","Mentee")
        dbRef.onSnapshot(snapshot => {
            setMentees(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
                
            })));
        })


    }, [user]);

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


    if (userRole == "Mentor") {
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
                        {mentees.map((mentee, index) => (
                        <MenteeCard menteeData = {mentee}/>
                        
                    )) }
                            
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