import React, { useState, useEffect } from "react"
import bootstrap from 'bootstrap'
import '../styles/nonhabitual.css'
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
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

const Finance = () => {
    const [transactions, setTransactions] = useState([{ details: 'February Income', amount: 20, type: 'Credit', date: "20 April 2020" },
    { details: 'Emergency', amount: 15, type: 'Debit', date: "20 April 2020" },
    { details: 'Mac Income', amount: 30, type: 'Credit', date: "20 April 2020" },
    { details: 'April Income', amount: 40, type: 'Credit', date: "20 April 2020" }])
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
    const [numbers, setNumber] = React.useState([])
    const [buttonAble, setButtonAble] = useState(false);
    const [targetMoney, setTargetMoney] = useState(100.00)
    const [currentMoney, setCurrentMoney] = useState(75.00)


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
                        onClick = {e=>{newTransaction.type ="Credit"}}/>
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
        console.log(newTransaction)
        var currentTransactions = transactions
        currentTransactions.unshift(newTransaction)
        if(newTransaction.type == "Debit"){
            setCurrentMoney(currentMoney - newTransaction.amount)
        }else{
            setCurrentMoney(currentMoney + newTransaction.amount)
        }
        setTransactions(currentTransactions)

        setNewTransaction({
            details: '',
            amount: 0,
            type: 'Credit',
            date: moment().format('ll')
        })
        
        handleClose()
    }

    return (
        <div className="pageLayout">
            <div className="container">
                <h1 className='boxtitle textheader' style={{ textAlign: 'center' }}>
                    Tabung Kahwin
                </h1>
                <br></br>
                <div class="align-self-center" style={{ width: '100%' }}>
                    <h4>Current Progress :</h4>
                </div>

                <div class="progress" style={{ height: '32px' }}>
                    <div class="progress-bar bg-success" role="progressbar" style={{ width: `${(currentMoney / targetMoney) * 100}%` }} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">{0 + Math.round((currentMoney / targetMoney) * 100)}%</div>
                </div>



                <div className='boxactivity'>
                    <div class="row text-center">
                        <div class="col border-end ">
                            <h1>Target :</h1>
                            <h2>RM {targetMoney.toFixed(2)}</h2>
                        </div>
                        <div class="col">
                            <h1>Current Total :</h1>
                            <h2>RM {currentMoney.toFixed(2)}</h2>
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                    <div class="row ">
                        <div class="col-8 justify-content-end">
                            <h2 style={{ paddingLeft: '20px' }}>Transaction History : </h2>
                        </div>
                        <div class="col-4">

                            <button className="btn btn-light" onClick={handleOpen}>Add Transaction</button>
                            {addTransactionDialog}

                        </div>

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
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Finance;