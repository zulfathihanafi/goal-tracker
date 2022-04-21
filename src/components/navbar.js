import "./navbar.css"

import {
    Link
} from 'react-router-dom';

const Navbar = () => {
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
                            <Link to="/">
                                <button> Test</button>
                            </Link>
                            <Link to="/register">
                                <button type="button" class="btn btn-primary">Primary</button>
                            </Link>
                            <a class="nav-link" href="#">Pricing</a>

                        </div>
                    </div>
                </div>

            </nav>
        </div>
    );
}

export default Navbar;