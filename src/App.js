import 'bootstrap/dist/css/bootstrap.css';
import logo from './logo.svg';
import './App.css';
import Register from './pages/register';
import Nonhabitual from './pages/goal_nonhabitual';
import Navbar from './components/navbar';
import Home from './pages/home'
import Login from './pages/login';
import Test from './pages/test';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import React, { Component } from 'react';

class App extends Component {
  
  render() {
    var user = undefined
    
    return (
      
      <Router>
        <Navbar />
        <div >
          
          <Routes>
            <Route exact path='/goal' element={<Nonhabitual />}></Route>
            <Route exact path='/register' element={<Register />}></Route>
            <Route exact path='/home' element={<Home />}></Route>
            <Route exact path='/login' element={<Login />}></Route>
            <Route exact path='/test' element={<Test />}></Route>
          </Routes>

        </div>
      </Router>
    );
  }
}
export default App;
