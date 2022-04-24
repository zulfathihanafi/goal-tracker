import "./navbar.css"
import Navbar from 'react-bootstrap/Navbar'
import {
    Link, useParams, useNavigate
} from 'react-router-dom';
import React from "react";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
function test(para) {
    console.log(para)
}

function buttonColour(path, currentRoute) {
    let color = path == "/" + currentRoute ? 'red' : 'none'
    return color
}

const NavigationBar = ({user}) => {
    let [color, setColor] = React.useState('none');
    const pathname = window.location.pathname
    const routes = ['home']
    test(buttonColour(pathname, "register"));
    let navigate = useNavigate()
    function logout(){
        user[1](undefined)
        navigate(`/register`)
    }
    return (
        <div>

            <div class="navigation" >
                <nav class="navbar navbar-expand-lg  sticky-lg-top navbar-dark bg-dark">

                    <div class="container-fluid">
                        <a class="navbar-brand" href="/home">
                            <img src="https://www.nicepng.com/png/full/95-955233_icon-free-download-png-svg-free-download-goal.png" width="50" height="50" alt="" style={{ marginRight: '10px' }} />
                            <strong>Goal Tracker</strong>
                        </a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div class="navbar-nav">
                                {routes.map((route) => (
                                    <Link to={route}>
                                        <button type="button" class="btn">{route}</button>
                                    </Link>
                                ))}

                            </div>
                        </div>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                <img src="https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png" width="30" height="30" alt="" style={{ marginRight: '10px' }} />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={e=>{navigate(`/profile`)}}>Profile</Dropdown.Item>
                                <Dropdown.Item onClick={e=>{logout()}}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                </nav>
            </div >
        </div>

    );
}

export default NavigationBar;