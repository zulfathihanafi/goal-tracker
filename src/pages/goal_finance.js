import React, { useState, useEffect, useContext } from "react"
import NotificationsIcon from '@mui/icons-material/Notifications';
import { UserContext } from '../userContext'
import emailjs from '@emailjs/browser';
import bootstrap from 'bootstrap'
import '../styles/nonhabitual.css'
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { auth, db } from "../components/firebase";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { pink } from '@mui/material/colors';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import moment from 'moment';
import { useParams } from "react-router";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Input from '@mui/material/Input';
import { Navigate, useNavigate } from 'react-router-dom'
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import Typography from '@mui/material/Typography';
import GppGoodIcon from '@mui/icons-material/GppGood';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Stack from '@mui/material/Stack';
import WarningIcon from '@mui/icons-material/Warning';
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

const Finance = () => {
    const { id, email } = useParams();

    const [newTransaction, setNewTransaction] = useState({
        details: '',
        amount: 0,
        type: 'Credit',
        date: moment().format('ll')

    })
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [buttonAble, setButtonAble] = useState(false);
    const [targetMoney, setTargetMoney] = useState(1)
    const [currentMoney, setCurrentMoney] = useState(0)
    const [percentage, setPercentage] = useState()
    const [editable, setEditable] = useState(false)

    // Data Details
    const [goalData, setGoalData] = useState()

    // Transactions
    const [transactions, setTransactions] = useState([])
    let navigate = useNavigate();

    const [deleteDialog, setDeleteDialog] = useState(false)
    //edit purposes
    const [currentEdit, setCurrentEdit] = useState('')
    const [currentEditDetails, setCurrentEditDetails] = useState('')
    const [currentEditAmount, setCurrentEditAmount] = useState('')
    const [currentEditType, setCurrentEditType] = useState('')
    const [currentEditDate, setCurrentEditDate] = useState('')

    // for commenting purposes
    const [newComment, setNewComment] = useState('')
    const [comments, setComments] = useState([])
    const [menteeName, setMenteeName] = useState('')

    // reminder
    const [reminderDialog, setReminderDialog] = useState(false)
    const [reminder, setReminder] = useState('')
    const [reminderDate, setReminderDate] = useState('')
    const [reminderTime, setReminderTime] = useState('')

    function saveCurrentEdit() {
        var dbRef = db.collection('users').doc(email).collection("Goals").doc('Financial').collection('FinancialGoals').doc(id).collection('transactions').doc(currentEdit)
        dbRef.update({
            amount: Number(currentEditAmount),
            date: currentEditDate,
            details: currentEditDetails,
            type: currentEditType
        })

        setCurrentEdit('')
        setCurrentEditAmount('')
        setCurrentEditDate('')
        setCurrentEditDetails('')
        setCurrentEditType('')
    }

    function deleteCurrentEdit() {
        var dbRef = db.collection('users').doc(email).collection("Goals").doc('Financial').collection('FinancialGoals').doc(id).collection('transactions').doc(currentEdit)
        dbRef.delete()

        setCurrentEdit('')
        setCurrentEditAmount('')
        setCurrentEditDate('')
        setCurrentEditDetails('')
        setCurrentEditType('')
    }

    function deleteGoal() {
        var dbRef = db.collection('users').doc(email).collection("Goals").doc('Financial').collection('FinancialGoals').doc(id)
        dbRef.delete()

        // to delete comments
        // var dbRefComment = db.collection('users').doc(email).collection("Comments").where("goalID","==",id)
        // console.log("Delete comment id "+id)
        // dbRefComment.get().then((snap)=>{
        //     snap.forEach((doc)=>{
        //         doc.ref.delete()
        //     })
        // })
        
        navigate('/financialgoals')
    }


    const { user, setUser, userRole } = useContext(UserContext);



    useEffect(() => {
        readData()

    }, [updateData()])

    useEffect(() => {
        updateData()
        var dbRefComments = db.collection('users').doc(email).collection("Goals").doc('Financial').collection('FinancialGoals').doc(id).collection('comments').orderBy("timestamp", "desc")
        dbRefComments.onSnapshot(snapshot => {
            setComments(snapshot.docs.map(doc => ({
                id: doc.id,
                comment: doc.data(),
            }
            )

            ));
        })
        var dbRefNoti = db.collection('users').doc(email).collection("Goals").doc('Financial').collection('FinancialGoals').doc(id).collection('Reminder').doc(email)
        dbRefNoti.get().then((doc) => {
            var data = doc.data()
            setReminder(moment(data.timestampDue).format('lll'))
        })
        if (user.email == email) { // if the email of the current User (mentee) equal to mentee email (from url)
            comments.forEach(comment => {

                var ref = db.collection('users').doc(comment.comment.mentorEmail).collection("Comments").doc(comment.id)
                ref.update({
                    status: 'read'
                })

            });
        }
    }, [transactions])

    function readData() {
        var dbRefTrans = db.collection('users').doc(email).collection("Goals").doc('Financial').collection('FinancialGoals').doc(id).collection('transactions')
        dbRefTrans.onSnapshot(snapshot => {
            setTransactions(snapshot.docs.map(doc => ({
                id: doc.id,
                transaction: doc.data(),
            })));
        })

        // getting the goal data
        var dbRef = db.collection('users').doc(email).collection("Goals").doc('Financial').collection('FinancialGoals').doc(id)
        dbRef.get().then((doc) => {
            var data = doc.data()
            console.log(data.Title)
            setGoalData(data)
        })
        console.log(goalData)
    }


    function updateData() { //incase ada perubahan
        var current = 0
        console.log('updating data')

        if (goalData) {
            transactions.forEach(transaction => {
                if (transaction.transaction.type == 'Debit') {
                    current -= transaction.transaction.amount
                } else {
                    current += transaction.transaction.amount
                }
            });

            var currentPercentage = Math.round((current / goalData.target) * 100)
            if (currentPercentage > 100) {
                currentPercentage = 100
            }

            var dbRef = db.collection('users').doc(email).collection("Goals").doc('Financial').collection('FinancialGoals').doc(id)
            dbRef.update({
                currentPercentage: currentPercentage,
                current: current
            })

            goalData.current = current
            goalData.currentPercentage = currentPercentage

        }

    }

    function addComment() {
        console.log("Email : " + email)
        var dbRef = db.collection('users').doc(email).collection("Goals").doc('Financial').collection('FinancialGoals').doc(id).collection('comments').doc()
        dbRef.set({
            comment: newComment,
            date: moment().format("ll"),
            mentor: user.displayName,
            mentorEmail: user.email,
            timestamp: Date.now()
        }).then(() => {
            var dbRefComment = db.collection('users').doc(user.email).collection("Comments")


            db.collection('users').doc(email).get().then((doc) => {
                var data = doc.data()
                dbRefComment.doc(dbRef.id).set({
                    menteeName: data.displayName,
                    comment: newComment,
                    date: moment().format("ll"),
                    mentor: user.displayName,
                    title: goalData.Title,
                    emailGoal: email,
                    goalID: id,
                    goalType: 'Financial',
                    status: "unread",
                    timestamp: Date.now()
                })

                // to send email
                emailjs.send('service_egi0mft', 'template_goal', {
                    mentee_email: email,
                    mentee_name: data.displayName,
                    mentor_name: user.displayName,
                    comment: newComment,
                    goal_name: goalData.title
                }, 'ZTZ-Cgjv6xpoEhBrq')
                    .then((result) => {
                        alert("Email sent to: " + email)
                    }, (error) => {
                        console.log(error.text);
                    });
            })
        })

        //need to refer to mentor email




        setNewComment('')
    }
    function addReminderFunc(){
        console.log(reminderDate + reminderTime)
        console.log(moment(reminderDate + reminderTime).format('lll'))

        var dbRef = db.collection('users').doc(email).collection("Goals").doc('Financial').collection('FinancialGoals').doc(id).collection('Reminder').doc(email)
        dbRef.set({
            timestampDue : reminderDate + reminderTime
        }).then(()=>{
            var dbRefNoti = db.collection('users').doc(email).collection('Notification').doc()
            dbRefNoti.set({
                message : 'Reminder : '+goalData.Title,
                timestampDue : reminderDate + reminderTime,
                menteeEmail : email,
                goalID : id,
                goalType : 'financial',
                view : false
            })
        })

        setReminderDialog(false)
    }

    const addReminder = (
        <Dialog open={reminderDialog} onClose={e => { setReminderDialog(false) }} fullWidth="xl">
            <DialogTitle style={{ fontSize: "30px" }}>Add New Reminder</DialogTitle>
            <FormControl>
                <DialogContent>
                    <DialogContentText style={{ fontWeight: 'bold' }}>
                        Reminder Date
                    </DialogContentText>
                    <DialogContentText style={{ fontWeight: 'bold' }}>
                    <input
                        type="date" id="birthdaytime"
                        name="birthdaytime"
                        onChange={e => { setReminderDate(moment(e.target.value).valueOf()); }}>
                    </input>
                    </DialogContentText>
                    
                    <DialogContentText style={{ fontWeight: 'bold', marginTop: '15px', marginBottom: "10px" }}>
                        Reminder Time
                    </DialogContentText>
                    <DialogContentText style={{ fontWeight: 'bold', marginTop: '15px', marginBottom: "10px" }}>
                    <input
                        type="time" id="birthdaytime"
                        name="birthdaytime"
                        onChange={e => { setReminderTime(moment(e.target.valueAsDate).valueOf()); }}>
                    </input>
                    </DialogContentText>
                    
                </DialogContent>
            </FormControl>
            <DialogActions>
                <Button onClick={e => setReminderDialog(!reminderDialog)}>Cancel</Button>
                <Button onClick={e => addReminderFunc()}>Add</Button>
            </DialogActions>
        </Dialog>
    )

    const addTransactionDialog = (

        <Dialog open={open} onClose={handleClose} fullWidth="xl">

            <DialogTitle style={{ fontSize: "30px" }}>Add New Transaction</DialogTitle>
            <FormControl>
                <DialogContent onChange={e => {

                }}>
                    <DialogContentText style={{ fontWeight: 'bold' }}>
                        Details
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="details"
                        label="Transaction Details"
                        type="title"
                        fullWidth
                        variant="standard"
                        onChange={e => {
                            newTransaction.details = e.target.value
                        }}
                    />
                    <DialogContentText style={{ fontWeight: 'bold' }}>
                        Amount
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="amount"
                        label="Transaction Amount"
                        fullWidth
                        variant="standard"
                        onChange={e => {
                            console.log(isNaN(e.target.value))
                            if (isNaN(e.target.value) == false) {
                                var number = e.target.value
                                newTransaction.amount = Number(number)

                            } else {

                                e.target.value = 0
                            }
                        }}
                    />
                    <DialogContentText style={{ fontWeight: 'bold' }} >
                        Type
                        <br></br>

                        <div class="btn-group" role="group" aria-label="Basic radio toggle button group" style={{ marginTop: '10px' }}>
                            <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" defaultChecked
                                onClick={e => { newTransaction.type = "Credit" }} />
                            <label class="btn btn-outline-primary" for="btnradio1">Credit</label>

                            <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" onClick={e => {
                                newTransaction.type = 'Debit'
                            }} />
                            <label class="btn btn-outline-primary" for="btnradio2">Debit</label>
                        </div>
                    </DialogContentText>


                </DialogContent>
            </FormControl>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={e => addTransaction()}>Add</Button>

            </DialogActions>
        </Dialog>)
    
    const deleteReminderDialog = (
        <Dialog open={deleteDialog} onClose={e => { setDeleteDialog(false) }} fullWidth="xl">
            <DialogTitle style={{ fontSize: "30px", alignContent: "center" }} alignContent="center"><WarningIcon color="error" sx={{ width: '40px', height: '40px' }} />Delete Goal ?</DialogTitle>
            <FormControl>
                <DialogContent>
                    <DialogContentText style={{ fontWeight: 'bold' }}>
                        All of the data of this goal will be deleted <br></br>This can’t be undone and it will be removed from your profile
                    </DialogContentText>
                    <DialogContentText style={{ fontWeight: 'bold' }}>

                    </DialogContentText>


                </DialogContent>
            </FormControl>
            <DialogActions>
                <Button onClick={e => setDeleteDialog(false)}>Cancel</Button>
                <Button variant="contained" color="error" sx={{ marginLeft: '10px', marginTop: "10px" }} startIcon={<DeleteIcon />} onClick={e => {deleteGoal()}}>
                    Delete Goal
                </Button>
            </DialogActions>
        </Dialog>
    )

    function addTransaction(e) {
        // console.log(newTransaction)

        // currentFinancialGoal.transactions.unshift(newTransaction)
        // if (newTransaction.type == "Debit") {
        //     setCurrentMoney(currentMoney - newTransaction.amount)
        //     currentFinancialGoal.current = currentMoney

        // } else {
        //     setCurrentMoney(currentMoney + newTransaction.amount)
        //     currentFinancialGoal.current = currentMoney
        // }
        console.log('add trans')
        var dbRef = db.collection('users').doc(email).collection("Goals").doc('Financial').collection('FinancialGoals').doc(id).collection('transactions').doc()
        dbRef.set({

            amount: newTransaction.amount,
            date: newTransaction.date,
            details: newTransaction.details,
            type: newTransaction.type

        }).then(console.log("Success add transaction"))

        setNewTransaction({
            details: '',
            amount: 0,
            type: 'Credit',
            date: moment().format('ll')
        })
        updateData()
        handleClose()
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
        goalData && transactions ? (
            userRole == "Mentee" ? (
                //mentee section
                <ThemeProvider theme={theme}>
                    <div className="pageLayout">
                        <Breadcrumbs aria-label="breadcrumb" sx={{ backgroundColor: 'white', marginTop: '20px' }}>
                            <Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} href="/home">
                                <HomeIcon sx={{ mr: 0.5 }} fontSize="large" />
                                Home
                            </Link>
                            <Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} href="/workgoals">
                                <MonetizationOnIcon sx={{ mr: 0.5 }} fontSize="large" />
                                Financial Goals
                            </Link>
                            <Link sx={{ display: 'flex', alignItems: 'center' }} color="text.primary">
                                <GppGoodIcon sx={{ mr: 0.5 }} fontSize="large" />
                                {/* {currentFinancialGoal.title} */}
                                {goalData.Title}
                            </Link>
                        </Breadcrumbs>
                        <div className="container">
                            <h1 className='boxtitle textheader' style={{ textAlign: 'left', fontSize: '50px', marginTop: '20px' }}>
                                {/* {currentFinancialGoal.title} */}
                                {goalData.Title}
                            </h1>
                            <br></br>
                            <NotificationsIcon sx={{ mr: 0.5, marginBottom: '10px' }} fontSize="large" /> Current Reminder : {reminder == "" ? ('Please set a reminder first') : (reminder)}
                            <br></br>
                            <Button onClick={e => { setReminderDialog(!reminderDialog) }} variant="contained" size="large" style={{ marginTop: '0px', marginBottom: "15px" }}>
                                {reminder == "" ? ('Add Reminder') : ('Edit Reminder')}
                            </Button>
                            {addReminder}
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Item sx={{ height: '100%', border: 1, borderColor: 'secondary.main', borderShadow: 0 }}>
                                        <div class="align-self-left" style={{ width: '100%', textAlign: 'center', marginTop: '10px' }}>
                                            <h1>Current Progress</h1>
                                        </div>
                                        <div class="progress" style={{ height: '32px', marginTop: '20px', marginBottom: '20px' }}>
                                            <div class="progress-bar bg-success" role="progressbar" style={{ width: `${goalData.currentPercentage}%` }} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">{0 + goalData.currentPercentage}%</div>
                                        </div>
                                    </Item>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Item sx={{ marginTop: '30px', height: '100%', border: 1, borderColor: 'secondary.main', borderShadow: 0 }}>
                                        <div className='boxactivity'>
                                            <div class="row text-center">
                                                <div class="col border-end ">
                                                    <h1>Target :</h1>
                                                    <h2>RM {goalData.target.toFixed(2)}</h2>
                                                </div>
                                                <div class="col">
                                                    <h1>Current Total :</h1>
                                                    <h2>RM {goalData.current.toFixed(2)}</h2>
                                                </div>
                                            </div>
                                            <br></br>
                                            <br></br>
                                            <Box display="flex" justifyContent='center' alignItems='center'>
                                                <Button color="success" variant="contained" onClick={handleOpen}>
                                                    Add New Transaction
                                                </Button>
                                                {addTransactionDialog}
                                            </Box>


                                            <div class="col-12 justify-content-center">
                                                <h2 style={{ paddingLeft: '20px', marginTop: '40px' }}>Transaction History : </h2>
                                            </div>


                                            <table class="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" class="col-1">#</th>
                                                        <th scope="col" class="col-4">Transaction Details</th>
                                                        <th scope="col" class="col-2">Amount</th>
                                                        <th scope="col" class="col-2">Type</th>
                                                        <th scope="col" class="col-2">Date</th>
                                                        <th scope="col" class="col-2">Edit</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {transactions.map((transaction, index) => (
                                                        transaction.id != currentEdit ? (
                                                            <tr>
                                                                <th scope="row">
                                                                    {index + 1}
                                                                </th>
                                                                <td>{transaction.transaction.details}</td>
                                                                <td>
                                                                    {transaction.transaction.type == 'Credit' ?
                                                                        <strong
                                                                            style={{ color: 'green' }}
                                                                        >+ {transaction.transaction.amount.toFixed(2)}</strong> :
                                                                        <strong
                                                                            style={{ color: 'red' }}
                                                                        >- {transaction.transaction.amount.toFixed(2)}</strong>}
                                                                </td>
                                                                <td><strong>{transaction.transaction.type}</strong></td>
                                                                <td>{transaction.transaction.date}</td>
                                                                <td><Button variant="contained" startIcon={<EditIcon />} sx={{ width: '10px' }}
                                                                    onClick={e => {
                                                                        setCurrentEdit(transaction.id);
                                                                        setCurrentEditAmount(transaction.transaction.amount);
                                                                        setCurrentEditDetails(transaction.transaction.details)
                                                                        setCurrentEditType(transaction.transaction.type)
                                                                        setCurrentEditDate(transaction.transaction.date)
                                                                        console.log("transaction id " + transaction.id)

                                                                    }} />

                                                                </td>
                                                            </tr>) : (
                                                            <tr>
                                                                <th scope="row">
                                                                    {index + 1}
                                                                </th>
                                                                <td>
                                                                    <Input defaultValue={transaction.transaction.details} onChange={e => { setCurrentEditDetails(e.target.value) }} />
                                                                </td>
                                                                <td>
                                                                    <Input defaultValue={transaction.transaction.amount} onChange={e => { setCurrentEditAmount(Number(e.target.value)) }} />
                                                                </td>
                                                                <td><strong>
                                                                    <TextField
                                                                        id="outlined-select"
                                                                        select
                                                                        defaultValue={transaction.transaction.type}
                                                                        onChange={e => { setCurrentEditType(e.target.value) }}
                                                                        sx={{ height: '1' }}
                                                                    >

                                                                        <MenuItem key="credit" value="Credit">
                                                                            Credit
                                                                        </MenuItem>
                                                                        <MenuItem key="debit" value="Debit">
                                                                            Debit
                                                                        </MenuItem>

                                                                    </TextField>
                                                                </strong></td>
                                                                <td>{transaction.transaction.date}</td>
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
                                                    ))}
                                                </tbody>
                                            </table>

                                            {deleteReminderDialog}
                                            <Box display="flex" justifyContent='flex-end' alignItems='center' sx={{ marginTop: "10px" }}>
                                            <Button variant="contained" color="error" sx={{ marginLeft: '10px', marginTop: "10px" }} startIcon={<DeleteIcon />} onClick={e => { setDeleteDialog(true) }}>
                                                    Delete Goal
                                                </Button>
                                            </Box>

                                        </div>
                                    </Item>
                                </Grid>

                                <Grid container spacing={1} sx={{ marginTop: '80px' }}>
                                    <Grid item xs={12}>
                                        <Item2>
                                            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '30px' }}>
                                                Previous comment
                                            </Typography>
                                            <Stack container spacing={2}>
                                                {
                                                    comments.map((comment) => (

                                                        <Item2 sx={{ boxShadow: 2 }}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={9}>
                                                                    <Item2>
                                                                        <Typography variant="h5" sx={{ color: 'black', textAlign: 'center' }}>
                                                                            Comment
                                                                        </Typography>
                                                                        <Typography variant="h6" alignItems='center' sx={{ textAlign: 'left' }}>
                                                                            {comment.comment.comment}
                                                                        </Typography>
                                                                    </Item2>
                                                                </Grid>
                                                                <Grid item xs={2}>
                                                                    <Item2>
                                                                        <Typography variant="h5" sx={{ color: 'black', textAlign: 'center' }}>
                                                                            Date Given
                                                                        </Typography>
                                                                        <Typography variant="h6" alignItems='center' sx={{ alignItems: 'center', textAlign: 'center' }}>
                                                                            {comment.comment.date}
                                                                        </Typography>
                                                                    </Item2>
                                                                    <Item2>
                                                                        <Typography variant="h5" sx={{ color: 'black', textAlign: 'center' }}>
                                                                            From
                                                                        </Typography>
                                                                        <Typography variant="h6" alignItems='center' sx={{ alignItems: 'center', textAlign: 'center' }}>
                                                                            {comment.comment.mentor}
                                                                        </Typography>
                                                                    </Item2>
                                                                </Grid>
                                                                <Grid item xs={1}>
                                                                    <Item2 justifyContent='center' alignItems='center' sx={{ height: '100%' }}>
                                                                        <Box display="flex" justifyContent='center' alignItems='center' sx={{ height: '100%' }}>
                                                                            <CheckCircleOutlineIcon color="primary" sx={{ width: '40px', height: '40px' }} />
                                                                        </Box>
                                                                    </Item2>
                                                                </Grid>
                                                            </Grid>
                                                        </Item2>
                                                    ))
                                                }
                                            </Stack>
                                        </Item2>
                                    </Grid>
                                </Grid>

                            </Grid>
                        </div>
                    </div>
                </ThemeProvider>
            ) : (
                //  Mentor section
                <ThemeProvider theme={theme}>
                    <div className="pageLayout">
                        <Breadcrumbs aria-label="breadcrumb" sx={{ backgroundColor: 'white', marginTop: '20px' }}>
                            <Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} href="/home">
                                <HomeIcon sx={{ mr: 0.5 }} fontSize="large" />
                                Home
                            </Link>
                            <Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} href="/workgoals">
                                <MonetizationOnIcon sx={{ mr: 0.5 }} fontSize="large" />
                                Financial Goals
                            </Link>
                            <Link sx={{ display: 'flex', alignItems: 'center' }} color="text.primary">
                                <GppGoodIcon sx={{ mr: 0.5 }} fontSize="large" />
                                {/* {currentFinancialGoal.title} */}
                                {goalData.Title}
                            </Link>
                        </Breadcrumbs>
                        <div className="container">
                            <h1 className='boxtitle textheader' style={{ textAlign: 'left', fontSize: '50px', marginTop: '20px' }}>
                                {/* {currentFinancialGoal.title} */}
                                {goalData.Title}
                            </h1>
                            <br></br>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Item sx={{ height: '100%', border: 1, borderColor: 'secondary.main', borderShadow: 0 }}>
                                        <div class="align-self-left" style={{ width: '100%', textAlign: 'center', marginTop: '10px' }}>
                                            <h1>Current Progress</h1>
                                        </div>
                                        <div class="progress" style={{ height: '32px', marginTop: '20px', marginBottom: '20px' }}>
                                            <div class="progress-bar bg-success" role="progressbar" style={{ width: `${goalData.currentPercentage}%` }} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">{0 + goalData.currentPercentage}%</div>
                                        </div>
                                    </Item>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Item sx={{ marginTop: '30px', height: '100%', border: 1, borderColor: 'secondary.main', borderShadow: 0 }}>
                                        <div className='boxactivity'>
                                            <div class="row text-center">
                                                <div class="col border-end ">
                                                    <h1>Target :</h1>
                                                    <h2>RM {goalData.target.toFixed(2)}</h2>
                                                </div>
                                                <div class="col">
                                                    <h1>Current Total :</h1>
                                                    <h2>RM {goalData.current.toFixed(2)}</h2>
                                                </div>
                                            </div>
                                            <br></br>
                                            <br></br>


                                            <div class="col-12 justify-content-center">
                                                <h2 style={{ paddingLeft: '20px', marginTop: '40px' }}>Transaction History : </h2>
                                            </div>


                                            <table class="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" class="col-1">#</th>
                                                        <th scope="col" class="col-4">Transaction Details</th>
                                                        <th scope="col" class="col-2">Amount</th>
                                                        <th scope="col" class="col-2">Type</th>
                                                        <th scope="col" class="col-2">Date</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {transactions.map((transaction, index) => (

                                                        <tr>
                                                            <th scope="row">
                                                                {index + 1}
                                                            </th>
                                                            <td>{transaction.transaction.details}</td>
                                                            <td>
                                                                {transaction.transaction.type == 'Credit' ?
                                                                    <strong
                                                                        style={{ color: 'green' }}
                                                                    >+ {transaction.transaction.amount.toFixed(2)}</strong> :
                                                                    <strong
                                                                        style={{ color: 'red' }}
                                                                    >- {transaction.transaction.amount.toFixed(2)}</strong>}
                                                            </td>
                                                            <td><strong>{transaction.transaction.type}</strong></td>
                                                            <td>{transaction.transaction.date}</td>

                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </Item>
                                </Grid>
                                {/* Add comment here */}
                                <Grid container spacing={1} sx={{ marginTop: '80px' }}>
                                    <Grid item xs={12}>
                                        <Item2>
                                            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                                Leave your comment here:
                                            </Typography>


                                            <TextField id="outlined-textarea" label="Comment" multiline sx={{ marginTop: '20px', width: '100%' }} onChange={e => {
                                                setNewComment(e.target.value)
                                            }} />


                                            <Box display="flex" justifyContent='flex-end' alignItems='center' sx={{ marginTop: "10px" }}>
                                                <div style={{ paddingRight: '20px' }}>
                                                    An email will be sent to notify this user !
                                                </div>
                                                <Button startIcon={<CheckCircleIcon />} color="success" size="large" variant="contained" sx={{ marginTop: "10px" }} onClick={e => { addComment(e) }}>
                                                    Submit
                                                </Button>
                                            </Box>
                                        </Item2>
                                    </Grid>
                                </Grid>


                                {/* comments section */}
                                <Grid container spacing={1} sx={{ marginTop: '80px' }}>
                                    <Grid item xs={12}>
                                        <Item2>
                                            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '30px' }}>
                                                Previous comment
                                            </Typography>
                                            <Stack container spacing={2}>
                                                {
                                                    comments.map((comment) => (

                                                        <Item2 sx={{ boxShadow: 2 }}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={9}>
                                                                    <Item2>
                                                                        <Typography variant="h5" sx={{ color: 'black', textAlign: 'center' }}>
                                                                            Comment
                                                                        </Typography>
                                                                        <Typography variant="h6" alignItems='center' sx={{ textAlign: 'left' }}>
                                                                            {comment.comment.comment}
                                                                        </Typography>
                                                                    </Item2>
                                                                </Grid>
                                                                <Grid item xs={2}>
                                                                    <Item2>
                                                                        <Typography variant="h5" sx={{ color: 'black', textAlign: 'center' }}>
                                                                            Date Given
                                                                        </Typography>
                                                                        <Typography variant="h6" alignItems='center' sx={{ alignItems: 'center', textAlign: 'center' }}>
                                                                            {comment.comment.date}
                                                                        </Typography>
                                                                    </Item2>
                                                                    <Item2>
                                                                        <Typography variant="h5" sx={{ color: 'black', textAlign: 'center' }}>
                                                                            From
                                                                        </Typography>
                                                                        <Typography variant="h6" alignItems='center' sx={{ alignItems: 'center', textAlign: 'center' }}>
                                                                            {comment.comment.mentor}
                                                                        </Typography>
                                                                    </Item2>
                                                                </Grid>
                                                                <Grid item xs={1}>
                                                                    <Item2 justifyContent='center' alignItems='center' sx={{ height: '100%' }}>
                                                                        <Box display="flex" justifyContent='center' alignItems='center' sx={{ height: '100%' }}>
                                                                            <CheckCircleOutlineIcon color="primary" sx={{ width: '40px', height: '40px' }} />
                                                                        </Box>
                                                                    </Item2>
                                                                </Grid>
                                                            </Grid>
                                                        </Item2>

                                                    ))
                                                }
                                            </Stack>
                                        </Item2>
                                    </Grid>
                                </Grid>

                            </Grid>
                        </div>
                    </div>
                </ThemeProvider>
            )
        )
            : undefined
    );
}

export default Finance;