import type { WeekSchedule } from "@/app/schedule/schedule"
import React, { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { formatDate, getWeekRange, getNextWeek, getPreviousWeek, getStartOfWeek, getEndOfWeek } from "./schedule"

interface ScheduleViewProps {
  schedule: WeekSchedule
  initialDate?: Date
  onWeekChange?: (newDate: Date) => void
}

export default function ScheduleView({ schedule, initialDate = new Date(), onWeekChange, ...props  }: ScheduleViewProps) {
  
  // States for current date and calendar
  const [currentDate, setCurrentDate] = useState<Date>(initialDate)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date(currentDate))

  // Reference to handle outside clicks for dropdown
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside clicks
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Get start of month
  const getStartOfMonth = (date: Date) => {
    const result = new Date(date)
    result.setDate(1)
    result.setHours(0, 0, 0, 0)
    return result
  }

  // Get end of month
  const getEndOfMonth = (date: Date) => {
    const result = new Date(date)
    result.setMonth(result.getMonth() + 1)
    result.setDate(0)
    result.setHours(23, 59, 59, 999)
    return result
  }

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

