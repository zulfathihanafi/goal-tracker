import { UserContext } from './userContext'
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
import WorkGoals from './pages/workgoals';
import FinancialGoals from './pages/financialgoals';
import HomeMentor from './pages/homementor';
import MenteeProfile from './pages/menteeprofile';
import Comments from './pages/comments';
import MenteeNonhabitual from './pages/menteegoal_nonhabitual';
import { financial, work } from './data/goals';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link, Redirect
} from 'react-router-dom';
import React, { Component, useEffect, useState, useContext, useReducer } from 'react';
import { auth, db } from './components/firebase';
import { Navigate, useNavigate } from 'react-router-dom';


function App() {

  const [user, setUser] = useState(undefined);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in
        console.log("in App js " + authUser.displayName);
        setUser(authUser)
        
        db.collection("users").doc(authUser.email).get().then((doc) => {
          console.log("in register js " + doc.data().role)
          
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
  const userRole = "mentee";
  return (
    <Router>


      <div style={{ backgroundColor: "white" }} >
        <div><UserContext.Provider value={{user,setUser}}>
          {/* if user is available (Logged In)*/}
          {/* {user ?  : undefined} */}
          <NavigationBar />
          <Routes>
            
              <Route exact path='/' element={<Register  />} />
              <Route exact path='/goal/:id' element={<Nonhabitual work={work} />} />
              <Route exact path='/goal2' element={<Habitual />} />
              <Route exact path='/goal3/:id' element={<Finance financial={financial} />} />

              {/* This is home route */}
              {userRole == "mentor" ?

                <Route exact path='/home' element={<HomeMentor />} />
                :
                <Route exact path='/home' element={<Home />} />
              }
              <Route exact path='/profile' element={<Profile />} />


              <Route exact path='/workgoals' element={<WorkGoals />} />
              <Route exact path='/financialgoals' element={<FinancialGoals />} />


              <Route exact path='/menteeprofile' element={<MenteeProfile />} />
              <Route exact path='/comments' element={<Comments />} />
              <Route exact path='/menteenonhabitual' element={<MenteeNonhabitual />} />
            
          </Routes>
          </UserContext.Provider>
        </div>


      </div>

    </Router>
  );
}

export default App;
