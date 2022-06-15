import React, { useState, useEffect } from "react"
import '../styles/nonhabitual.css'
const Habitual = () => {
    const [pendingActivities, setPendingActivities] = useState([{ task: 'task delegation', due: "20 April 2020" }, { task: 'user research', due: "20 April 2020" }, { task: 'presentation', due: "20 April 2020" }, { task: 'start coding', due: "20 April 2020" }])
    const [finishedActivities, setFinishedActivities] = useState([])
    
    const [numbers, setNumber] = React.useState([])

    const [buttonAble, setButtonAble] = useState(false);

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

        numbers.forEach(number => {
            finishedActivities.push(pendingActivities[number])
            delete pendingActivities[number]

        })

        setNumber([])
        setButtonAble(false)
    }

    return (
        <div className="pageLayout">
            <div className="container">
                <h1 className='boxtitle textheader' style={{ textAlign: 'center' }}>
                    Programming Project
                </h1>
                <br></br>
                <div class="align-self-center" style={{width:'100%'}}>
                    <h4>Current Progress :</h4>
                </div>

                <div class="progress" style={{ height: '32px' }}>
                    <div class="progress-bar bg-success" role="progressbar" style={{ width: `${(finishedActivities.length / (pendingActivities.length) * 100)}%` }} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">{0+(finishedActivities.length / (pendingActivities.length) * 100)}%</div>
                </div>



                <div className='boxactivity'>
                    <h1>Pending Activities</h1>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col" class="col-2">#</th>
                                <th scope="col" class="col-6">Goal</th>
                                <th scope="col" class="col-4">Due Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingActivities.map((activity, index) => (
                                <tr>
                                    <th scope="row">
                                        <input key={index} type="checkbox" defaultChecked={false} class="custom-control-input" id="customCheck3" onChange={e => addArray(e.target, index)} />
                                    </th>
                                    <td>{activity.task}</td>
                                    <td>{activity.due}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div class="row justify-content-end">
                        <div class="col-10"></div>
                        <button style={{ marginRight: '20px' }} className="btn btn-light col-2" disabled={!buttonAble} onClick={e => addTask(e.target)}>Task Done</button>
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

                </div>
            </div>
        </div>
    );
}

export default Habitual;