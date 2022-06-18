import "../styles/profile.css"
import React from "react";
import { Input, TextField } from "@mui/material";
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useEffect, useState, useContext } from "react";
import { UserContext } from '../userContext'

import { auth, storage, db } from "../components/firebase";
import ImageUpload from "../components/uploadImage";
const Profile = () => {

    const { user, setUser } = useContext(UserContext);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userOccupation, setUserOccupation] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userRole, setUserRole] = useState('');
    const [userImage, setUserImage] = useState('');

    // to upload image

    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [urlImage,setUrlImage] = useState('');
    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        //push to DB
        //if no image inserted, just post the caption
        if (image != null) {

            const uploadTask = storage.ref(`profilePicture/${image.name}`).put(image);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    //progress func
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(progress);
                },
                (error) => {
                    //Error func
                    console.log(error);
                    alert(error.message);
                },
                () => {
                    //complete func
                    storage
                        .ref("profilePicture")
                        .child(image.name)
                        .getDownloadURL()
                        .then(url => {
                            //post image inside db
                            // db.collection("users").doc(user.email).update({
                                
                            //     imageUrl: url
                                
                            // });
                            setUrlImage(url)

                            
                            setImage(null);
                        })
                }
            )
        } else {
           alert("Please enter an image")
        }
    };




    useEffect(() => {

        db.collection("users").doc(user.email).get().then((doc) => {
            var data = doc.data()

            setUserName(data.displayName)
            setUserEmail(user.email)
            setUserOccupation(data.occupation)
            setUserPhone(data.phoneNumber)
            setUserRole(data.role)
            setUserImage(data.imageUrl)

        })
        console.log("role" + userRole)
    }, []);

    const [enableEdit, setEdit] = React.useState(true)




    function saveProfile() {

        db.collection("users").doc(user.email).get().then((doc) => {
            console.log("in register js " + doc.data().role)
            //userRole[1](doc.data().role)
        })

        db.collection("users").doc(user.email).update({
            displayName: userName,
            occupation: userOccupation,
            phoneNumber: userPhone,
            // imageUrl: urlImage
        }).catch((error) => {
            console.log("update error : " + error.message)
        })
        if(urlImage != ''){
                db.collection("users").doc(user.email).update({
                    imageUrl: urlImage
                }).catch((error) => {
                    console.log("update error : " + error.message)
                })            
        }
        setProgress(0);
        setEdit(!enableEdit)//setUser(newUserProfile)
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
                                    <img 
                                    src= {userImage == '' ? "https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png" : userImage}
                                    width="100" height="100" alt="profilePicture" style={{ marginRight: '10px' }} />
                                </strong>

                                
                                <form>
                                {!enableEdit ?
                                    <div className="imageupload">
                                        <Typography variant="h6" sx={{ color: 'black', marginTop: '10px' }}>

                                        </Typography>
                                        <progress className="imageupload__progress" value={progress} max="100" />
                                        <input type="file" onChange={handleChange} />
                                        <Button onClick={handleUpload}>
                                            Upload
                                        </Button>
                                    </div>
                                    : undefined}
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
