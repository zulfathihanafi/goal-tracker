import { UserContext } from './userContext'
import 'bootstrap/dist/css/bootstrap.css';
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import './App.css';
import Register from './pages/register';
import Nonhabitual from './pages/goal_nonhabitual';
import NavigationBar from './components/navbar';
import Home from './pages/home'
import Finance from './pages/goal_finance';
import Profile from './pages/profile';
import WorkGoals from './pages/workgoals';
import FinancialGoals from './pages/financialgoals';
import HomeMentor from './pages/homementor';
import MenteeProfile from './pages/menteeprofile';
import Comments from './pages/comments';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link, Redirect
} from 'react-router-dom';
import React, { Component, useEffect, useState, useContext, useReducer } from 'react';
import { auth, db } from './components/firebase';

function App() {

  const [user, setUser] = useState(undefined);
  const [userRole, setUserRole] = useState(undefined);
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
  
  return (
    <Router>


      <div style={{ backgroundColor: "white" }} >
        <div><UserContext.Provider value={{user,setUser,userRole,setUserRole}}>
          {/* if user is available (Logged In)*/}
          {/* {user ?  : undefined} */}
          <NavigationBar />

          {user && userRole?<Routes>
            
            <Route exact path='/' element={<Register  />} />
            <Route exact path='/goal/:email/:id' element={<Nonhabitual  />} />
            
            <Route exact path='/goal3/:email/:id' element={<Finance />} />

            {/* This is home route */}
            {userRole == "Mentor" ?

              <Route exact path='/home' element={<HomeMentor />} />
              :
              <Route exact path='/home' element={<Home />} />
            }
            <Route exact path='/profile' element={<Profile />} />


            <Route exact path='/workgoals' element={<WorkGoals />} />
            <Route exact path='/financialgoals' element={<FinancialGoals />} />


            <Route exact path='/menteeprofile/:id' element={<MenteeProfile />} />
            <Route exact path='/comments' element={<Comments />} />
           
          
        </Routes>:
        <Routes>
            <Route exact path='/' element={<Register  />} />
        </Routes>}


         
          </UserContext.Provider>
        </div>


      </div>

    </Router>
  );
}

export default App;
