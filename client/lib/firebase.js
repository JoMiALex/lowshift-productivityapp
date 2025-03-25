// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
import { 
  getFirestore, 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  updateDoc, 
  doc, 
  Timestamp,
  DocumentData,
  QueryDocumentSnapshot 
} from "firebase/firestore";
// import { getFirestore } from "firebase/firestore";  //collection, query, where, getDocs, addDoc, updateDoc, doc, Timestamp
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbbFkiIypZg1aIZChg7DjZHqiDup_xjVA",
  authDomain: "low-shift-test.firebaseapp.com",
  projectId: "low-shift-test",
  storageBucket: "low-shift-test.firebasestorage.app",
  messagingSenderId: "1047240394097",
  appId: "1:1047240394097:web:85653f397eee874f1f62d0",
  measurementId: "G-L7SP031EHS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);

export { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  updateDoc, 
  doc, 
  Timestamp,
  // DocumentData,
  QueryDocumentSnapshot 
};