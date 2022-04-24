import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import '../styles/nonhabitual.css'
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import { Navigate, useNavigate } from 'react-router-dom'
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

    return (
        <div className="pageLayout">
            <div className="container">

                <h1 className='boxtitle textheader' style={{ textAlign: 'center' }}>
                    {work[id].title}
                </h1>
                <br></br>
                <div class="align-self-center" style={{ width: '100%' }}>
                    <h4>Current Progress :</h4>
                </div>

                <div class="progress" style={{ height: '32px' }}>
                    <div class="progress-bar bg-success" role="progressbar" style={{ width: `${(0+finishedActivities.length / ( 0+finishedActivities.length + pendingActivities.length - toRemove) * 100)}%` }} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">{0 + (finishedActivities.length / (finishedActivities.length + pendingActivities.length - toRemove) * 100)}%</div>
                </div>



                <div className='boxactivity'>
                    <div className="row">

                        <div className="col align-content-end">
                            <h1>Pending Activities</h1>
                        </div>
                        <div className="col d-flex justify-content-end" style={{ maxWidth: '150px', borderRadius: "5px" }}>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    ...
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={e => { setEditable(!editable) }}>Edit</Dropdown.Item>
                                    <Dropdown.Item style={{ color: 'red' }} onClick={e => { deleteGoal() }}>Delete</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

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
                    <div class="row justify-content-end">
                        <div class="col-10"></div>
                        <button style={{ marginRight: '20px' }} className="btn col-2" disabled={!buttonAble} onClick={e => addTask(e.target)}>Task Done</button>
                    </div>
                    <h1>Finished Activities</h1>
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

                </div>
            </div>
        </div>
    );
}

export default Nonhabitual;