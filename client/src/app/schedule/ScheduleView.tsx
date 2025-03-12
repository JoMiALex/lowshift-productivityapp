import type { WeekSchedule } from "@/app/schedule/schedule"

interface ScheduleViewProps {
  schedule: WeekSchedule
}

export default function ScheduleView({ schedule }: ScheduleViewProps) {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {daysOfWeek.map((day, index) => (
          <div key={day} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gray-100 px-4 py-2 border-b">
              <h3 className="font-semibold text-lg text-black">{day}</h3>
            </div>
            <div className="p-4">
              {schedule.days[index]?.shifts.map((shift) => (
                <div key={shift.id} className="mb-2 p-2 bg-gray-50 rounded border">
                  <p className="font-semibold text-black">{shift.employeeName}</p>
                  <p className="text-sm text-gray-600">
                    {shift.start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -{" "}
                    {shift.end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

