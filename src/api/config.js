// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "firebase/app";
import {
    getFirestore
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCuNTR80GqBePie3qxjx5raAwJKUtQHH2o",
    authDomain: "e-commerce-9db0a.firebaseapp.com",
    projectId: "e-commerce-9db0a",
    storageBucket: "e-commerce-9db0a.appspot.com",
    messagingSenderId: "1071823990975",
    appId: "1:1071823990975:web:2dea94fa7177ec9429160a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Firestore
export const db = getFirestore(app);