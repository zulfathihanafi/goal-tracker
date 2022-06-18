import "./navbar.css"
import Navbar from 'react-bootstrap/Navbar'
import { Link, useParams, useNavigate, NavLink } from 'react-router-dom';
import React from "react";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import logo from './logo2.jpg'
import { auth, db } from "./firebase";
import zul from './zul.jpg';
import { useEffect, useState, useContext } from "react";
import { UserContext } from '../userContext'


const NavigationBar = () => {
    const { user, setUser, userRole, setUserRole } = useContext(UserContext);
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                //user has logged in
                console.log("in App js " + authUser.displayName);
                setUser(authUser)

                db.collection("users").doc(authUser.email).get().then((doc) => {
                    console.log("in register js " + doc.data().role)
                    setUserRole(doc.data().role)
                    setImageUrl(doc.data().imageUrl)
                })

            } else {
                //user logged out

            }
        })

        return () => {
            //perform some cleanup actions
            unsubscribe();
        }
    }, [user]);

    let [color, setColor] = React.useState('none');
    const pathname = window.location.pathname
    const routes = ['HOME', 'WORKGOALS', 'FINANCIALGOALS']

    let navigate = useNavigate()
    function signOut() {
        auth.signOut().then(navigate(`/`)).catch((error) => alert(error.message))
        // user[1](null)
        // userRole[1](undefined)
        setUser(undefined)
        setUserRole(undefined)
    }
    if (user != null) {
        return (

            <div>
                <div class="navigation" >
                    <nav class="navbar navbar-expand-lg  sticky-lg-top navbar-dark">

                        <div class="container-fluid">
                            <a class="navbar-brand" href="/home">
                                <img src={logo} width="50" height="50" alt="" style={{ marginRight: '10px' }} />
                                <strong>goaltracker</strong>
                            </a>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                                <div class="navbar-nav">

                                    <Link to='./home'>
                                        <button type="button" class="btn">HOME</button>
                                    </Link>
                                    {userRole == "Mentee" ? 
                                    (
                                        <Link to='./workgoals'>
                                            <button type="button" class="btn">WORK GOALS</button>
                                        </Link>
                                    ) : 
                                    (undefined)
                                    }

                                    {userRole == "Mentee" ? 
                                    (<Link to='./financialgoals'>
                                        <button type="button" class="btn">FINANCIAL GOALS</button>
                                    </Link>) : 
                                    (undefined)}
                                    {userRole == "Mentor" ? 
                                    (<Link to='./comments'>
                                        <button type="button" class="btn">COMMENTS</button>
                                    </Link>) : 
                                    (undefined)}


                                </div>
                            </div>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    <img src={imageUrl == '' ? "https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png" : imageUrl} width="30" height="30" alt="" style={{ marginRight: '10px' }} />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={e => { navigate(`/profile`) }}>Profile</Dropdown.Item>
                                    <Dropdown.Item onClick={e => { signOut() }}>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>

                    </nav>
                </div >

            </div>

        );
    }

}

export default NavigationBar;