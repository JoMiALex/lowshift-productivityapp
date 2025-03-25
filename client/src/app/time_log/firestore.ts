import { 
  collection, 
  query, 
  where, 
  getDocs, 
  Timestamp,
  DocumentData,
  QueryDocumentSnapshot
} from "../../../lib/firebase";
import { db } from '../../../lib/firebase'; // Make sure this matches the first import path
import { TimeLogEntry } from './TimeLog';
  
// Get time log entries for a specific week
export const getWeekTimeLogEntries = async (startDate: Date, endDate: Date): Promise<TimeLogEntry[]> => {
  try {
    const clockingRef = collection(db, 'clocking');
    
    // Create a query against the collection
    const q = query(
      clockingRef,
      where('start', '>=', Timestamp.fromDate(startDate)),
      where('start', '<=', Timestamp.fromDate(endDate))
    );
    
    const querySnapshot = await getDocs(q);
    const entries: TimeLogEntry[] = [];
    
    // Inside your getWeekTimeLogEntries function in firestore.ts
querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
  const data = doc.data();
  entries.push({
    id: doc.id,
    ...data,
    pay_code: data.pay_code || 'Regular', // Provide a default if missing
    // Convert Firestore Timestamps to JavaScript Date objects
    start: data.start.toDate(),
    end: data.end.toDate(),
    hours: data.hours || 0, // Ensure hours is defined
    comments: data.comments || '' // Ensure comments is defined
  } as TimeLogEntry);
});
    
    return entries;
  } catch (error) {
    console.error("Error getting time log entries:", error);
    return [];
  }
};