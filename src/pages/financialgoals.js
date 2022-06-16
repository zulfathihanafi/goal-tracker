import { auth, db } from "../components/firebase";
import { UserContext } from '../userContext'

import { useState, useContext, useEffect } from "react";
import * as React from 'react';
import { styled } from '@mui/material/styles';

import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper';

import CircularProgress from '@mui/material/CircularProgress';

import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
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

import { Navigate, useNavigate } from 'react-router-dom'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import FinancialGoalPost from "../components/financialGoalPost";




const theme = createTheme({
    typography: {
        fontFamily: [
            'Nunito',
            'sans-serif',
        ].join(','),
    },
});

const Financialgoals = () => {

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
    const [openWork, setOpenWork] = React.useState(false);
    const [workDrop, setWorkDrop] = React.useState(true)
    const [financialDrop, setFinancialDrop] = React.useState(true)
    const [newTask, setNewTask] = React.useState([])

    const [enableEdit, setEdit] = React.useState(true)
    const [financialGoals, setFinancialGoals] = useState([]);
    


    const { user, setUser } = useContext(UserContext);

    const [userData, setUserData] = useState({})
    const [userRole, setUserRole] = useState('')
    useEffect(() => {
        //where the code runs, cond after the comma
        var dbRef = db.collection('users').doc(user.email).collection("Goals").doc('Financial').collection('FinancialGoals')
        dbRef.onSnapshot(snapshot => {
            setFinancialGoals(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data(),
                
            })));
        })
        console.log(financialGoals)
        //onSnapshot, powerful listener
    }, [])

    let navigate = useNavigate()
    function addTasks() {

    }

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

    return (
        <ThemeProvider theme={theme}>
            <body class="homeBody">
                <div class="container home">
                    <Button variant="contained" color="primary" size="large" Click={e => { setOpenWork(true) }} style={{ marginTop: '30px', marginBottom: "20px" }}>
                        Add Work
                    </Button>
                    <Dialog open={openFinance} onClose={e => { setOpenFinance(false) }} fullWidth="xl">
                        <DialogTitle style={{ fontSize: "30px" }}>Add New Finance Goal</DialogTitle>
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
                                    onChange={e => { newFinanceGoal.title = e.target.value }}
                                />
                                <DialogContentText style={{ fontWeight: 'bold' }}>
                                    Target
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="title"
                                    label="Goal Target"
                                    type="title"
                                    fullWidth
                                    variant="standard"
                                    onChange={e => { newFinanceGoal.target = Number(e.target.value) }}
                                />
                                <DialogContentText style={{ fontWeight: 'bold', marginTop: '15px', marginBottom: "10px" }}>
                                    Goal Deadline
                                </DialogContentText>
                                <input
                                    type="date" id="birthdaytime"
                                    name="birthdaytime"
                                    onChange={e => { newFinanceGoal.dueDate = e.target.value }}></input>
                            </DialogContent>
                        </FormControl>
                        <DialogActions>
                            <Button onClick={e => setOpenFinance(false)}>Cancel</Button>
                            <Button onClick={e => addFinanceGoal()}>Add</Button>

                        </DialogActions>
                    </Dialog>
                    {financialGoals.map((goal, index) => (
                        <FinancialGoalPost
                            goalData = {goal.post}
                            id = {goal.id}
                        
                        />))}
                </div>
            </body>
        </ThemeProvider>
    )
}

export default Financialgoals;