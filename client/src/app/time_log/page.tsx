'use client'
import React, { useState, useEffect } from 'react';
import { TimeLogEntry } from './TimeLog'; // Adjust path as needed

const TimeLog = () => {
    const [currentStartDate, setCurrentStartDate] = useState(new Date());
    const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [entries, setEntries] = useState<TimeLogEntry[]>([]);
    const [loading, setLoading] = useState(false);
    const [payCodes, setPayCodes] = useState<string[]>([]);

    const getWeekDates = (date: Date) => {
        const currentDay = date.getDay();
        const sunday = new Date(date);
        sunday.setDate(date.getDate() - currentDay);
        const saturday = new Date(sunday);
        saturday.setDate(sunday.getDate() + 6);
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
//try using only one date (start) as a parameter to connect to hours
    const fetchTimeLogEntries = async (start: Date, end: Date): Promise<TimeLogEntry[]> => {
        try {
        const params = new URLSearchParams({
            startDate: start.toISOString(),
            endDate: end.toISOString()
        });
      
        const response = await fetch(`/time_log/api?${params.toString()}`);
      
        if (!response.ok) {
            console.error('Response status:', response.status);
        }
      
        const data: TimeLogEntry[] = await response.json();
        return data;
        } catch (error) {
        console.error('Error fetching time logs:', error);
        return [];
        }
    };

    const fetchPayCodes = async () => {
        try {
          const response = await fetch('/time_log/api?type=payCodes');
          
          if (!response.ok) {
            throw new Error('Failed to fetch pay codes');
          }
          
          const codes = await response.json();
          return codes;
        } catch (error) {
          console.error('Error fetching pay codes:', error);
        }
      };

    useEffect(() => {
        const loadTimeLogEntries = async () => {
            setLoading(true);
            const weekDates = getWeekDates(currentStartDate);
            const data = await fetchTimeLogEntries(weekDates.start, weekDates.end);   
            setEntries(data);
            setLoading(false);
        };
        
        loadTimeLogEntries();
        fetchPayCodes();
    }, [currentStartDate]); // This will reload data whenever the week changes

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

                {loading ? (
                    <div className="text-center p-10 text-black">Loading time logs...</div>
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
                            {dates.map((date, index) => {
                                // Filter entries for this specific date
                                const dayEntries = entries.filter(entry => {
                                    const entryDate = new Date(entry.start);
                                    return entryDate.getDate() === date.getDate() && 
                                          entryDate.getMonth() === date.getMonth() && 
                                          entryDate.getFullYear() === date.getFullYear();
                                });
                                
                                // Calculate daily total
                                const dailyTotal = dayEntries.reduce((sum, entry) => sum + entry.hours, 0);
                                
                                return (
                                    <tr key={index}>
                                        <td className="border border-gray-700 text-black p-3">
                                            {date.getDate()} {date.toLocaleDateString('en-US', { weekday: 'long' })}
                                        </td>
                                        <td className="border border-gray-700 text-black p-3">{dailyTotal.toFixed(2)}</td>
                                        {dayEntries.length > 0 ? (
                                            <>
                                                <td className="border border-gray-700 text-black p-3">
                                                    {dayEntries[0].pay_code}
                                                </td>
                                                <td className="border border-gray-700 text-black p-3">
                                                    {dayEntries[0].hours.toFixed(2)}
                                                </td>
                                                <td className="border border-gray-700 text-black p-3">
                                                    {dayEntries[0].comments || ""}
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td className="border border-gray-700 text-black p-3">Regular</td>
                                                <td className="border border-gray-700 text-black p-3">0.00</td>
                                                <td className="border border-gray-700 text-black p-3"></td>
                                            </>
                                        )}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default TimeLog;