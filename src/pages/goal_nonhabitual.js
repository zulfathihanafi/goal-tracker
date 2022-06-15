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

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Nonhabitual = ({ work }) => {
    let navigate = useNavigate();
    const { id } = useParams();
    const [pendingActivities, setPendingActivities] = useState(work[id].pendingTasks)
    const [finishedActivities, setFinishedActivities] = useState(work[id].finishedTasks)
    const [checked, setChecked] = useState(false)
    const [numbers, setNumber] = React.useState([])
    const [toRemove, setToRemove] = useState(0)
    const [buttonAble, setButtonAble] = useState(false);
    const [editable, setEditable] = useState(false)
    const [newTask, setNewTask] = useState({task:'',due:''})
    function deleteGoal() {
        let currentWork = work
        delete currentWork[id]
        work = currentWork
        navigate('/home')
    }
    function addArray(target, index) {
        if (target.checked) {
            numbers.push(index)
        } else {
            delete numbers[index]
            numbers.sort()
            numbers.pop()
        }

        if (numbers.length > 0) {
            setButtonAble(true)
        } else {
            setButtonAble(false)
        }
        console.log(numbers)
    }
    function addTask(e) {
        let toRemoveVar = 0
        let currentPending = pendingActivities
        numbers.forEach(number => {
            finishedActivities.push(currentPending[number])
            delete currentPending[number]
            toRemoveVar += 1
            work[id].percentage = (finishedActivities.length / (finishedActivities.length + pendingActivities.length - toRemoveVar)) * 100
        })
        setPendingActivities(currentPending)
        setNumber([])
        setButtonAble(false)
        setToRemove(toRemove + toRemoveVar)

    }
    function addNewTask(){
         
        pendingActivities.push(newTask) 
        setNewTask({task:'',due:''})
    }

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
                        <TrackChangesIcon sx={{ mr: 0.5 }} fontSize="large" />
                        Work Goals
                    </Link>
                    <Link sx={{ display: 'flex', alignItems: 'center' }} color="text.primary">
                        <GppGoodIcon sx={{ mr: 0.5 }} fontSize="large" />
                        {work[id].title}
                    </Link>
                </Breadcrumbs>
                <div className="container">
                    <h1 className='boxtitle textheader' style={{ textAlign: 'left', fontSize: '50px', marginTop: '20px' }}>
                        {work[id].title}
                    </h1>
                    <br></br>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Item sx={{ height: '100%', border: 1, borderShadow: 0 }}>
                                <div class="align-self-left" style={{ width: '100%', textAlign: 'center', marginTop: '10px' }}>
                                    <h1>Current Progress</h1>
                                </div>
                                <div class="progress" style={{ height: '32px', marginTop: '20px', marginBottom: '20px' }}>
                                    <div class="progress-bar bg-success" role="progressbar" style={{ width: `${(0+finishedActivities.length / ( 0+finishedActivities.length + pendingActivities.length - toRemove) * 100)}%` }} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">{0 + (finishedActivities.length / (finishedActivities.length + pendingActivities.length - toRemove) * 100)}%</div>
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
                                            {!editable ? pendingActivities.map((activity, index) => (
                                                <tr>
                                                    <th scope="row">
                                                        <input key={index} type="checkbox" class="custom-control-input" onChange={e => addArray(e.target, index)} />
                                                    </th>
                                                    <td>{activity.task}</td>
                                                    <td>{activity.due}</td>
                                                </tr>
                                            )) : pendingActivities.map((activity, index) => (
                                                <tr>
                                                    <th scope="row">
                                                        <input key={index} type="checkbox" class="custom-control-input" onChange={e => addArray(e.target, index)} />
                                                    </th>
                                                    <td>
                                                    <Input defaultValue={activity.task} onChange={e=>{activity.task = e.target.value}} />
                                                </td>
                                                    <td><Input defaultValue={activity.due} onChange={e=>{activity.due = e.target.value}} /></td>
                                                </tr>
                                                
                                            ))}
                                            {!editable? <div></div>:<tr>
                                                    <th scope="row">
                                                    <input type="button" value="Add Task" onClick={e => addNewTask()} /> 
                                                    </th>
                                                    <td>
                                                    <Input defaultValue="" onChange={e=> newTask.task = e.target.value} />
                                                </td>
                                                    <td><Input defaultValue="" onChange={e=> newTask.due = e.target.value} /></td>
                                                </tr>}
                                        </tbody>
                                    </table>
                                    
                                    <Box display="flex" justifyContent='flex-end' alignItems='center' sx={{ marginTop: "10px" }}>
                                        <Button startIcon={<CheckCircleIcon />} color="success" className="col-2" variant="contained" disabled={!buttonAble} onClick={e => addTask(e.target)} sx={{ marginTop: "10px" }}>
                                            Task Done
                                        </Button>
                                    </Box>

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
                                            {finishedActivities.map((activity) => (
                                                <tr>
                                                    <th scope="row">
                                                        <input type="checkbox" class="custom-control-input" id="customCheck3" checked />
                                                    </th>
                                                    <td>{activity.task}</td>

                                                    <td>{activity.due}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {editable ? <input type="button" value="Save Goal" onClick={e => { setEditable(!editable) }} /> : <div></div>}
                                    
                                    <Box display="flex" justifyContent='flex-end' alignItems='center' sx={{ marginTop: "10px" }}>
                                        <Button variant="contained" startIcon={<EditIcon />} onClick={e => { setEditable(!editable) }} sx={{ marginTop: "10px" }}>
                                            Edit
                                        </Button>
                                        <Button variant="contained" color="error" sx={{ marginLeft: '10px', marginTop: "10px" }} startIcon={<DeleteIcon />} onClick={e => { deleteGoal() }}>
                                            Delete
                                        </Button>
                                    </Box>

                                    
                                </div>
                            </Item>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default Nonhabitual;