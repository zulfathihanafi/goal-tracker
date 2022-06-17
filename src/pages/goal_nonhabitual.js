import React, { useState, useEffect, useContext } from "react"
import { UserContext } from '../userContext'
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
import { auth, db } from "../components/firebase";
import AddTaskIcon from '@mui/icons-material/AddTask';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import moment from 'moment';
import FormControl from '@mui/material/FormControl';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Nonhabitual = () => {
    let navigate = useNavigate();
    const { id, email } = useParams();
    const [pendingActivities, setPendingActivities] = useState([])
    const [finishedActivities, setFinishedActivities] = useState([])
    const [checked, setChecked] = useState(false)
    const [numbers, setNumber] = React.useState([])
    const [toRemove, setToRemove] = useState(0)

    const [buttonAble, setButtonAble] = useState(false);
    const [editable, setEditable] = useState(false)


    const [currentEdit, setCurrentEdit] = useState('')
    const [currentEditTask, setCurrentEditTask] = useState('')
    const [currentEditDue, setCurrentEditDue] = useState('')


    const [newTask, setNewTask] = useState({ task: '', due: '' })
    const [openNewTaskDialog, setOpenNewTaskDialog] = useState(false)

    // Data Details
    const [goalData, setGoalData] = useState()

    // Transactions
    const [tasks, setTasks] = useState([])
    useEffect(() => {
        // getting the tasks data
        var dbRefTrans = db.collection('users').doc(email).collection("Goals").doc('Work').collection('WorkGoals').doc(id).collection('tasks')
        dbRefTrans.onSnapshot(snapshot => {
            setTasks(snapshot.docs.map(doc => ({
                id: doc.id,
                task: doc.data(),
            })));
        })

        // getting the goal data
        var dbRef = db.collection('users').doc(email).collection("Goals").doc('Work').collection('WorkGoals').doc(id)
        dbRef.get().then((doc) => {
            var data = doc.data()
            console.log(data.title)
            setGoalData(data)
        })
        var currentPendingActivities = []
        var currentFinishedActivities = []
        if (tasks) {
            tasks.forEach(task => {
                if (task.task.status == 'pending') {
                    currentPendingActivities.push(task)
                } else {
                    currentFinishedActivities.push(task)
                }
            });
            setFinishedActivities(currentFinishedActivities)
            setPendingActivities(currentPendingActivities)
        }
        var currentPercentage = Math.round(finishedActivities.length / (finishedActivities.length + pendingActivities.length) * 100)
        if(finishedActivities.length == 0){
            currentPercentage = 0
        }
        db.collection('users').doc(user.email).collection("Goals").doc('Work').collection('WorkGoals').doc(id).update({
            percentage: currentPercentage
        })
        console.log(goalData)
    }, [goalData])




    function deleteGoal() {
        var dbRef = db.collection('users').doc(user.email).collection("Goals").doc('Work').collection('WorkGoals').doc(id)
        dbRef.delete()
        navigate('/workgoals')
    }
    // Also to check the function of the finished task button && store the number of index to be edited
    function addArray(target, index) {
        if (target.checked) {
            numbers.push(index)
            console.log(index)
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
    function saveCurrentEdit() {
        var dbRef = db.collection('users').doc(user.email).collection("Goals").doc('Work').collection('WorkGoals').doc(id).collection('tasks').doc(currentEdit)

        dbRef.update({
            task: currentEditTask,
            due: currentEditDue
        })


        //after finish editing
        setCurrentEdit('')
    }

    function deleteCurrentEdit() {
        var dbRef = db.collection('users').doc(user.email).collection("Goals").doc('Work').collection('WorkGoals').doc(id).collection('tasks').doc(currentEdit)
        dbRef.delete()
    }
    // to update in DB
    function addTaskDone(e) {
        var toRemoveVar = 0
        var dbRef = db.collection('users').doc(user.email).collection("Goals").doc('Work').collection('WorkGoals').doc(id).collection('tasks')

        numbers.forEach((taskID) => {
            dbRef.doc(taskID).update({
                status: 'finished'
            })
        })

        // to update the current percentage



        setNumber([])
        setButtonAble(false)
        setToRemove(toRemove + toRemoveVar)

    }
    function addNewTask() {
        var dbRef = db.collection('users').doc(user.email).collection("Goals").doc('Work').collection('WorkGoals').doc(id).collection('tasks').doc()
        dbRef.set({
            status : 'pending',
            due : newTask.due,
            task : newTask.task
        })
        setOpenNewTaskDialog(false)
        // pendingActivities.push(newTask) 
        setNewTask({task:'',due:''})

    }

    const addTaskDialog = (
        <Dialog open={openNewTaskDialog} onClose={e => { setOpenNewTaskDialog(false) }} fullWidth="xl">
            <DialogTitle style={{ fontSize: "30px" }}>Add New Task</DialogTitle>
            <FormControl>
                <DialogContent>
                    <DialogContentText style={{ fontWeight: 'bold' }}>
                        Task
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Goal Title"
                        type="title"
                        fullWidth
                        variant="standard"
                        onChange={e => { newTask.task = e.target.value }}
                    />
                    
                    <DialogContentText style={{ fontWeight: 'bold', marginTop: '15px', marginBottom: "10px" }}>
                        Goal Deadline
                    </DialogContentText>
                    <input
                        type="date" id="birthdaytime"
                        name="birthdaytime"
                        onChange={e => { newTask.due = moment(e.target.value).format("ll"); }}>
                    </input>
                </DialogContent>
            </FormControl>
            <DialogActions>
                <Button onClick={e => setOpenNewTaskDialog(false)}>Cancel</Button>
                <Button onClick={e => addNewTask()}>Add</Button>
            </DialogActions>
        </Dialog>
    )

    const theme = createTheme({
        typography: {
            fontFamily: [
                'Nunito',
                'sans-serif',
            ].join(','),
        },
    });
    const { user, setUser } = useContext(UserContext);
    return (


        goalData && tasks ?
            <ThemeProvider theme={theme}>
                <div className="pageLayout">
                    <Breadcrumbs aria-label="breadcrumb" sx={{ backgroundColor: 'white', marginTop: '20px' }}>
                        <Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} href="/home">
                            <HomeIcon sx={{ mr: 0.5 }} fontSize="large" />
                            Home
                        </Link>
                        <Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} href="/workgoals">
                            <TrackChangesIcon sx={{ mr: 0.5 }} fontSize="large" />
                            Work Goals
                        </Link>
                        <Link sx={{ display: 'flex', alignItems: 'center' }} color="text.primary">
                            <GppGoodIcon sx={{ mr: 0.5 }} fontSize="large" />
                            {goalData.title}
                        </Link>
                    </Breadcrumbs>
                    <div className="container">
                        <h1 className='boxtitle textheader' style={{ textAlign: 'left', fontSize: '50px', marginTop: '20px' }}>
                            {goalData.title}
                        </h1>
                        <br></br>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Item sx={{ height: '100%', border: 1, borderShadow: 0 }}>
                                    <div class="align-self-left" style={{ width: '100%', textAlign: 'center', marginTop: '10px' }}>
                                        <h1>Current Progress</h1>
                                    </div>
                                    <div class="progress" style={{ height: '32px', marginTop: '20px', marginBottom: '20px' }}>
                                        <div class="progress-bar bg-success" role="progressbar" 
                                                style={{ width: `${goalData.percentage}%` }} 
                                                aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
                                                {goalData.percentage}%
                                        </div>
                                    </div>
                                </Item>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}>
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
                                                    <th scope="col" class="col-4">Edit</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    pendingActivities.map((activity, index) => (
                                                        activity.id != currentEdit ? (
                                                            <tr>
                                                                <th scope="row">
                                                                    <input key={activity.id} type="checkbox" class="custom-control-input" onChange={e => addArray(e.target, activity.id)} />
                                                                </th>
                                                                <td>{activity.task.task}</td>
                                                                <td>{activity.task.due}</td>
                                                                <td><Button variant="contained" startIcon={<EditIcon />} sx={{ width: '10px' }} onClick={e => { setCurrentEdit(activity.id); setCurrentEditTask(activity.task.task); setCurrentEditDue(activity.task.due) }} />
                                                                </td>
                                                            </tr>) : (
                                                            <tr>
                                                                <th scope="row">
                                                                    <input key={index} type="checkbox" disabled class="custom-control-input" onChange={e => addArray(e.target, index)} />
                                                                </th>
                                                                <td>
                                                                    <Input defaultValue={activity.task.task} onChange={e => { setCurrentEditTask(e.target.value) }} />
                                                                </td>
                                                                <td><Input defaultValue={activity.task.due} onChange={e => { setCurrentEditDue(e.target.value) }} /></td>
                                                                <td>
                                                                    <td>
                                                                        <Button variant="contained" sx={{ width: '1' }} startIcon={<CheckCircleIcon />} color="success" onClick={e => { saveCurrentEdit() }} />
                                                                    </td>
                                                                    <td>
                                                                        <Button variant="contained" color="error" sx={{ width: '1' }} startIcon={<DeleteIcon />} onClick={e => { deleteCurrentEdit() }} />
                                                                    </td>


                                                                </td>
                                                            </tr>
                                                        )

                                                    ))
                                                }
                                                {/* {!editable ?

                                                    pendingActivities.map((activity, index) => (
                                                        <tr>
                                                            <th scope="row">
                                                                <input key={activity.id} type="checkbox" class="custom-control-input" onChange={e => addArray(e.target, activity.id)} />
                                                            </th>
                                                            <td>{activity.task.task}</td>
                                                            <td>{activity.task.due}</td>
                                                            <td><Button variant="contained" startIcon={<EditIcon />} onClick={e => { setEditable(!editable) }} />
                                                            </td>
                                                        </tr>
                                                    )) :

                                                    // this is the editable section
                                                    pendingActivities.map((activity, index) => (
                                                        <tr>
                                                            <th scope="row">
                                                                <input key={index} type="checkbox" disabled class="custom-control-input" onChange={e => addArray(e.target, index)} />
                                                            </th>
                                                            <td>
                                                                <Input defaultValue={activity.task.task} onChange={e => { activity.task = e.target.value }} />
                                                            </td>
                                                            <td><Input defaultValue={activity.task.due} onChange={e => { activity.due = e.target.value }} /></td>
                                                        </tr>

                                                    ))} */}



                                            </tbody>
                                        </table>


                                        {/* Task done button */}
                                        <Box display="flex" justifyContent='flex-end' alignItems='center' sx={{ marginTop: "10px" }}>
                                            <Button startIcon={<AddTaskIcon />} className="col-2" variant="contained" onClick={e => setOpenNewTaskDialog(true)} sx={{ marginTop: "10px", marginRight: "10px" }}>
                                                Add Task
                                            </Button>
                                            {addTaskDialog}
                                            <Button startIcon={<CheckCircleIcon />} color="success" className="col-2" variant="contained" disabled={!buttonAble} onClick={e => addTaskDone(e.target)} sx={{ marginTop: "10px" }}>
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
                                                        <td>{activity.task.task}</td>

                                                        <td>{activity.task.due}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>


                                        <Box display="flex" justifyContent='flex-end' alignItems='center' sx={{ marginTop: "10px" }}>
                                            <Button variant="contained" color="error" sx={{ marginLeft: '10px', marginTop: "10px" }} startIcon={<DeleteIcon />} onClick={e => { deleteGoal() }}>
                                                Delete Goal
                                            </Button>
                                        </Box>


                                    </div>
                                </Item>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </ThemeProvider> : undefined
    );
}

export default Nonhabitual;