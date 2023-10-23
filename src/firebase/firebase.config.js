import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC-GMGBsX-yXzQa59h2OlDZIeNEpoJT0CI",
    authDomain: "career-door-5b5c6.firebaseapp.com",
    projectId: "career-door-5b5c6",
    storageBucket: "career-door-5b5c6.appspot.com",
    messagingSenderId: "677920627026",
    appId: "1:677920627026:web:edab4875bf9f5949c3c28b"
};

// Initialize Firebase
// This is the security key of firebase. That's why it's need to be very secured
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;