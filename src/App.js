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
import React, { Component, useEffect, useState } from 'react';
import { auth, db } from './components/firebase';
import { Navigate, useNavigate } from 'react-router-dom';
function App() {

  //let navigate = useNavigate();
  const [user, setUser] = useState(undefined)
  const [userRole, setUserRole] = useState(undefined)

  // useEffect(() => {
  //   if(user == undefined){
  //     navigate(`/Register`);
  //   }
  // }, [user])
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in
        console.log("in App js " + authUser.displayName);
        setUser(authUser)
        db.collection("users").doc(authUser.email).get().then((doc) => {
          console.log("in register js " + doc.data().role)
          setUserRole(doc.data().role)
        })
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
  }, [user]);
  return (
    <Router>


      <div style={{ backgroundColor: "white" }} >
        <div>
          {/* if user is available (Logged In)*/}
          {user ? <NavigationBar user={[user, setUser]} userRole={[userRole, setUserRole]} /> : undefined}

          <Routes>

            <Route exact path='/' element={<Register user={[user, setUser]} userRole={[userRole, setUserRole]} />} />
            <Route exact path='/goal/:id' element={<Nonhabitual work={work} />} />
            <Route exact path='/goal2' element={<Habitual />} />
            <Route exact path='/goal3/:id' element={<Finance financial={financial} />} />
           
           {/* This is home route */}
            {userRole == "mentor" ?
              <Route exact path='/home' element={<HomeMentor userRole={userRole} />} />
              :
              <Route exact path='/home' element={<Home userRole={userRole} />} />
            }

            <Route exact path='/login' element={<Login />} />
            <Route exact path='/profile' element={<Profile />} />
            <Route exact path='/test' element={<Test />} />
            <Route exact path='/workgoals' element={<WorkGoals />} />
            <Route exact path='/financialgoals' element={<FinancialGoals />} />

           
            <Route exact path='/menteeprofile' element={<MenteeProfile />} />
            <Route exact path='/comments' element={<Comments />} />
            <Route exact path='/menteenonhabitual' element={<MenteeNonhabitual />} />
          </Routes>
        </div>


      </div>

    </Router>
  );
}

export default App;
