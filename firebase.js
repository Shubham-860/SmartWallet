// Import the functions you need from the SDKs you need
import firebase from "firebase/compat";
import {getDatabase} from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDyGoPXhwwOqTEWaFe6EwJf_jAyrtYjveo",
    authDomain: "smartwallet-860.firebaseapp.com",
    databaseURL: "https://smartwallet-860-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "smartwallet-860",
    storageBucket: "smartwallet-860.appspot.com",
    messagingSenderId: "241693684212",
    appId: "1:241693684212:web:49d334174c517adcf309a1",
    measurementId: "G-BTNDQ38YX8"
};

// Initialize Firebase
let app;
if (!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}
const auth = firebase.auth()
const db = getDatabase();
export {auth, firebase, db};
