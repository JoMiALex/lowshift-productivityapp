// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
  Timestamp 
} from "firebase/firestore";
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
const analytics = getAnalytics(app);
export const db = getFirestore(app);

// // Get time log entries for a specific week
export const getWeekTimeLogEntries = async (startDate, endDate) => {
  try {
    const clockingRef = collection(db, 'clocking');
    
    // Create a query against the collection
    const q = query(
      clockingRef,
      where('start', '>=', Timestamp.fromDate(startDate)),
      where('start', '<=', Timestamp.fromDate(endDate))
    );
    
    const querySnapshot = await getDocs(q);
    const entries = [];
    
    querySnapshot.forEach((doc) => {
      entries.push({
        id: doc.id,
        ...doc.data(),
        // Convert Firestore Timestamps to JavaScript Date objects
        start: doc.data().start.toDate(),
        end: doc.data().end.toDate()
      });
    });
    
    return entries;
  } catch (error) {
    console.error("Error getting time log entries:", error);
    return [];
  }
};

// Add a new time log entry
export const addTimeLogEntry = async (entry) => {
  try {
    const clockingRef = collection(db, 'clocking');
    
    // Convert JavaScript Date objects to Firestore Timestamps
    const entryWithTimestamps = {
      ...entry,
      start: Timestamp.fromDate(entry.start),
      end: Timestamp.fromDate(entry.end)
    };
    
    const docRef = await addDoc(clockingRef, entryWithTimestamps);
    return { id: docRef.id, ...entry };
  } catch (error) {
    console.error("Error adding time log entry:", error);
    throw error;
  }
};

// Update an existing time log entry
export const updateTimeLogEntry = async (id, entry) => {
  try {
    const docRef = doc(db, 'clocking', id);
    
    // Convert JavaScript Date objects to Firestore Timestamps if they exist
    const updates = { ...entry };
    if (entry.start) updates.start = Timestamp.fromDate(entry.start);
    if (entry.end) updates.end = Timestamp.fromDate(entry.end);
    
    await updateDoc(docRef, updates);
    return { id, ...entry };
  } catch (error) {
    console.error("Error updating time log entry:", error);
    throw error;
  }
};