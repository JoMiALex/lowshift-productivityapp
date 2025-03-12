"use client";

import React, { useEffect, useState } from 'react';
import './tcStyle.css';

const TimeClock: React.FC = () => {
    const [time, setTime] = useState(new Date());

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
                    <button className="clock-button" id="clockIn"><i className="fa-solid fa-clock"></i> Clock In</button>
                    <button className="clock-button" id="clockOut"><i className="fa-solid fa-right-from-bracket"></i> Clock Out</button>
                </div>
                <div className="bottom-buttons">
                    <button className="clock-button" id="break"><i className="fa-solid fa-coffee"></i> Start Break</button>
                    <button className="clock-button" id="endBreak"><i className="fa-solid fa-right-to-bracket"></i> End Break</button>
                </div>
            </div>
        </div>
    );
};

export default TimeClock;
