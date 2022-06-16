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

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



const FinancialGoalPost = ({goalData,id}) => {
    const [transactions, setTransactions] = useState([])
    
    const { user, setUser } = useContext(UserContext);
    useEffect(() => {
        var dbRef = db.collection('users').doc(user.email).collection("Goals").doc('Financial').collection('FinancialGoals').doc(id).collection('transactions')
        dbRef.onSnapshot(snapshot => {
            setTransactions(snapshot.docs.map(doc => ({
                id: doc.id,
                transaction: doc.data(),
            })));
        })
    }, [id])
    return (
        <Link to={`/goal3/${id}`} class="link">
                            <Grid container spacing={1} >
                                <Grid item xs={12} >
                                    <Item sx={{ height: '100%', boxShadow: '3' }} style={{ padding: '20px', backgroundColor: "white" }}>
                                        <div className="row">
                                            <div className="col-8">
                                                <Typography variant="h4" justifyContent="flex-start" style={{ textAlign: 'left', paddingLeft: '10px', marginTop: '5px', marginBottom: '5px', color: 'black' }}>{goalData.Title}</Typography>
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
                                                        <CircularProgress style={{ 'position': 'absolute', 'color': '#fff' }} variant="determinate" size={100} thickness={7} value={100} />
                                                        <CircularProgress style={{ 'color': "blue" }} variant="determinate" size={100} thickness={7} value={goalData.currentPercentage} />
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
                                                                {`${Math.round(goalData.currentPercentage)}%`}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                    <Typography>{goalData.currentPercentage}% Completed</Typography>
                                                </Item>
                                            </Grid>
                                            <Grid item xs={12} md={8}>
                                                <Item sx={{ height: '100%', border: 1 }} style={{ backgroundColor: "#f7f6f6" }}>
                                                    <Typography variant="h6" style={{ color: "black", textAlign: "left", paddingLeft: '10px', marginRight: '20px' }}>Recent Transaction <CurrencyExchangeIcon /></Typography>
                                                    <div style={{ margin: '5px 50px' }}>
                                                        <table class="table">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col" class="col-1">#</th>
                                                                    <th scope="col" class="col-8">Transaction</th>
                                                                    <th scope="col" class="col-3">Amount</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                
                                                                {transactions.slice(0, 3).map((transaction, index) => (
                                                                    <tr>
                                                                        <th scope="row">
                                                                            {index + 1}
                                                                        </th>
                                                                        <td>{transaction.transaction.details}</td>
                                                                        <td>{transaction.transaction.type == 'Credit' ?
                                                                            <strong
                                                                                style={{ color: 'green' }}
                                                                            >+ {transaction.transaction.amount.toFixed(2)}</strong> :
                                                                            <strong
                                                                                style={{ color: 'red' }}
                                                                            >- {transaction.transaction.amount.toFixed(2)}</strong>}
                                                                        </td>
                                                                    </tr>
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

export default FinancialGoalPost;