import logo from "../logo192.png";
import { useState, useContext, useEffect } from "react";
import { auth, db } from "../components/firebase";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Navigate, useNavigate } from 'react-router-dom';
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
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link, Redirect
  } from 'react-router-dom';

const MenteeCard = ({ menteeData }) => {
    let navigate = useNavigate()
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
    const [financialSize, setFinancialSize] = useState(0)
    const [workSize, setWorkSize] = useState(0)
    useEffect(() => {
        var dbRef = db.collection('users').doc(menteeData.id).collection("Goals").doc('Financial').collection('FinancialGoals')
        dbRef.get().then(snap => {
            setFinancialSize(snap.size) // will return the collection size
          });
        var dbRefWork = db.collection('users').doc(menteeData.id).collection("Goals").doc('Work').collection('WorkGoals')
        dbRefWork.get().then(snap => {
            setWorkSize(snap.size) // will return the collection size
          });

        console.log(workSize)
    }, [])
    return (
        <Grid item xs={3}>
            <Item sx={{ height: '100%', border: 1, borderColor: 'secondary.main', marginBottom :'20px' }}>
                <Box display="flex" justifyContent='center' alignItems='center' sx={{ marginTop: "10px" }}>
                    <Avatar src={menteeData.data.imageUrl} sx={{ width: "80px", height: "80px", bgcolor: deepPurple[500] }} />
                </Box>
                <Typography variant="h5" sx={{ marginTop: "20px", color: "black" }}>
                    {menteeData.data.displayName}
                </Typography>
                <Stack sx={{ marginTop: "20px" }} justifyContent='center' alignItems='baseline' direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
                    <Item2>
                        <Typography variant="h6">

                            {workSize} <br></br>Work
                        </Typography>
                    </Item2>
                    <Item2>
                        <Typography variant="h6">
                            {financialSize} <br></br> Financial
                        </Typography>
                    </Item2>
                </Stack>
                <Link to={`/menteeprofile/${menteeData.id}`} class="link">
                    <Button variant="outlined" sx={{ marginTop: '20px', marginBottom: '20px' }}>
                        View Profile
                    </Button>
                </Link>

            </Item>
        </Grid>
    );
}

export default MenteeCard;