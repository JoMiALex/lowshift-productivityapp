"use client";

import React, { useEffect, useState } from 'react';
import './tcStyle.css';
import { db } from './../../../lib/firebase';
import { doc, setDoc, getDoc, updateDoc, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

type Shift = {
  start: Timestamp;
  end: Timestamp | null;
  breakstart: Timestamp | null;
  breakend: Timestamp | null;
  pay_code: string;
  hours: number | null;
};

type ClockingSession = {
  id: string;
  employee_id: string;
  date: string;
  shift: Shift[];
};

const TimeClock: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [time, setTime] = useState<Date | null>(null);
  const [session, setSession] = useState<ClockingSession | null>(null);
  const [currentState, setCurrentState] = useState<'idle' | 'clockedIn' | 'onBreak'>('idle');
  const [payCode, setPayCode] = useState<string>("regular");

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    setIsClient(true);
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    if (!isClient || !time) return { hours: '00', minutes: '00', seconds: '00', dateString: '' };
    return {
      hours: time.getHours().toString().padStart(2, '0'),
      minutes: time.getMinutes().toString().padStart(2, '0'),
      seconds: time.getSeconds().toString().padStart(2, '0'),
      dateString: time.toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      })
    };
  };

  const { hours, minutes, seconds, dateString } = formatTime();

  const fetchSession = async () => {
    if (!user) return;

    const employee_id = user.uid;
    const ref = doc(db, "clocking", employee_id);

    const docSnap = await getDoc(ref);

    if (docSnap.exists()) {
      const data = docSnap.data() as ClockingSession;
      setSession(data);

      const lastShift = data.shift[data.shift.length - 1];
      if (lastShift) {
        if (lastShift.end === null) {
          setCurrentState(lastShift.breakstart !== null && lastShift.breakend === null ? 'onBreak' : 'clockedIn');
        } else {
          setCurrentState('idle');
        }
      }
    } else {
      setSession({
        id: employee_id,
        employee_id,
        date: new Date().toISOString().split("T")[0],
        shift: []
      });
      setCurrentState('idle');
    }
  };

  useEffect(() => { if (isClient && user) fetchSession(); }, [isClient, user]);

  const calculateHours = (start: Timestamp, end: Timestamp): number => {
    return parseFloat(((end.seconds - start.seconds) / 3600).toFixed(2));
  };

  const handleClockIn = async () => {
    if (!user) return;

    const employee_id = user.uid;
    const ref = doc(db, "clocking", employee_id);

    const newShift: Shift = {
      start: Timestamp.now(),
      end: null,
      breakstart: null,
      breakend: null,
      pay_code: payCode,
      hours: null
    };

    await setDoc(ref, {
      employee_id,
      date: new Date().toISOString().split("T")[0],
      shift: [...(session?.shift || []), newShift]
    }, { merge: true });

    setCurrentState('clockedIn');
    fetchSession();
  };

  const handleClockOut = async () => {
    if (!user || !session || session.shift.length === 0) return;

    const employee_id = user.uid;
    const ref = doc(db, "clocking", employee_id);

    const updatedShifts = [...session.shift];
    const lastShift = updatedShifts[updatedShifts.length - 1];

    if (lastShift.end !== null) return;

    const endTime = Timestamp.now();
    let totalBreakSeconds = 0;

    if (lastShift.breakstart && lastShift.breakend) {
      totalBreakSeconds = lastShift.breakend.seconds - lastShift.breakstart.seconds;
    }

    const workSeconds = endTime.seconds - lastShift.start.seconds - totalBreakSeconds;
    const workHours = parseFloat((workSeconds / 3600).toFixed(2));

    lastShift.end = endTime;
    lastShift.hours = workHours;

    await updateDoc(ref, {
      shift: updatedShifts
    });

    setCurrentState('idle');
    fetchSession();
  };

  const handleStartBreak = async () => {
    if (!user || !session || currentState !== 'clockedIn') return;

    const employee_id = user.uid;
    const ref = doc(db, "clocking", employee_id);

    const updatedShifts = [...session.shift];
    const lastShift = updatedShifts[updatedShifts.length - 1];

    lastShift.breakstart = Timestamp.now();
    lastShift.breakend = null;

    await updateDoc(ref, {
      shift: updatedShifts
    });

    setCurrentState('onBreak');
    fetchSession();
  };

  const handleEndBreak = async () => {
    if (!user || !session || currentState !== 'onBreak') return;

    const employee_id = user.uid;
    const ref = doc(db, "clocking", employee_id);

    const updatedShifts = [...session.shift];
    const lastShift = updatedShifts[updatedShifts.length - 1];

    if (lastShift.breakstart === null || lastShift.breakend !== null) return;

    lastShift.breakend = Timestamp.now();

    try {
      await updateDoc(ref, {
        shift: updatedShifts
      });
      setCurrentState('clockedIn');
      fetchSession();
    } catch (error) {
      console.error("Error ending break:", error);
    }
  };

  return (
    <div className="clock-container">
      <div className="timeSettings">
        <div className="clock">
          {isClient ? (
            <>
              <div id="Date">{dateString}</div>
              <ul>
                <li id="hr">{hours}</li>
                <li>:</li>
                <li id="min">{minutes}</li>
                <li>:</li>
                <li id="sec">{seconds}</li>
              </ul>
            </>
          ) : (
            <div className="clock-loading">Loading time...</div>
          )}
        </div>
      </div>

      <div className="button-container">
        <div className="top-buttons">
          <button 
            className="clock-button" 
            id="clockIn" 
            onClick={handleClockIn}
            disabled={currentState !== 'idle'}
          >
            <i className="fa-solid fa-clock"></i> Clock In
          </button>
          <button 
            className="clock-button" 
            id="clockOut" 
            onClick={handleClockOut}
            disabled={currentState === 'idle'}
          >
            <i className="fa-solid fa-right-from-bracket"></i> Clock Out
          </button>
        </div>
        <div className="bottom-buttons">
          <button 
            className="clock-button" 
            id="break" 
            onClick={handleStartBreak}
            disabled={currentState !== 'clockedIn'}
          >
            <i className="fa-solid fa-coffee"></i> Start Break
          </button>
          <button 
            className="clock-button" 
            id="endBreak" 
            onClick={handleEndBreak}
            disabled={currentState !== 'onBreak'}
          >
            <i className="fa-solid fa-right-to-bracket"></i> End Break
          </button>
        </div>
      </div>

      <div className="status-indicator">
        Current Status: <span className={`status-${currentState}`}>
          {currentState === 'idle' ? 'Not Clocked In' : 
           currentState === 'clockedIn' ? 'On Shift' : 'On Break'}
        </span>
      </div>
    </div>
  );
};

export default TimeClock;