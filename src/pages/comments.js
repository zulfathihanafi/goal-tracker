import { useState, useEffect, useContext } from "react";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { auth, db } from "../components/firebase";
import { UserContext } from '../userContext'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link, Redirect
  } from 'react-router-dom';
import Box from '@mui/material/Box';

import '../styles/homementor.css'

import Avatar from '@mui/material/Avatar';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';


const Comments = () => {

    const [comments, setComments] = useState([])
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        var dbRefComments = db.collection('users').doc(user.email).collection("Comments")
        dbRefComments.onSnapshot(snapshot => {
            setComments(snapshot.docs.map(doc => ({
                id: doc.id,
                comment: doc.data(),
            }
            )

            ));
        })
    }, [])

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
                    <Typography variant="h4" justifyContent="flex-start" alignItems="flex-start" sx={{ textAlign: 'left', marginBottom: '20px', marginTop: '20px' }}>
                        All Comments
                    </Typography>
                    <Stack container spacing={2}>
                        {comments.map((comment) => (
                            <Item2 sx={{ boxShadow: 2 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={2}>
                                        <Item2 sx={{ height: '100%' }}>
                                            <Box display="flex" justifyContent='center' alignItems='center' sx={{ marginTop: "10px" }}>
                                                <Avatar sx={{ width: "50px", height: "50px", backgroundColor: 'blue' }}>FI</Avatar>
                                            </Box>
                                            <Typography variant="h6" sx={{ color: 'black', marginTop: '10px' }}>
                                                {comment.comment.menteeName}
                                            </Typography>
                                        </Item2>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Item2>
                                            <Typography variant="h6" sx={{ color: 'black', textAlign: 'center' }}>
                                                Comment
                                            </Typography>
                                            <Typography alignItems='center' sx={{ textAlign: 'left' }}>
                                                {comment.comment.comment}
                                            </Typography>
                                        </Item2>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Item2>
                                            <Typography variant="h6" sx={{ color: 'black', textAlign: 'center' }}>
                                                Goal Detail
                                            </Typography>
                                            <Typography alignItems='center' sx={{ textAlign: 'center' }}>
                                                {comment.comment.title},<br></br> {comment.comment.goalType} Goal
                                            </Typography>
                                        </Item2>
                                    </Grid>
                                    <Grid item xs={1.5}>
                                        <Item2>
                                            <Typography variant="h6" sx={{ color: 'black', textAlign: 'center' }}>
                                                Date Given
                                            </Typography>
                                            <Typography alignItems='center' sx={{ alignItems: 'center', textAlign: 'center' }}>
                                                {comment.comment.date}
                                            </Typography>
                                        </Item2>
                                    </Grid>
                                    <Grid item xs={0.5}>
                                        <Item2 justifyContent='center' alignItems='center' sx={{ height: '100%' }}>
                                            <Box display="flex" justifyContent='center' alignItems='center' sx={{ height: '100%' }}>
                                                {comment.comment.goalType == "Work" ? (
                                                    <Link to={`/goal/${comment.comment.emailGoal}/${comment.comment.goalID}`} class="link">
                                                    <IconButton aria-label="upload picture" component="span" justifyContent='center' alignItems='center' sx={{ marginLeft: '55px', width: '60px', height: '60px', backgroundColor: 'primary.dark', color: 'white', '&:hover': { backgroundColor: 'primary.main' }, }}>
                                                        <ArrowForwardIosIcon />
                                                    </IconButton>
                                                </Link>
                                                ) : (
                                                    <Link to={`/goal3/${comment.comment.emailGoal}/${comment.comment.goalID}`} class="link">
                                                    <IconButton aria-label="upload picture" component="span" justifyContent='center' alignItems='center' sx={{ marginLeft: '55px', width: '60px', height: '60px', backgroundColor: 'primary.dark', color: 'white', '&:hover': { backgroundColor: 'primary.main' }, }}>
                                                        <ArrowForwardIosIcon />
                                                    </IconButton>
                                                </Link>
                                                )}
                                            </Box>
                                        </Item2>
                                    </Grid>
                                </Grid>
                            </Item2>

                        ))}
                    </Stack>
                </div>
            </body>
        </ThemeProvider>
    )
}

export default Comments