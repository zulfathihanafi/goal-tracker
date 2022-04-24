import { useEffect, useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom'
import "../styles/register.css"

const Register = ({ user }) => {
    let navigate = useNavigate();
    const [chooseForm, setForm] = useState('login')
    const [chooseRegisterColor, setRegisterColor] = useState("#d9d9d9")
    const [chooseLoginColor, setLoginColor] = useState("white")

    const [chooseRegisterBorder, setRegisterBorder] = useState("none")
    const [chooseLoginBorder, setLoginBorder] = useState("solid")
    const color = ["#d9d9d9", 'white']
    const border = ['solid', 'none']

    useEffect(() => {
        if (chooseForm == "login") {
            setRegisterColor(color[1])
            setLoginColor(color[0])
            setLoginBorder(border[0])
            setRegisterBorder(border[1])
        } else {
            setRegisterColor(color[0])
            setLoginColor(color[1])
            setLoginBorder(border[1])
            setRegisterBorder(border[0])
        }
    }, [chooseForm])

    const [loginUser, setLoginUser] = useState({ email: '', password: '' })
    function login() {
        let currentUser = loginUser
        setLoginUser(currentUser)
        if (loginUser.email == "k@gmail.com" && loginUser.password == "123456") {
            user[1](loginUser)
            navigate(`/home`);
        } else {
            alert("No profile found ! Please register first")
        }

    }

    return (


        <div className="registerContainer" style={{paddingTop:'20px'}}>
            <h2 style={{backgroundColor:"white", borderRadius:'5px',marginBottom:'30px',padding:'10px'}}> 🎯 Welcome to Goal Tracker 🎯</h2>
            <div class="row">
                <div class="col">
                    
                    <img src="https://www.nicepng.com/png/full/95-955233_icon-free-download-png-svg-free-download-goal.png" width="400" height="400" alt="" style={{ marginRight: '10px' }} />
                </div>
                <div class="col">
                    <div className='signup' style={{ backgroundColor: "#d9d9d9" }}>
                        <div class="tabs" >
                            <ul class="nav nav-tabs" style={{ width: '100%' }}>
                                <li class="nav-item" style={{ width: '50%' }} >
                                    <a class="nav-link" style={{ backgroundColor: chooseLoginColor, borderBottom: chooseLoginBorder }} aria-current="page" href="#" onClick={e => setForm('login')} >Login</a>
                                </li>
                                <li class="nav-item" style={{ width: '50%' }}>
                                    <a class="nav-link" style={{ backgroundColor: chooseRegisterColor, borderBottom: chooseRegisterBorder }} href="#" onClick={e => setForm('register')}>Register</a>
                                </li>
                            </ul>
                        </div>
                        <div className='signupbox' style={{ backgroundColor: "#d9d9d9" }}>
                            {chooseForm == "register" ? <div>
                                <strong>
                                    <h1>Register</h1>
                                    <h4>It's free and only takes a minute</h4>
                                </strong>
                                <form>
                                    <label>Name</label>
                                    <input type="text" placeholder="" />
                                    <label>Email</label>
                                    <input type="email" placeholder="" />
                                    <label>Phone Number</label>
                                    <input type="text" placeholder="" />
                                    <label>Password</label>
                                    <input type="password" placeholder="" />
                                    <label>Confirm Password</label>
                                    <input type="password" placeholder="" />
                                    <input type="button" value="Register Now" onClick={e => { console.log("hel") }} />
                                </form>
                            </div> : <div>
                                <strong>
                                    <h1>Log In</h1>
                                    <h4>Welcome Back !</h4>
                                </strong>
                                <form>
                                    <label>Email</label>
                                    <input type="email" placeholder="" onChange={e => loginUser.email = e.target.value} />
                                    <label>Password</label>
                                    <input type="password" placeholder="" onChange={e => loginUser.password = e.target.value} />
                                    <input type="button" value="Log In" onClick={e => login()} />
                                </form>
                            </div>}
                        </div>

                    </div> </div>
            </div>
        </div>



    );
}

export default Register;

