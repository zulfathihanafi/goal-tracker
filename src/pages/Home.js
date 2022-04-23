import { useState } from "react";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
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

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const actions = [
    { icon: <FileCopyIcon />, name: 'Copy' },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <PrintIcon />, name: 'Print' },
    { icon: <ShareIcon />, name: 'Share' },
];

const Home = () => {
    const [goals,setGoals] = React.useState([[20, "red"], [50, "yellow"], [90, 'green'], [20, "red"], [90, 'green']]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    function addGoal(){
        goals.unshift([20,'blue'])
        console.log(goals)
        setOpen(false)
        
    }
    return (

        <div class="container">
            <Grid container spacing={2} justifyContent="flex-start" alignItems="center" style={{ marginTop: "10px" }}>
                <Grid item xs={12}>
                    <Item style={{ boxShadow: 0 }} sx={{ border: 0, boxShadow: 0 }}>
                        <Typography variant="h2" style={{ marginBottom: "0px", textAlign: "center", color: "black" }}>My Goals</Typography>
                    </Item>
                </Grid>
            </Grid>
            <Grid container spacing={2} justifyContent="flex-start" alignItems="center" style={{ marginTop: "10px" }}>
                <Grid item xs={12} md={11}>
                    <Item style={{ boxShadow: 0 }} sx={{ border: 0, boxShadow: 0 }}>
                        <Typography variant="h4" style={{ marginTop: "0px", marginBottom: "30px", textAlign: "left", color: "black" }}>Habitual Goals</Typography>
                    </Item>
                </Grid>
                <Grid item xs={12} md={1}>
                    <Item style={{ boxShadow: 0 }} sx={{ border: 0, boxShadow: 0 }}>
                        <div>
                            <Fab color="success" aria-label="add" onClick={handleClickOpen} size="medium" style={{ 'z-index': '5' }}>
                                <AddIcon />
                            </Fab>
                            <Dialog open={open} onClose={handleClose} fullWidth="xl">
                                <DialogTitle style={{ fontSize: "30px" }}>Add New Goal</DialogTitle>
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
                                        />
                                        <DialogContentText style={{ fontWeight: 'bold', marginTop: '15px' }}>
                                            Description
                                        </DialogContentText>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="description"
                                            label="Goal Description"
                                            type="description"
                                            fullWidth
                                            variant="standard"
                                        />
                                        <DialogContentText style={{ fontWeight: 'bold', marginTop: '15px' }}>
                                            Goal Type
                                        </DialogContentText>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        >
                                            <FormControlLabel value="type1" control={<Radio />} label="Type 1" />
                                            <FormControlLabel value="type2" control={<Radio />} label="Type 2" />
                                        </RadioGroup>
                                        <DialogContentText style={{ fontWeight: 'bold', marginTop: '15px', marginBottom: "10px" }}>
                                            Goal Deadline
                                        </DialogContentText>
                                        <input type="datetime-local" id="birthdaytime" name="birthdaytime"></input>
                                    </DialogContent>
                                </FormControl>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button onClick={e => addGoal()}>Add</Button>
                                    <Button onClick={e => addGoal()}>Add</Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </Item>
                </Grid>
            </Grid>
            {goals.map((goal) => (
                <Grid container spacing={3} >
                    <Grid item xs={12} >
                        <Item sx={{ height: '100%' }} style={{ padding:'20px'}}>
                            <Typography variant="h4" justifyContent="flex-start" style={{ textAlign: 'left', paddingLeft: '10px', marginTop: '5px', marginBottom: '5px', color: 'black' }}>Goal 1</Typography>
                            <Divider style={{ marginBottom: '15px' }} />
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={4}>
                                    <Item sx={{ height: '100%' }} style={{backgroundColor:"#d9d9d9"}}>
                                        <Typography variant="h6" style={{ color: "black", textAlign: "left", paddingLeft: '10px' }}>Overall Status</Typography>
                                        <Box sx={{ position: 'relative', display: 'inline-flex' }} style={{ marginTop: '20px' }}>
                                            <CircularProgress style={{ 'position': 'absolute', 'color': '#fff' }} variant="determinate" size={100} thickness={7} value={100} />
                                            <CircularProgress style={{ 'color': goal[1] }} variant="determinate" size={100} thickness={7} value={goal[0]} />
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
                                                    {`${Math.round(goal[0])}%`}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Typography>{goal[0]}% Completed</Typography>
                                    </Item>
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <Item sx={{ height: '100%' }} style={{backgroundColor:"#d9d9d9"}}>
                                        <Typography variant="h6" style={{ color: "black", textAlign: "left", paddingLeft: '10px' }}>Task Completion</Typography>
                                        <Typography>Task 1</Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', width: '80%', ml: '10%', mr: '10%' }}>
                                            <Box sx={{ width: '100%', mr: 1 }}>
                                                <LinearProgress variant="determinate" value="50" />
                                            </Box>
                                            <Box sx={{ minWidth: 35 }}>
                                                <Typography variant="body2" color="text.secondary">50%</Typography>
                                            </Box>
                                        </Box>
                                        <Typography>Task 2</Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', width: '80%', ml: '10%', mr: '10%' }}>
                                            <Box sx={{ width: '100%', mr: 1 }}>
                                                <LinearProgress variant="determinate" value="80" />
                                            </Box>
                                            <Box sx={{ minWidth: 35 }}>
                                                <Typography variant="body2" color="text.secondary">80%</Typography>
                                            </Box>
                                        </Box>
                                        <Typography>Task 3</Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', width: '80%', ml: '10%', mr: '10%' }}>
                                            <Box sx={{ width: '100%', mr: 1 }}>
                                                <LinearProgress variant="determinate" value="10" />
                                            </Box>
                                            <Box sx={{ minWidth: 35 }}>
                                                <Typography variant="body2" color="text.secondary">10%</Typography>
                                            </Box>
                                        </Box>
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
                </Grid>))}
                
        </div>

    )
}

export default Home;