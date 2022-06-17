import { useState, useContext, useEffect } from "react";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

import Divider from '@mui/material/Divider';

import { Link } from 'react-router-dom';
import '../styles/home.css'
import { work, financial } from "../data/goals";
import AddTaskIcon from '@mui/icons-material/AddTask';

import { Navigate, useNavigate } from 'react-router-dom'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { mentee } from "../data/user";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { auth, db } from "../components/firebase";
import { UserContext } from '../userContext'
import WorkGoalPost from "../components/workGoalPost";
import moment from 'moment';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const theme = createTheme({
    typography: {
        fontFamily: [
            'Nunito',
            'sans-serif',
        ].join(','),
    },
});

const WorkGoals = () => {

    useEffect(() => {
        //where the code runs, cond after the comma
        var dbRef = db.collection('users').doc(user.email).collection("Goals").doc('Work').collection('WorkGoals')
        dbRef.onSnapshot(snapshot => {
            setWorkGoals(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data(),
                
            })));
        })
        console.log(workGoals)
        //onSnapshot, powerful listener
    }, [])

    const { user, setUser } = useContext(UserContext);
    const [newWorkGoal, setNewWorkGoal] = React.useState({
        title: "",
        percentage: 0,
        dueDate: ''
    })

    const [openWork, setOpenWork] = React.useState(false);
    

    const [workGoals, setWorkGoals] = useState([]);
    let navigate = useNavigate()


    const addGoalDialog = (
        <Dialog open={openWork} onClose={e => { setOpenWork(false) }} fullWidth="xl">
                        <DialogTitle style={{ fontSize: "30px" }}>Add New Work Goal</DialogTitle>
                        <FormControl>
                            <DialogContent>
                                <DialogContentText style={{ fontWeight: 'bold' }}>
                                    Title
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="title"
                                    label="Goal Title"
                                    type="title"
                                    fullWidth
                                    variant="standard"
                                    onChange={e => { newWorkGoal.title = e.target.value }}
                                />

                                <DialogContentText style={{ fontWeight: 'bold', marginTop: '5px', marginBottom: "10px" }}>
                                    Goal Deadline
                                </DialogContentText>
                                <input
                                    type="date"
                                    id="birthdaytime"
                                    name="birthdaytime"
                                    onChange={e => { newWorkGoal.dueDate = moment(e.target.value).format("ll"); }}>

                                </input>

                            </DialogContent>
                        </FormControl>
                        <DialogActions>
                            <Button onClick={e => setOpenWork(false)}>Cancel</Button>
                            <Button onClick={e => addWorkGoal()}>Add</Button>
                        </DialogActions>
                    </Dialog>
    )
    function addTasks() {

    }

    function addWorkGoal() {


        var dbRef = db.collection('users').doc(user.email).collection("Goals").doc('Work').collection('WorkGoals')
        
        dbRef.doc().set({
            title : newWorkGoal.title,
            percentage : 0,
            dueDate : newWorkGoal.dueDate,  
        })

        setNewWorkGoal({
            title: "",
            percentage: 0,
            dueDate: '',
        })

        setOpenWork(false)
    }

    return (
        <ThemeProvider theme={theme}>
            <body class="homeBody">
                <div class="container home">
                    <Button variant="contained" size="large" onClick={e => { setOpenWork(true) }} style={{ marginTop: '30px', marginBottom: "20px" }}>
                        Add Work
                    </Button>
                    
                {addGoalDialog}
                    {workGoals.map((goal, index) => (
                        <WorkGoalPost 
                        goalData ={goal.post} 
                        id={goal.id}
                        email={user.email}/>
                    )) }
                    <div>

                    </div>
                </div>
            </body>
        </ThemeProvider>
    )
}

export default WorkGoals;