import 'bootstrap/dist/css/bootstrap.css';
import logo from './logo.svg';
import './App.css';
import Register from './pages/register';
import Nonhabitual from './pages/nonhabitual';
import Navbar from './components/navbar';
import Home from './pages/Home'
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
            <Route exact path='/' element={<Nonhabitual />}></Route>
            <Route exact path='/register' element={<Register />}></Route>
            <Route exact path='/home' element={<Home />}></Route>
          </Routes>

        </div>
      </Router>
    );
  }
}
export default App;
