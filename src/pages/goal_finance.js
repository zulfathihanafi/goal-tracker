import React, { useState, useEffect, useContext } from "react"

import { UserContext } from '../userContext'

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

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Finance = ({ financial }) => {
    const { id } = useParams();
    
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
    const [goalData,setGoalData] = useState()

    // Transactions
    const [transactions, setTransactions] = useState([])
    let navigate = useNavigate();

    function deleteGoal() {
        navigate('/home')
    }
    

    const { user, setUser } = useContext(UserContext);
    
    useEffect(() => {
        // getting the transactions data
        var dbRefTrans = db.collection('users').doc(user.email).collection("Goals").doc('Financial').collection('FinancialGoals').doc(id).collection('transactions')
        dbRefTrans.onSnapshot(snapshot => {
            setTransactions(snapshot.docs.map(doc => ({
                id: doc.id,
                transaction: doc.data(),
            })));
        })
        
        // getting the goal data
        var dbRef = db.collection('users').doc(user.email).collection("Goals").doc('Financial').collection('FinancialGoals').doc(id)
        dbRef.get().then((doc) => {
            var data = doc.data()
            console.log(data.Title)
            setGoalData(data)
        })
    console.log(goalData)
    }, [id]) 





    const addTransactionDialog = (<Dialog open={open} onClose={handleClose} fullWidth="xl">

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
                        <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked
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
        // console.log('add trans')


        // setNewTransaction({
        //     details: '',
        //     amount: 0,
        //     type: 'Credit',
        //     date: moment().format('ll')
        // })

        // handleClose()
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
        goalData&&transactions?
        <ThemeProvider theme={theme}>
            <div className="pageLayout">
                <Breadcrumbs aria-label="breadcrumb" sx={{ backgroundColor: 'white', marginTop: '20px' }}>
                        <Link underline="hover" sx={{ display: 'flex', alignItems: 'center'}} href="/home">
                            <HomeIcon sx={{ mr: 0.5 }} fontSize="large" />
                            Home
                        </Link>
                        <Link underline="hover" sx={{ display: 'flex', alignItems: 'center'}} href="/workgoals">
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
                                    <div class="progress-bar bg-success" role="progressbar" style={{ width: `${Math.round((goalData.current / goalData.target) * 100)}%` }} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">{0+Math.round((goalData.current / goalData.target) * 100)}%</div>
                                </div>
                            </Item>
                        </Grid>
                    </Grid>
                    <Grid container spacing = {1}>
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
                                            <Button color="success" variant="contained">
                                                Add New Transaction
                                            </Button>
                                            {addTransactionDialog}
                                    </Box>
                                   

                                    <div class="col-12 justify-content-center">
                                        <h2 style={{ paddingLeft: '20px', marginTop: '40px'}}>Transaction History : </h2>
                                    </div>

                                   
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col" class="col-1">#</th>
                                                <th scope="col" class="col-5">Transaction Details</th>
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
{/*                                             
                                            {!editable ? transactions.map((transaction, index) => (
                                                <tr>
                                                    <th scope="row">
                                                        {index + 1}
                                                    </th>
                                                    <td>{transaction.details}</td>
                                                    <td>
                                                        {transaction.type == 'Credit' ?
                                                            <strong
                                                                style={{ color: 'green' }}
                                                            >+ {transaction.amount.toFixed(2)}</strong> :
                                                            <strong
                                                                style={{ color: 'red' }}
                                                            >- {transaction.amount.toFixed(2)}</strong>}
                                                    </td>
                                                    <td><strong>{transaction.type}</strong></td>
                                                    <td>{transaction.date}</td>
                                                </tr>
                                            )) : transactions.map((transaction, index) => (
                                                <tr>
                                                    <th scope="row">
                                                        {index + 1}
                                                    </th>
                                                    <td>
                                                        <Input defaultValue={transaction.details} onChange={e => { transaction.details = e.target.value }} />
                                                    </td>
                                                    <td>
                                                        <Input defaultValue={transaction.amount} onChange={e => { transaction.amount = Number(e.target.value) }} />
                                                    </td>
                                                    <td><strong>
                                                        <TextField
                                                            id="outlined-select"
                                                            select
                                                            defaultValue ={transaction.type}
                                                            onChange={e=>{transaction.type = e.target.value}}
                                                            
                                                        >
                                                            
                                                                <MenuItem key="credit" value="credit">
                                                                    Credit
                                                                </MenuItem>
                                                                <MenuItem key="debit" value="debit">
                                                                    Debit
                                                                </MenuItem>
                                                            
                                                        </TextField>
                                                    </strong></td>
                                                    <td>{transaction.date}</td>
                                                </tr>
                                            ))}
                                             */}
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
    : undefined
    );
}

export default Finance;