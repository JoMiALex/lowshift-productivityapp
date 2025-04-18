import type { WeekSchedule } from "@/app/schedule/schedule"
import ScheduleView from "@/app/schedule/ScheduleView"
//import { initializeApp } from 'firebase/app'
//import { getFirestore } from 'firebase/firestore'

export default function SchedulePage() {

    // For changing the current week
    const handleWeekChange = (newDate: Date) => {
        //console.log("Week changed to:"), newDate)
    }

    // Placeholder shifts...
    const scheduleData: WeekSchedule = {
        startDate: new Date("2025-02-12"),
        days: [
            {
                date: new Date("2023-06-05"),
                shifts: [
                    {
                        id: "1",
                        employeeName: "John Doe",
                        start: new Date("2023-06-05T09:00:00"),
                        end: new Date("2023-06-05T17:00:00"),
                    },

                ],
            },
        ],
    }

    return (
        <div className="flex flex-col min-h-screen bg-emerald-900">
            <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
                <ScheduleView schedule={scheduleData} initialDate={new Date()} onWeekChange={handleWeekChange} />
            </main>
        </div>
    )
}

