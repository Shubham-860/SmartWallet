// Import the functions you need from the SDKs you need
import firebase from "firebase/compat";
import {getDatabase} from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey : process.env.EXPO_PUBLIC_API_KEY,
    authDomain : process.env.EXPO_PUBLIC_AUTH_DOMAIN,
    databaseURL : process.env.EXPO_PUBLIC_DATABASE_URL,
    projectId : process.env.EXPO_PUBLIC_PROJECT_ID,
    storageBucket : process.env.EXPO_PUBLIC_STORAGE_BUCKET,
    messagingSenderId : process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
    appId : process.env.EXPO_PUBLIC_APP_ID,
    measurementId : process.env.EXPO_PUBLIC_MEASUREMENT_ID,
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
