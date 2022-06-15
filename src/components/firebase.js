import firebase from "firebase";
import 'firebase/storage';
var firebaseApp;

if (!firebase.apps.length) {
  firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAHMzvsv2rzf6teZY2FUwM5DJslMzHXaTM",

  authDomain: "goaltracker-db8a4.firebaseapp.com",

  projectId: "goaltracker-db8a4",

  storageBucket: "goaltracker-db8a4.appspot.com",

  messagingSenderId: "168081621750",

  appId: "1:168081621750:web:03d985ba02e96ce80022d7"

  });
}else {
   firebaseApp = firebase.app(); // if already initialized, use that one
}

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };