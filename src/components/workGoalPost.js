import { useState,useEffect,useContext } from "react";
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
import { UserContext } from '../userContext'
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

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const WorkGoalPost = ({goalData,id}) => {

    const { user, setUser } = useContext(UserContext);
    const [tasks, setTasks] = useState([])
    
    useEffect(() => {
        var dbRef = db.collection('users').doc(user.email).collection("Goals").doc('Work').collection('WorkGoals').doc(id).collection('tasks')
        dbRef.onSnapshot(snapshot => {
            setTasks(snapshot.docs.map(doc => ({
                id: doc.id,
                task: doc.data()
            })));
        })
        
    }, [id])

    return (
        <Link to={`/goal/${id}`} class="link">
                            <Grid container spacing={1} >
                                <Grid item xs={12} >
                                    <Item sx={{ height: '100%', boxShadow: '3' }} style={{ padding: '20px', backgroundColor: "white" }}>
                                        <div className="row">
                                            <div className="col-8">
                                                <Typography variant="h4" justifyContent="flex-start" style={{ textAlign: 'left', paddingLeft: '10px', marginTop: '5px', marginBottom: '5px', color: 'black' }}>{goalData.title}</Typography>
                                            </div>
                                            <div className="col-4">
                                                <Typography variant="h4" justifyContent="flex-start" style={{ textAlign: 'left', paddingLeft: '10px', marginTop: '5px', marginBottom: '5px', color: 'black' }}><CalendarMonthIcon fontSize="large" style={{ marginRight: '10px' }} />{goalData.dueDate}</Typography>
                                            </div>
                                        </div>
                                        <Divider style={{ marginBottom: '15px' }} />
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={4}>
                                                <Item sx={{ height: '100%', border: 1 }} style={{ backgroundColor: "#f7f6f6" }}>
                                                    <Typography variant="h6" style={{ color: "black", textAlign: "left", paddingLeft: '10px' }}>Overall Status</Typography>
                                                    <Box sx={{ position: 'relative', display: 'inline-flex' }} style={{ marginTop: '30px' }}>
                                                        <CircularProgress style={{ 'position': 'absolute', 'color': '#d9d9d9' }} variant="determinate" size={100} thickness={7} value={100} />
                                                        <CircularProgress style={{ 'color': 'blue' }} variant="determinate" size={100} thickness={7} value={goalData.percentage} />
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
                                                                {`${Math.round(goalData.percentage)}%`}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                    <Typography>{goalData.percentage}% Completed</Typography>
                                                </Item>
                                            </Grid>
                                            <Grid item xs={12} md={8}>
                                                <Item sx={{ height: '100%', border: 1 }} style={{ backgroundColor: "#f7f6f6" }}>
                                                    <Typography variant="h6" style={{ color: "black", textAlign: "left", paddingLeft: '10px', marginRight: '20px' }}>To-do List <AddTaskIcon /></Typography>
                                                    <div style={{ margin: '5px 50px' }}>
                                                        <table class="table">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col" class="col-1">#</th>
                                                                    <th scope="col" class="col-8">Task</th>
                                                                    <th scope="col" class="col-3">Due Date</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {tasks.map((activity, index) => (
                                                                    activity.task.status == "pending" ? (
                                                                        <tr>
                                                                        <th scope="row">
                                                                            {index + 1}
                                                                        </th>
                                                                        <td>{activity.task.task}</td>
                                                                        <td>{activity.task.due}</td>
                                                                    </tr>
                                                                    ): undefined
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </Item>

                                            </Grid>
                                            {/* <Grid item xs={12} md={12}>
                                            <Item sx={{ height: '100%' }}>
                                                <h6 variant="h6" style={{ color: "black", textAlign: "left", paddingLeft: '10px' }}>Description</h6>
                                                <p sx={{ textAlign: 'left', pl: '10px' }}>
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                                                    blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
                                                    neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
                                                    quasi quidem quibusdam.
                                                </p>
                                            </Item>
                                        </Grid> */}
                                        </Grid>
                                    </Item>

                                </Grid>

                                <Divider variant="middle" style={{ margin: "30px" }} />
                            </Grid>
                        </Link>
    );
}

export default WorkGoalPost;