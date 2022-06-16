import "../styles/profile.css"
import React from "react";
import { Input, TextField } from "@mui/material";

import { useEffect, useState, useContext } from "react";
import { UserContext } from '../userContext'

import { auth, db } from "../components/firebase";
const Profile = () => {

    const { user, setUser } = useContext(UserContext);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userOccupation, setUserOccupation] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userRole, setUserRole] = useState('');
    useEffect(() => {

        db.collection("users").doc(user.email).get().then((doc) => {
            var data = doc.data()
            
            setUserName(data.displayName)
            setUserEmail(user.email)
            setUserOccupation(data.occupation)
            setUserPhone(data.phoneNumber)
            setUserRole(data.role)

        })
        console.log("role"+userRole)
    }, []);

    const [enableEdit, setEdit] = React.useState(true)
    



    function saveProfile() {

        db.collection("users").doc(user.email).get().then((doc) => {
            console.log("in register js " + doc.data().role)
            //userRole[1](doc.data().role)
        })
        db.collection("users").doc(user.email).update({
                displayName : userName,
                occupation : userOccupation,
                phoneNumber : userPhone
        }).catch((error)=>{
            console.log("update error : "+error.message)
        })
        setEdit(!enableEdit)
        //setUser(newUserProfile)
    }
    return (
        <div className="registerContainer" style={{ paddingTop: '20px' }}>

            <div class="row">

                <div class="col">
                    <div className='signup' style={{ backgroundColor: "#d9d9d9" }}>

                        <div className='signupbox' style={{ backgroundColor: "#d9d9d9" }}>
                            <div>
                                <strong>
                                    <h1>Your Profile</h1>
                                    <img src="https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png" width="100" height="100" alt="profilePicture" style={{ marginRight: '10px' }} />
                                </strong>
                                <form>
                                    <label>Name</label>
                                    <TextField
                                        onChange={(newValue) => setUserName(newValue.target.value)}
                                        variant="standard"
                                        //defaultValue={"Def"}
                                        value={userName}
                                        sx={{ mb: 2 }}
                                        fullWidth
                                        disabled={enableEdit}
                                    />
                                    
                                    <label>Email</label>
                                    <TextField
                                        onChange={(newValue) => setUserEmail(newValue.target.value)}
                                        variant="standard"
                                        //defaultValue={"Def"}
                                        value={userEmail}
                                        sx={{ mb: 2 }}
                                        fullWidth
                                        disabled={true}
                                    />
                                    <label>Phone Number</label>
                                    <TextField
                                        onChange={(newValue) => setUserPhone(newValue.target.value)}
                                        variant="standard"
                                        //defaultValue={"Def"}
                                        value={userPhone}
                                        sx={{ mb: 2 }}
                                        fullWidth
                                        disabled={enableEdit}
                                    />
                                    <label>Occupation</label>
                                    <TextField
                                        onChange={(newValue) => setUserOccupation(newValue.target.value)}
                                        variant="standard"
                                        //defaultValue={"Def"}
                                        value={userOccupation}
                                        sx={{ mb: 2 }}
                                        fullWidth
                                        disabled={enableEdit}
                                    />
                                     <label>Role</label>
                                    <TextField
                                        onChange={(newValue) => setUserRole(newValue.target.value)}
                                        variant="standard"
                                        //defaultValue={"Def"}
                                        value={userRole}
                                        sx={{ mb: 2 }}
                                        fullWidth
                                        disabled={true}
                                    />

                                    <div className="row profile">
                                        <div className="col">
                                            <input type="button" value="Save" disabled={enableEdit} onClick={e => { saveProfile() }} />
                                        </div>
                                        <div className="col">
                                            <input type="button" value="Edit" disabled={!enableEdit} onClick={e => { setEdit(!enableEdit) }} />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div> </div>
            </div>
        </div>
    );
}

export default Profile;
