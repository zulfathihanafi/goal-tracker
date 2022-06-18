import React, { useState } from 'react'
import { storage, db } from './firebase';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

function ImageUpload({ email }) {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        //push to DB
        //if no image inserted, just post the caption
        if (image != null) {

            const uploadTask = storage.ref(`images/${image.name}`).put(image);

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
                            db.collection("users").doc(email).update({
                                
                                imageUrl: url
                                
                            });

                            setProgress(0);
                            setCaption("");
                            setImage(null);
                        })
                }
            )
        } else {
           
        }
    };

    return (
        
        <div className ="imageupload">
            <Typography variant="h6" sx={{ color: 'black', marginTop: '10px' }}>
                
            </Typography>
            <progress className ="imageupload__progress" value={progress} max="100" />
            <input type="file" onChange={handleChange} />
            <Button onClick={handleUpload}>
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload
