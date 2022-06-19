import firebase from "firebase";
import 'firebase/storage';
var firebaseApp;

if (!firebase.apps.length) {
  firebaseApp = firebase.initializeApp({

  apiKey: "AIzaSyCIPHsZV5u-3SV52cRBe51Mz6KHm6wzxKk",

  authDomain: "goaltracker-5afae.firebaseapp.com",

  projectId: "goaltracker-5afae",

  storageBucket: "goaltracker-5afae.appspot.com",

  messagingSenderId: "138441413111",

  appId: "1:138441413111:web:fb5eb120508e2dc1a81ef2"

  });
}else {
   firebaseApp = firebase.app(); // if already initialized, use that one
}

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };