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
import Notifications from "react-notifications-menu";
import moment from "moment";

const NavigationBar = () => {
    const DEFAULT_NOTIFICATION = {
        image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwDyJ6gJ2WhDUtv-ESOw2SgDJUG4vGixGexQ&usqp=CAU",
        message: "Notification one.",
        detailPage: "/events",
        receivedTime: "12h ago"
    };
    const { user, setUser, userRole, setUserRole } = useContext(UserContext);
    const [imageUrl, setImageUrl] = useState('');
    const [data, setData] = useState([DEFAULT_NOTIFICATION]);
    const [notifications, setNotifications] = useState([])


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
        if (user) {
            var dbRef = db.collection('users').doc(user.email).collection('Notification').orderBy("timestampDue","desc").where("timestampDue","<=",Date.now())
            dbRef.onSnapshot(snapshot => {
                setNotifications(snapshot.docs.map(doc => ({
                    image: doc.data().goalType != 'work' ? ("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwDyJ6gJ2WhDUtv-ESOw2SgDJUG4vGixGexQ&usqp=CAU"):("data:image/png;base64,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"),
                    message: doc.data().message,
                    detailPage: doc.data().goalType != 'work' ?(`goal3/${doc.data().menteeEmail}/${doc.data().goalID}`):(`goal/${doc.data().menteeEmail}/${doc.data().goalID}`),
                    receivedTime: moment(doc.data().timestampDue).fromNow(),
                    view : doc.data().view
                })));
            })
        }

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
                            <Notifications
                                data={notifications}
                                header={{
                                    title: "Notifications",
                                    option: { text: "View All", onClick: () => console.log("Clicked") }
                                }}
                                markAsRead={(data) => {
                                    console.log(data);
                                }}
                                
                            />
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