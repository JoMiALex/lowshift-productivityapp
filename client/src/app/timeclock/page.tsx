"use client";

import React, { useEffect, useState } from 'react';
import './tcStyle.css';
import { db } from './../../../lib/firebase';
import { doc, collection, setDoc, getDocs, Timestamp, query, orderBy, limit } from "firebase/firestore";
import { getAuth } from "firebase/auth";

type ClockingSession = {
  id: string;
  employee_id: string;
  start: Timestamp | null;
  end: Timestamp | null;
  pay_code: string;
  hours: number | null;
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
    const sessionsRef = collection(db, `clocking/${employee_id}/sessions`);
    const q = query(sessionsRef, orderBy("start", "desc"), limit(1));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const data = doc.data() as ClockingSession;
      setSession({ ...data, id: doc.id });

      if (data.end === null) {
        setCurrentState('clockedIn');
      } else {
        setCurrentState('idle');
      }
    } else {
      setSession(null);
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
    const sessionsRef = collection(db, `clocking/${employee_id}/sessions`);
    const newSessionRef = doc(sessionsRef);

    const newSession: ClockingSession = {
      id: newSessionRef.id,
      employee_id,
      start: Timestamp.now(),
      end: null,
      pay_code: payCode,
      hours: null
    };

    // Create a new document for the session
    await setDoc(newSessionRef, newSession);

    setSession(newSession);
    setCurrentState('clockedIn');
  };

  const handleClockOut = async () => {
    if (!user || !session || session.start === null) return;

    const employee_id = user.uid;
    const sessionRef = doc(db, `clocking/${employee_id}/sessions`, session.id);

    const endTime = Timestamp.now();
    const workSeconds = endTime.seconds - session.start.seconds;
    const workHours = parseFloat((workSeconds / 3600).toFixed(2));

    const updatedSession = {
      ...session,
      end: endTime,
      hours: workHours
    };

    // Update the session document
    await setDoc(sessionRef, updatedSession);

    setSession(updatedSession);
    setCurrentState('idle');
  };

  const handleBreakIn = async () => {
    if (!user || !session || session.start === null) return;

    const employee_id = user.uid;
    const sessionRef = doc(db, `clocking/${employee_id}/sessions`, session.id);

    const breakTime = Timestamp.now();
    const workSeconds = breakTime.seconds - session.start.seconds;
    const workHours = parseFloat((workSeconds / 3600).toFixed(2));

    const updatedSession = {
      ...session,
      end: breakTime,
      hours: workHours
    };

    // Update the session document
    await setDoc(sessionRef, updatedSession);

    setSession(updatedSession);
    setCurrentState('onBreak');
  };

  const handleEndBreak = async () => {
    if (!user || currentState !== 'onBreak') return;

    const employee_id = user.uid;
    const sessionsRef = collection(db, `clocking/${employee_id}/sessions`);
    const newSessionRef = doc(sessionsRef);

    const newSession: ClockingSession = {
      id: newSessionRef.id,
      employee_id,
      start: Timestamp.now(),
      end: null,
      pay_code: payCode,
      hours: null
    };

    // Create a new document for the new session
    await setDoc(newSessionRef, newSession);

    setSession(newSession);
    setCurrentState('clockedIn');
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
            onClick={handleBreakIn}
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