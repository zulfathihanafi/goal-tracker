import "../styles/profile.css"
import React from "react";
import { Input } from "@mui/material";
import { mentee } from "../data/user";
const Profile = () => {

    const [enableEdit,setEdit] = React.useState(true)
    const [currentUser,setUser] = React.useState(mentee)
    function saveProfile(){
        setEdit(!enableEdit)
        let newUserProfile = mentee
        setUser(newUserProfile)
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
                                    <Input defaultValue={mentee[0].name} fullWidth disabled={enableEdit} onChange={e => {mentee[0].name =e.target.value}}/>
                                    
                                    <label>Email</label>
                                    <Input defaultValue={mentee[0].email} fullWidth disabled={enableEdit} onChange={e => {mentee[0].email =e.target.value}}/>
                                    <label>Phone Number</label>
                                    <Input defaultValue={mentee[0].phone} fullWidth disabled={enableEdit} onChange={e => {mentee[0].phone =e.target.value}}/>
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
