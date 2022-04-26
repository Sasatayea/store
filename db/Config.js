// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyEkeTObgIG60l4Hoc1aFTce1mrGQGXPs",
  authDomain: "database-ce78d.firebaseapp.com",
  databaseURL: "https://database-ce78d-default-rtdb.firebaseio.com",
  projectId: "database-ce78d",
  storageBucket: "database-ce78d.appspot.com",
  messagingSenderId: "382305010081",
  appId: "1:382305010081:web:c1bf2f7d691c39c53a0be0",
  measurementId: "G-SLQ0B51540"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
