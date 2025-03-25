// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbbFkiIypZg1aIZChg7DjZHqiDup_xjVA",
  authDomain: "low-shift-test.firebaseapp.com",
  projectId: "low-shift-test",
  storageBucket: "low-shift-test.firebasestorage.app",
  messagingSenderId: "1047240394097",
  appId: "1:1047240394097:web:5887fdb6710d0ffc1f62d0",
  measurementId: "G-9D2XC6K8PT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);