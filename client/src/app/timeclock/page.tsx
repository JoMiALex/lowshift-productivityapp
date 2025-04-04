"use client";

import React, { useEffect, useState } from 'react';
import './tcStyle.css';
import { db } from './tcFireBase';
import { doc, setDoc, getDoc, updateDoc, collection, addDoc, Timestamp } from "firebase/firestore";

const TimeClock: React.FC = () => {
    const [time, setTime] = useState(new Date());
    const [session, setSession] = useState<any>(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return { hours, minutes, seconds };
    };

    const { hours, minutes, seconds } = formatTime(time);

    // Fetch the session data for the day
    const fetchSession = async () => {
        const userId = "sampleUser1256"; // Replace with actual user ID
        const today = new Date().toISOString().split("T")[0];
        const ref = doc(db, "timeclock", `${userId}_${today}`);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
            setSession(docSnap.data());
        } else {
            setSession(null); // No session found for today
        }
    };

    useEffect(() => {
        fetchSession();
    }, []);

    // Clock In for a new shift
    const handleClockIn = async () => {
        const userId = "sampleUser1256"; // Replace with actual user ID
        const today = new Date().toISOString().split("T")[0];

        const ref = doc(db, "timeclock", `${userId}_${today}`);
        const shiftsRef = collection(ref, "shifts");

        const shiftData = {
            clockIn: Timestamp.now(),
            clockOut: null,
            breakStart: null,
            breakEnd: null,
            totalBreakTime: 0,
            totalWorkTime: 0,
        };

        // Create a new shift document
        const newShiftRef = await addDoc(shiftsRef, shiftData);

        // Update session state with new shift reference
        setSession((prevSession: any) => ({
            ...prevSession,
            shifts: [...(prevSession?.shifts || []), newShiftRef.id],
        }));

        alert("Clocked in!");
    };

    // Clock Out (for the last shift)
    const handleClockOut = async () => {
        if (!session || !session.shifts || session.shifts.length === 0) {
            alert("Please clock in first!");
            return;
        }

        const userId = "sampleUser1256"; // Replace with actual user ID
        const today = new Date().toISOString().split("T")[0];
        const ref = doc(db, "timeclock", `${userId}_${today}`);
        const shiftsRef = collection(ref, "shifts");

        const lastShiftId = session.shifts[session.shifts.length - 1];
        const lastShiftRef = doc(shiftsRef, lastShiftId);
        const lastShiftSnap = await getDoc(lastShiftRef);

        if (lastShiftSnap.exists()) {
            const shiftData = lastShiftSnap.data();

            if (shiftData.clockOut) {
                alert("You are already clocked out!");
                return;
            }

            // Calculate total work time
            const workDuration = Math.floor((Timestamp.now().seconds - shiftData.clockIn.seconds - shiftData.totalBreakTime * 60) / 60);

            // Update the shift document with clock-out time and work duration
            await updateDoc(lastShiftRef, {
                clockOut: Timestamp.now(),
                totalWorkTime: workDuration,
            });

            setSession((prevSession: any) => {
                return { ...prevSession, shifts: prevSession.shifts.slice(0, -1) }; // Remove the last shift (clocked out)
            });

            alert("Clocked out!");
        }
    };

    // Start Break for the last shift
    const handleStartBreak = async () => {
        if (!session || !session.shifts || session.shifts.length === 0) {
            alert("Please clock in first!");
            return;
        }

        const userId = "sampleUser1256"; // Replace with actual user ID
        const today = new Date().toISOString().split("T")[0];
        const ref = doc(db, "timeclock", `${userId}_${today}`);
        const shiftsRef = collection(ref, "shifts");

        const lastShiftId = session.shifts[session.shifts.length - 1];
        const lastShiftRef = doc(shiftsRef, lastShiftId);
        const lastShiftSnap = await getDoc(lastShiftRef);

        if (lastShiftSnap.exists()) {
            const shiftData = lastShiftSnap.data();

            if (shiftData.clockOut) {
                alert("You have already clocked out! Cannot start a break.");
                return;
            }

            if (shiftData.breakStart) {
                alert("You are already on break!");
                return;
            }

            // Start the break and update the shift document
            await updateDoc(lastShiftRef, {
                breakStart: Timestamp.now(),
            });

            setSession((prevSession: any) => {
                return { ...prevSession, shifts: prevSession.shifts }; // No change in shifts, just updating break time
            });

            alert("Break started!");
        }
    };

    // End Break for the last shift
    const handleEndBreak = async () => {
        if (!session || !session.shifts || session.shifts.length === 0) {
            alert("Please clock in first!");
            return;
        }

        const userId = "sampleUser1256"; // Replace with actual user ID
        const today = new Date().toISOString().split("T")[0];
        const ref = doc(db, "timeclock", `${userId}_${today}`);
        const shiftsRef = collection(ref, "shifts");

        const lastShiftId = session.shifts[session.shifts.length - 1];
        const lastShiftRef = doc(shiftsRef, lastShiftId);
        const lastShiftSnap = await getDoc(lastShiftRef);

        if (lastShiftSnap.exists()) {
            const shiftData = lastShiftSnap.data();

            if (shiftData.clockOut) {
                alert("You have already clocked out! Cannot end a break.");
                return;
            }

            if (!shiftData.breakStart) {
                alert("You are not on break!");
                return;
            }

            // End the break and calculate break time
            const breakDuration = Math.floor((Timestamp.now().seconds - shiftData.breakStart.seconds) / 60);

            // Update break time and break end
            await updateDoc(lastShiftRef, {
                breakEnd: Timestamp.now(),
                totalBreakTime: shiftData.totalBreakTime + breakDuration,
            });

            setSession((prevSession: any) => {
                return { ...prevSession, shifts: prevSession.shifts }; // No change in shifts, just updating break time
            });

            alert("Break ended!");
        }
    };

    return (
        <div className="clock-container">
            <div className="timeSettings">
                <div className="clock">
                    <div id="Date">{time.toDateString()}</div>
                    <ul>
                        <li id="hr">{hours}</li>
                        <li id="point">:</li>
                        <li id="min">{minutes}</li>
                        <li id="point">:</li>
                        <li id="sec">{seconds}</li>
                    </ul>
                </div>
            </div>
            <div className="button-container">
                <div className="top-buttons">
                    <button className="clock-button" id="clockIn" onClick={handleClockIn}>
                        <i className="fa-solid fa-clock"></i> Clock In
                    </button>
                    <button className="clock-button" id="clockOut" onClick={handleClockOut}>
                        <i className="fa-solid fa-right-from-bracket"></i> Clock Out
                    </button>
                </div>
                <div className="bottom-buttons">
                    <button className="clock-button" id="break" onClick={handleStartBreak}>
                        <i className="fa-solid fa-coffee"></i> Start Break
                    </button>
                    <button className="clock-button" id="endBreak" onClick={handleEndBreak}>
                        <i className="fa-solid fa-right-to-bracket"></i> End Break
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TimeClock;
