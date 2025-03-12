import { 
    collection, 
    query, 
    where, 
    getDocs, 
    Timestamp 
  } from "firebase/firestore";
  import { db } from './firebase';
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
      
      querySnapshot.forEach((doc) => {
        entries.push({
          id: doc.id,
          ...doc.data(),
          // Convert Firestore Timestamps to JavaScript Date objects
          start: doc.data().start.toDate(),
          end: doc.data().end.toDate()
        } as TimeLogEntry);
      });
      
      return entries;
    } catch (error) {
      console.error("Error getting time log entries:", error);
      return [];
    }
  };
