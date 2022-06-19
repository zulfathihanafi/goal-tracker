import { useEffect, useState,useContext} from "react";
import { UserContext } from '../userContext'
import { Navigate, useNavigate } from 'react-router-dom';
import { auth, db } from "../components/firebase";
import "../styles/register.css";
import logo from './logo2.jpg';

const Register = () => {
    const {user,setUser,userRole,setUserRole} = useContext(UserContext);
    let navigate = useNavigate();
    const [chooseForm, setForm] = useState('login')
    const [chooseRegisterColor, setRegisterColor] = useState("#d9d9d9")
    const [chooseLoginColor, setLoginColor] = useState("white")

    const [chooseRegisterBorder, setRegisterBorder] = useState("none")
    const [chooseLoginBorder, setLoginBorder] = useState("solid")
    const color = ["#d9d9d9", 'white']
    const border = ['solid', 'black']
    const [role, setRole] = useState('');

    const handleChange = (event) => {
        setRole(event.target.value);
    };

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

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                //user has logged in
                
                console.log(authUser);
                setUser(auth)
                //user[1](authUser)
                db.collection("users").doc(authUser.email).get().then((doc) => {
                    console.log("in register js " + doc.data().role)
                    //userRole[1](doc.data().role)
                })
                navigate(`/home`)
                if (authUser.displayName) {
                    //dont update username
                } else {
                    //if we just created someone
                    return authUser.updateProfile({

                    });
                }
            } else {
                //user logged out

            }
        })

        return () => {
            //perform some cleanup actions
            unsubscribe();
        }
    }, []);


    const [loginUser, setLoginUser] = useState({ email: '', password: '', role: '' })
    const [registerUser, setRegisterUser] = useState({ name: '', email: '',occupation:'', phone: '', password: '', rpassword: '', role: 'Mentee' })
    const signIn = (event) => {
        event.preventDefault();

        auth
            .signInWithEmailAndPassword(loginUser.email, loginUser.password)
            .then(
            )
            .catch((error) => alert(error.message));

    }
    const signUp = (event) => {
        event.preventDefault();

        auth
            .createUserWithEmailAndPassword(registerUser.email, registerUser.password)
            .then((authUser) => {
                
                authUser.user.updateProfile({
                    displayName: registerUser.name,
                    
                })

                db.collection("users").doc(registerUser.email).set({

                    displayName: registerUser.name,
                    phoneNumber: registerUser.phone,
                    role: registerUser.role,
                    occupation: registerUser.occupation,
                    imageUrl : ''
                })
                setUserRole(registerUser.role)
            })
            .catch((error) => alert(error.message));


    }

    return (
        <body class='registerBody'>
            <div class="row">
                <div className="col-1">
                    <img src={logo} alt="Goal Tracker Logo" style={{ height: '150px', width: '150px' }} />
                </div>
                <div className="col-1">
                    <h2 className="welcomeTitle" style={{ color: 'white', borderRadius: '5px', paddingTop: '50px', paddingLeft: '0px', marginLeft: '0px' }}>goaltracker</h2>
                </div>
            </div>
            <div className="registerContainer" style={{ paddingTop: '10px' }}>
                <div class="row">
                    <div className="col-5">
                        <h2 style={{ color: 'white', fontSize: '100px', textAlign: 'left' }}>Welcome <br />to the<br /> Goal Tracker!</h2>

                    </div>
                    <div className="col-1"></div>
                    <div class="col-6">
                        <div className='signup' style={{ backgroundColor: "white", border: '1px solid black' }}>
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
                            <div className='signupbox' style={{ backgroundColor: "white" }}>
                                {chooseForm == "register" ? <div>
                                    <strong>
                                        <h1>Register</h1>
                                        <h4>It's free and only takes a minute</h4>
                                    </strong>
                                    <form>
                                        <label>Name</label>
                                        <input type="text" placeholder="" onChange={e => registerUser.name = e.target.value} />
                                        <label>Email</label>
                                        <input type="email" placeholder="" onChange={e => registerUser.email = e.target.value} />
                                        <label>Phone Number</label>
                                        <input type="text" placeholder="" onChange={e => registerUser.phone = e.target.value} />
                                        <label>Occupation</label>
                                        <input type="text" placeholder="" onChange={e => registerUser.occupation = e.target.value} />
                                        <label>Password</label>
                                        <input type="password" placeholder="" onChange={e => registerUser.password = e.target.value} />
                                        <label>Confirm Password</label>
                                        <input type="password" placeholder="" onChange={e => registerUser.rpassword = e.target.value} />
                                        <label>Role </label>
                                        <select name="role" id="role" onChange={e => registerUser.role = e.target.value}>
                                            <option value="Mentee">Mentee</option>
                                            <option value="Mentor">Mentor</option>
                                        </select>
                                        <input type="button" value="Register Now" onClick={signUp} />
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
                                        {/* <label>Role </label>
                                        <select name="role" id="role" onChange={(e) => 
                                            {registerUser.role = e.target.value 
                                            //userRole = e.target.value
                                            }}>
                                            <option value="mentee">Mentee</option>
                                            <option value="mentor">Mentor</option>
                                        </select> */}
                                        <input type="button" value="Log In" onClick={signIn} />
                                    </form>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>


    );
}

export default Register;

