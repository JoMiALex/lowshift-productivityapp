"use client";

import React, { useEffect, useState } from 'react';
import './tcStyle.css';
import { db } from './../../../lib/firebase';
import { doc, collection, setDoc, getDocs, Timestamp, query, where, orderBy, limit } from "firebase/firestore";
import { getAuth } from "firebase/auth";

type ClockingSession = {
  id: string;
  employ_id: string;
  start: Timestamp;
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

    const employ_id = user.uid;
    const clockingRef = collection(db, 'clocking');
    const q = query(
      clockingRef,
      where('employ_id', '==', employ_id),
      orderBy('start', 'desc'),
      limit(1)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const data = doc.data();

      const sessionData: ClockingSession = {
        id: doc.id,
        employ_id: data.employ_id || employ_id,
        start: data.start || Timestamp.now(),
        end: data.end || null,
        pay_code: data.pay_code || 'Regular',
        hours: data.hours || null,
      };

      setSession(sessionData);
      setCurrentState(data.end === null ? 'clockedIn' : 'idle');
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

    const employ_id = user.uid;
    const clockingRef = collection(db, 'clocking');
    const newSessionRef = doc(clockingRef);

    const newSession: ClockingSession = {
      id: newSessionRef.id,
      employ_id,
      start: Timestamp.now(),
      end: null,
      pay_code: payCode,
      hours: null,
    };

    await setDoc(newSessionRef, newSession);
    setSession(newSession);
    setCurrentState('clockedIn');
  };

  const handleClockOut = async () => {
    if (!user || !session || !session.start) return;

    const sessionRef = doc(db, 'clocking', session.id);
    const endTime = Timestamp.now();
    const workHours = calculateHours(session.start, endTime);

    const updatedSession = {
      ...session,
      end: endTime,
      hours: workHours,
    };

    await setDoc(sessionRef, updatedSession);
    setSession(updatedSession);
    setCurrentState('idle');
  };

  const handleBreakIn = async () => {
    if (!user || !session || !session.start) return;

    const sessionRef = doc(db, 'clocking', session.id);

    const breakTime = Timestamp.now();
    const workHours = calculateHours(session.start, breakTime);

    const updatedSession = {
      ...session,
      end: breakTime,
      hours: workHours,
    };

    await setDoc(sessionRef, updatedSession);
    setSession(updatedSession);
    setCurrentState('onBreak');
  };

  const handleEndBreak = async () => {
    if (!user || currentState !== 'onBreak') return;

    const employ_id = user.uid;
    const clockingRef = collection(db, 'clocking');
    const newSessionRef = doc(clockingRef);

    const newSession: ClockingSession = {
      id: newSessionRef.id,
      employ_id,
      start: Timestamp.now(),
      end: null,
      pay_code: payCode,
      hours: null,
    };

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