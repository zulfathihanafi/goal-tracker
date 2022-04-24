import 'bootstrap/dist/css/bootstrap.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import logo from './logo.svg';
import './App.css';
import Register from './pages/register';
import Nonhabitual from './pages/goal_nonhabitual';
import NavigationBar from './components/navbar';
import Home from './pages/home'
import Login from './pages/login';
import Test from './pages/test';
import Habitual from './pages/goal_habitual';
import Finance from './pages/goal_finance';
import Profile from './pages/profile';
import { financial,work } from './data/goals';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import React, { Component, useEffect, useState } from 'react';

function App() {

  //let navigate = useNavigate();
  const [user, setUser] = useState(undefined)
  // useEffect(() => {
  //   if(user == undefined){
  //     navigate(`/Register`);
  //   }
  // }, [user])
  return (

    <Router>


      <div style={{backgroundColor:"#d9d9d9"}} >
        {user ? <NavigationBar user={[user,setUser]} /> : <div></div>}
        <Routes>

          <Route exact path='/goal/:id' element={<Nonhabitual work={work} />}>
            
          </Route>
          <Route exact path='/goal2' element={<Habitual  />}></Route>
          <Route exact path='/goal3/:id' element={<Finance financial={financial} />}></Route>
          <Route exact path='/register' element={<Register user={[user,setUser]} />}></Route>
          <Route exact path='/home' element={<Home />}></Route>
          <Route exact path='/login' element={<Login  />}></Route>
          <Route exact path='/profile' element={<Profile  />}></Route>
          <Route exact path='/test' element={<Test />}></Route>
        </Routes>

      </div>
    </Router>
  );
}

export default App;
