'use client'
import React, { useState, useEffect } from 'react';
// import { getWeekTimeLogEntries, addTimeLogEntry, updateTimeLogEntry } from '../../../lib/firebase';
// import { getWeekTimeLogEntries, TimeLogEntry } from 'lib/firebase';
// import { initialize } from '../../../node_modules/next/dist/server/lib/render-server';

// import { getWeekTimeLogEntries, TimeLogEntry } from 'firestoreService';


// export interface TimeLogEntry {
//     id?: string;
//     start: Date;
//     end: Date;
//     hours: number;
//     pay_code: string;
//     comments?: string;
//   }

const TimeLog = () => {
    const [currentStartDate, setCurrentStartDate] = useState(new Date());
    const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    // const [timeLogEntries, setTimeLogEntries] = useState<TimeLogEntry[]>([]);
    // const [isLoading, setIsLoading] = useState(false);
    // const [editingEntry, setEditingEntry] = useState<{day: Number, entry: TimeLogEntry | null}>({ day: -1, entry: null});

    // const entriesByDate: Record<string, TimeLogEntry[]> = {};
    // timeLogEntries.forEach(entry => {
    //     const dateStr = entry.start.toDateString();
    //     if (!entriesByDate[dateStr]) {
    //         entriesByDate[dateStr] = [];
    //     }
    //     entriesByDate[dateStr].push(entry);
    // });


    const getWeekDates = (date: Date) => {
        const currentDay = date.getDay();
        const sunday = new Date(date);
        sunday.setDate(date.getDate() - currentDay);
        // sunday.setHours(0, 0, 0, 0);
        const saturday = new Date(sunday);
        saturday.setDate(sunday.getDate() + 6);
        // saturday.setHours(23, 59, 59, 999);
        return { start: sunday, end: saturday };
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const navigateWeek = (direction: number) => {
        const newDate = new Date(currentStartDate);
        newDate.setDate(newDate.getDate() + (direction * 7));
        setCurrentStartDate(newDate);
    };

    const selectDate = (date: Date) => {
        const weekDates = getWeekDates(date);
        setCurrentStartDate(weekDates.start);
        setShowCalendar(false);
    };

    // // Fetch time log entries when the week changes
    // useEffect(() => {
    //     async function fetchTimeLogEntries() {
    //         setIsLoading(true);
    //         try {
    //             const weekDates = getWeekDates(currentStartDate);
    //             const entries = await getWeekTimeLogEntries(weekDates.start, weekDates.end);
    //             setTimeLogEntries(entries);
    //         } catch (error) {
    //             console.error("Error fetching time log entries:", error);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     }

    //     fetchTimeLogEntries();
    // }, [currentStartDate]);

    // const getDailyTotal = (date: Date) => {
    //     const dateStr = date.toDateString();
    //     if(!entriesByDate[dateStr]) return 0;

    //     return entriesByDate[dateStr].reduce((total, entry) => total + entry.hours, 0);
    // };

    // const handleAddEntry = async (date: Date) => {
    //     // Create a new entry with default values
    //     const startHour = 9; // Default to 9 AM
    //     const endHour = 17;  // Default to 5 PM
        
    //     const start = new Date(date);
    //     start.setHours(startHour, 0, 0, 0);
        
    //     const end = new Date(date);
    //     end.setHours(endHour, 0, 0, 0);
        
    //     const hours = endHour - startHour;
        
    //     const newEntry: TimeLogEntry = {
    //         start,
    //         end,
    //         hours,
    //         pay_code: 'Regular',
    //         comments: ''
    //     };
        
    //     try {
    //         const addedEntry = await addTimeLogEntry(newEntry);
    //         setTimeLogEntries([...timeLogEntries, addedEntry]);
    //         setEditingEntry({ day: date.getDay(), entry: addedEntry });
    //     } catch (error) {
    //         console.error("Error adding entry:", error);
    //     }
    // };

    // const handleUpdateEntry = async (id: string, updates: Partial<TimeLogEntry>) => {
    //     try {
    //         await updateTimeLogEntry(id, updates);
            
    //         // Update the local state
    //         setTimeLogEntries(timeLogEntries.map(entry => 
    //             entry.id === id ? { ...entry, ...updates } : entry
    //         ));
            
    //         // Clear editing state
    //         setEditingEntry({ day: -1, entry: null });
    //     } catch (error) {
    //         console.error("Error updating entry:", error);
    //     }
    // };

    const renderCalendar = () => {
        const today = new Date();
        const currentMonth = currentCalendarDate.getMonth();
        const currentYear = currentCalendarDate.getFullYear();
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        const navigateMonth = (direction: number) => {
            const newDate = new Date(currentCalendarDate);
            newDate.setMonth(newDate.getMonth() + direction);
            setCurrentCalendarDate(newDate);
        };

        return (
            <div className="bg-white border border-gray-200 text-black rounded-lg shadow-lg p-4 w-[280px]">
                <div className="flex justify-between items-center mb-4">
                    <button 
                        onClick={() => navigateMonth(-1)}
                        className="p-2 rounded-full hover:bg-gray-100 text-black"
                    >←</button>
                    <h3 className="text-lg font-semibold text-black">
                        {currentCalendarDate.toLocaleString('default', { 
                            month: 'long', 
                            year: 'numeric' 
                        })}
                    </h3>
                    <button 
                        onClick={() => navigateMonth(1)}
                        className="p-2 rounded-full hover:bg-gray-100 text-black"
                    >→</button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    {weekdays.map(day => (
                        <div key={day} className="font-semibold">{day}</div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {[...Array(firstDay)].map((_, i) => (
                        <div key={`empty-${i}`} className="h-8" />
                    ))}
                    {[...Array(daysInMonth)].map((_, i) => {
                        const day = i + 1;
                        const isToday = day === today.getDate() && 
                            currentMonth === today.getMonth() && 
                            currentYear === today.getFullYear();
                        
                        return (
                            <button
                                key={day}
                                onClick={() => selectDate(new Date(currentYear, currentMonth, day))}
                                className={`h-8 rounded hover:bg-gray-100 ${
                                    isToday ? 'bg-gray-200 font-bold' : ''
                                }`}
                            >
                                {day}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    };

    const weekDates = getWeekDates(currentStartDate);
    const dates = [...Array(7)].map((_, i) => {
        const date = new Date(weekDates.start);
        date.setDate(weekDates.start.getDate() + i);
        return date;
    });

    // const getEntriesForDay = (date: Date) => {
    //     const dateStr = date.toDateString();
    //     return entriesByDate[dateStr] || [];
    // }

    // const renderEntriesForDay = (date: Date, dayIndex: number) => {
    //     const entries = getEntriesForDay(date);
        
    //     if (entries.length === 0) {
    //         return (
    //             <tr>
    //                 <td className="border border-gray-700 text-black p-3">
    //                     {date.getDate()} {date.toLocaleDateString('en-US', { weekday: 'long' })}
    //                 </td>
    //                 <td className="border border-gray-700 text-black p-3">0.00</td>
    //                 <td className="border border-gray-700 text-black p-3">
    //                     <button 
    //                         onClick={() => handleAddEntry(date)}
    //                         className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
    //                     >
    //                         Add Entry
    //                     </button>
    //                 </td>
    //                 <td className="border border-gray-700 text-black p-3">0.00</td>
    //                 <td className="border border-gray-700 text-black p-3"></td>
    //             </tr>
    //         );
    //     }

    //     return entries.map((entry, entryIndex) => (
    //         <tr key={entry.id || entryIndex}>
    //             {entryIndex === 0 && (
    //                 <td 
    //                     className="border border-gray-700 text-black p-3" 
    //                     rowSpan={entries.length}
    //                 >
    //                     {date.getDate()} {date.toLocaleDateString('en-US', { weekday: 'long' })}
    //                 </td>
    //             )}
    //             {entryIndex === 0 && (
    //                 <td 
    //                     className="border border-gray-700 text-black p-3" 
    //                     rowSpan={entries.length}
    //                 >
    //                     {getDailyTotal(date).toFixed(2)}
    //                 </td>
    //             )}
    //             <td className="border border-gray-700 text-black p-3">
    //                 {editingEntry.day === dayIndex && editingEntry.entry?.id === entry.id ? (
    //                     <select 
    //                         value={editingEntry.entry.pay_code}
    //                         onChange={(e) => setEditingEntry({
    //                             day: dayIndex,
    //                             entry: { ...editingEntry.entry!, pay_code: e.target.value }
    //                         })}
    //                         className="w-full p-1 border rounded"
    //                     >
    //                         <option value="Regular">Regular</option>
    //                         <option value="Overtime">Overtime</option>
    //                         <option value="Vacation">Vacation</option>
    //                         <option value="Sick">Sick</option>
    //                     </select>
    //                 ) : (
    //                     <span onClick={() => setEditingEntry({ day: dayIndex, entry })}>
    //                         {entry.pay_code}
    //                     </span>
    //                 )}
    //             </td>
    //             <td className="border border-gray-700 text-black p-3">
    //                 {editingEntry.day === dayIndex && editingEntry.entry?.id === entry.id ? (
    //                     <input 
    //                         type="number" 
    //                         value={editingEntry.entry.hours}
    //                         onChange={(e) => setEditingEntry({
    //                             day: dayIndex,
    //                             entry: { ...editingEntry.entry!, hours: parseFloat(e.target.value) }
    //                         })}
    //                         step="0.25"
    //                         min="0"
    //                         className="w-full p-1 border rounded"
    //                     />
    //                 ) : (
    //                     <span onClick={() => setEditingEntry({ day: dayIndex, entry })}>
    //                         {entry.hours.toFixed(2)}
    //                     </span>
    //                 )}
    //             </td>
    //             <td className="border border-gray-700 text-black p-3">
    //                 {editingEntry.day === dayIndex && editingEntry.entry?.id === entry.id ? (
    //                     <div className="flex gap-2">
    //                         <input 
    //                             type="text" 
    //                             value={editingEntry.entry.comments || ''}
    //                             onChange={(e) => setEditingEntry({
    //                                 day: dayIndex,
    //                                 entry: { ...editingEntry.entry!, comments: e.target.value }
    //                             })}
    //                             className="flex-1 p-1 border rounded"
    //                         />
    //                         <button 
    //                             onClick={() => {
    //                                 if (entry.id && editingEntry.entry) {
    //                                     handleUpdateEntry(entry.id, editingEntry.entry);
    //                                 }
    //                             }}
    //                             className="bg-green-500 text-white px-2 py-1 rounded"
    //                         >
    //                             Save
    //                         </button>
    //                     </div>
    //                 ) : (
    //                     <span onClick={() => setEditingEntry({ day: dayIndex, entry })}>
    //                         {entry.comments || ''}
    //                     </span>
    //                 )}
    //             </td>
    //         </tr>
    //     ));
    // };

    return (
        <div className="mt-20 mx-auto max-w-6xl">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex items-center justify-center gap-4 mb-8">
                    <button 
                        onClick={() => navigateWeek(-1)}
                        className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center hover:bg-gray-100 text-black"
                    >
                        ←
                    </button>
                    <div className="relative flex items-center">
                        <span className="font-bold text-lg text-black">
                            Week of {formatDate(weekDates.start)} - {formatDate(weekDates.end)}
                        </span>
                        <div className="relative inline-flex items-center">
                            <button 
                                onClick={() => setShowCalendar(!showCalendar)}
                                className="ml-2 w-10 h-10 rounded-full border-2 border-black flex items-center justify-center hover:bg-gray-100 text-black"
                            >
                                ▼
                            </button>
                            {showCalendar && (
                                <div className="absolute top-12 right-0 z-10">
                                    {renderCalendar()}
                                </div>
                            )}
                        </div>
                    </div>
                    <button 
                        onClick={() => navigateWeek(1)}
                        className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center hover:bg-gray-100 text-black"
                    >
                        →
                    </button>
                </div>

                {/* {isLoading ? (
                    <div className="text-center py-8">
                        <p className="text-black">Loading time log entries...</p>
                    </div>
                ) : (
                    <table className="w-full border-collapse border border-gray-700">
                        <thead>
                            <tr>
                                <th className="border border-gray-700 p-3 bg-gray-50 text-black">Days</th>
                                <th className="border border-gray-700 p-3 bg-gray-50 text-black">Daily Total</th>
                                <th className="border border-gray-700 p-3 bg-gray-50 text-black">Pay Code</th>
                                <th className="border border-gray-700 p-3 bg-gray-50 text-black">Hours</th>
                                <th className="border border-gray-700 p-3 bg-gray-50 text-black">Comments</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dates.map((date, index) => (
                                renderEntriesForDay(date, index)
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    ); */}

                <table className="w-full border-collapse border border-gray-700">
                    <thead>
                        <tr>
                            <th className="border border-gray-700 p-3 bg-gray-50 text-black">Days</th>
                            <th className="border border-gray-700 p-3 bg-gray-50 text-black">Daily Total</th>
                            <th className="border border-gray-700 p-3 bg-gray-50 text-black">Pay Code</th>
                            <th className="border border-gray-700 p-3 bg-gray-50 text-black">Hours</th>
                            <th className="border border-gray-700 p-3 bg-gray-50 text-black">Comments</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dates.map((date, index) => (
                            <tr key={index}>
                                <td className="border border-gray-700 text-black p-3">
                                    {date.getDate()} {date.toLocaleDateString('en-US', { weekday: 'long' })}
                                </td>
                                <td className="border border-gray-700 text-black p-3">0.00</td>
                                <td className="border border-gray-700 text-black p-3">Regular</td>
                                <td className="border border-gray-700 text-black p-3">0.00</td>
                                <td className="border border-gray-700 text-black p-3"></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TimeLog;