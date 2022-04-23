import "./navbar.css"

import {
    Link, useParams
} from 'react-router-dom';
import React from "react";

function test(para){
    console.log(para)
}

function buttonColour(path,currentRoute){
    let color = path == "/" + currentRoute ? 'red' : 'black'
    return color
}

const Navbar = () => {
    let [color,setColor] = React.useState('none');
    const pathname = window. location. pathname
    const routes = ['goal','register','home','login']
    test(buttonColour(pathname,"register"));
    return (
        
        <div class="navigation">
            <nav class="navbar navbar-expand-lg  sticky-lg-top navbar-dark bg-dark">

                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Navbar</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav">
                            {routes.map((route)=>(
                                <Link to={route}>
                                <button type="button" class="btn">{route}</button>
                            </Link>
                            ))}
                            
                        </div>
                    </div>
                </div>

            </nav>
        </div>
    );
}

export default Navbar;