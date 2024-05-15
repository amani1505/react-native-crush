import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {getAuth} from "firebase/auth";
// import {...} from "firebase/database";
import {getFirestore} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCQdhB0j23LTILILC5gCO5avrtL13ODYfA",
    authDomain: "roam-1dcb4.firebaseapp.com",
    projectId: "roam-1dcb4",
    storageBucket: "roam-1dcb4.appspot.com",
    messagingSenderId: "292075682021",
    appId: "1:292075682021:web:10ae6660f334f6d6ddbc0c",
    measurementId: "G-F09W5CQQ2M"
};

// const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
// export const FIREBASE_AUTH= getAuth(FIREBASE_APP)
