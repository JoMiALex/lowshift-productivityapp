export interface TimeLogEntry {
  id?: string;
  start: Date;
  end: Date;
  hours: number;
  pay_code: string;
  comments?: string;
}
// // Add this to your TimeLog component
// const fetchTimeLogEntries = async (start: Date, end: Date) => {
//   try {
//     const params = new URLSearchParams({
//       startDate: start.toISOString(),
//       endDate: end.toISOString()
//     });
    
//     const response = await fetch(`/api/time-logs?${params}`);
    
//     if (!response.ok) {
//       throw new Error('Failed to fetch time logs');
//     }
    
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching time logs:', error);
//     return [];
//   }
// };

// // Add this to your component state
// const [entries, setEntries] = useState<TimeLogEntry[]>([]);
// const [loading, setLoading] = useState(false);

// // Add this useEffect to load data when the week changes
// useEffect(() => {
//   const loadTimeLogEntries = async () => {
//     setLoading(true);
//     const data = await fetchTimeLogEntries(weekDates.start, weekDates.end);
//     setEntries(data);
//     setLoading(false);
//   };
  
//   loadTimeLogEntries();
// }, [currentStartDate]); // Dependency on currentStartDate ensures it reloads when the week changes