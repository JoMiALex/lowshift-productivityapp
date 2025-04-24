'use client'
import type { WeekSchedule, ScheduleDay, Shift } from "@/app/schedule/schedule"
import ScheduleView from "@/app/schedule/ScheduleView"
import { useEffect, useState } from "react"
import { Timestamp } from "firebase/firestore";
import { fetchShiftsForWeek, getStartOfWeek, getEndOfWeek } from "./schedule"

export default function SchedulePage() {
    const [scheduleData, setScheduleData] = useState<WeekSchedule>({
        startDate: new Date(),
        days: []
    });

    // For changing the current week
    const handleWeekChange = async (newDate: Date) => {
        const weekStart = getStartOfWeek(newDate);
        const weekEnd = getEndOfWeek(newDate);

        const shifts = await fetchShiftsForWeek(weekStart, weekEnd);

        // Organize shifts by day of week (0=Sunday, 1=Monday, etc.)
        const days: ScheduleDay[] = Array(7).fill(0).map((_, index) => {
            const date = new Date(weekStart);
            date.setDate(date.getDate() + index);
            return {
                date,
                shifts: shifts.filter(shift => {
                    const startDate = shift.start instanceof Timestamp
                        ? shift.start.toDate()
                        : shift.start;
                    return startDate.getDay() === (index + 1) % 7;
                })
            };
        });

        setScheduleData({
            startDate: weekStart,
            days
        });
    }

    // Load initial data
    useEffect(() => {
        handleWeekChange(new Date());
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-emerald-900">
            <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
                <ScheduleView
                    schedule={scheduleData}
                    initialDate={new Date()}
                    onWeekChange={handleWeekChange}
                />
            </main>
        </div>
    )
}

