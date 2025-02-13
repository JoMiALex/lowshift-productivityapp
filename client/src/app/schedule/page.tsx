import type { WeekSchedule } from "@/app/schedule/schedule"
import ScheduleView from "@/app/schedule/ScheduleView"

export default function SchedulePage() {
    // Placeholder shifts...
    const scheduleData: WeekSchedule = {
        startDate: new Date("2025-02-12"),
        days: [],
    }

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-4">
                <ScheduleView schedule={scheduleData} />
            </main>
        </div>
    )
}

