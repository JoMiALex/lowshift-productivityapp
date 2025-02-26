// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "low-shift-test.firebaseapp.com",
  projectId: "low-shift-test",
  storageBucket: "low-shift-test.firebasestorage.app",
  messagingSenderId: "1047240394097",
  appId: "1:1047240394097:web:85653f397eee874f1f62d0",
  measurementId: "G-L7SP031EHS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);