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
import { Link } from 'react-router-dom';
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
    const [currentWork, setCurrentWork] = useState(0)
    const [currentFinancial, setCurrentFinancial] = useState(0)
    const [numberComment, setNumberComment] = useState(0)
    const [numberReadComment, setNumberReadComment] = useState(0)
    useEffect(() => {
        console.log("Home context " + user.email)


        db.collection("users").doc(user.email).get().then((doc) => {
            var data = doc.data()
            setUserRole(data.role)
        })

        var dbRef = db.collection('users').where("role", "==", "Mentee")
        dbRef.onSnapshot(snapshot => {
            setMentees(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),

            })));
        })

        var dbRefComment = db.collection('users').doc(user.email).collection("Comments")
        dbRefComment.get().then(snap => {
            setNumberComment(snap.size) // will return the collection size
        });

        var dbRefReadComment = db.collection('users').doc(user.email).collection("Comments").where("status", "==", "read")
        dbRefReadComment.get().then(snap => {
            setNumberReadComment(snap.size) // will return the collection size
        });


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
                            Welcome back, {user.displayName}!
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
                                                {mentees.length}<br></br>Active Mentee
                                            </Typography>
                                        </Item2>
                                    </Stack>
                                    <Box display="flex" justifyContent='flex-end' alignItems='center' sx={{ marginTop: "10px", marginRight: '20px', marginBottom: '10px' }}>
                                        <br />
                                    </Box>
                                </Item>
                            </Grid>
                            <Grid item xs={6}>
                                <Item sx={{ height: '100%' }}>
                                    <Typography variant="h4" sx={{ marginTop: "20px", marginBottom: "30px" }}>
                                        Overview
                                        <ForumIcon fontSize="large" sx={{ width: 40, height: 40, marginLeft: '20px' }} />
                                    </Typography>
                                    <Grid container spacing="1">
                                        <Grid item2 xs={6}>
                                            <Item2 justifyContent="flex-start" alignItems="flex-start">
                                                <DriveFileRenameOutlineIcon color="primary" fontSize="large" sx={{ width: 70, height: 70, marginBottom: '20px', marginRight: '20px' }} />
                                                <Typography variant="h5">
                                                    {numberComment} Comments Given
                                                </Typography>
                                            </Item2>
                                        </Grid>
                                        <Grid item2 xs={6}>
                                            <Item2>
                                                <CheckCircleIcon color="success" fontSize="large" sx={{ width: 70, height: 70, marginBottom: '20px', marginRight: '20px' }} />
                                                <Typography variant="h5">
                                                    {numberReadComment} Comments Read
                                                </Typography>
                                            </Item2>
                                        </Grid>
                                        <Box display="flex" justifyContent='flex-end' alignItems='center' sx={{ marginTop: "10px", marginRight: '20px', marginBottom: '10px', width: '100%' }}>
                                            <Link to={`/comments`} class="link">
                                                <Button color="primary" variant="contained" >
                                                    Check All Comments
                                                </Button>
                                            </Link>
                                        </Box>
                                    </Grid>
                                </Item>
                            </Grid>
                        </Grid>
                        <Typography variant="h4" sx={{ marginTop: "80px", marginBottom: "30px" }}>
                            Mentee List
                            <PeopleIcon fontSize="large" sx={{ width: 40, height: 40, marginLeft: '20px', marginBottom: '10px' }} />
                        </Typography>

                        <Grid container spacing={2}>
                            {mentees.map((mentee, index) => (
                                <MenteeCard menteeData={mentee} />

                            ))}

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