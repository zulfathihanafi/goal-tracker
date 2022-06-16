// const [user, setUser] = useContext('undefined')
// const [userRole, setUserRole] = useState(undefined)

// useEffect(() => {
//   const unsubscribe = auth.onAuthStateChanged((authUser) => {
//     if (authUser) {
//       //user has logged in
//       console.log("in App js " + authUser.displayName);
//       setUser(authUser)
      
//       db.collection("users").doc(authUser.email).get().then((doc) => {
//         console.log("in register js " + doc.data().role)
//         setUserRole(doc.data().role)
//       })
//       if (authUser.displayName) {
//         //dont update username
//       } else {
//         //if we just created someone
//         return authUser.updateProfile({

//         });
//       }
//     } else {
//       //user logged out

//     }
//   })

//   return () => {
//     //perform some cleanup actions
//     unsubscribe();
//   }
// }, [user]);


// <Route exact path='/' element={<Register user={[user, setUser]} userRole={[userRole, setUserRole]} />} />
//               <Route exact path='/goal/:id' element={<Nonhabitual work={work} />} />
//               <Route exact path='/goal2' element={<Habitual />} />
//               <Route exact path='/goal3/:id' element={<Finance financial={financial} />} />

//               {/* This is home route */}
//               {userRole == "mentor" ?
//                 <Route exact path='/home' element={<HomeMentor userRole={userRole} />} />
//                 :
//                 <Route exact path='/home' element={<Home userEmail={user} userRole={userRole} />} />
//               }
//               <Route exact path='/profile' element={<Profile user={[user, setUser]} />} />


//               <Route exact path='/workgoals' element={<WorkGoals />} />
//               <Route exact path='/financialgoals' element={<FinancialGoals />} />


//               <Route exact path='/menteeprofile' element={<MenteeProfile />} />
//               <Route exact path='/comments' element={<Comments />} />
//               <Route exact path='/menteenonhabitual' element={<MenteeNonhabitual />} />