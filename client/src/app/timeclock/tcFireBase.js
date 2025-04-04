import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, setDoc, getDoc, updateDoc, Timestamp } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbbFkiIypZg1aIZChg7DjZHqiDup_xjVA",
  authDomain: "low-shift-test.firebaseapp.com",
  projectId: "low-shift-test",
  storageBucket: "low-shift-test.firebasestorage.app",
  messagingSenderId: "1047240394097",
  appId: "1:1047240394097:web:da246542a0704d9e1f62d0",
  measurementId: "G-7ZW26Z8RMR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

