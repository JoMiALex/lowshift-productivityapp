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

  // Get days for complete calendar view
  const getCalendarDays = (date: Date): Date[] => {
    const result = []
    const firstDay = getStartOfMonth(date)
    const startDay = getEndOfWeek(firstDay)
    const endDay = getEndOfWeek(getEndOfMonth(date))

    for (let d = new Date(startDay); d <= endDay; d.setDate(d.getDate() + 1)) {
      result.push(new Date(d))
    }

    return result
  }

  // Check if date is in current month
  const isSameMonth = (date1: Date, date2: Date): boolean => {
    return date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear()
  }

  // Check if date is within interval
  const isWithinInterval = (date: Date, interval: { start: Date; end: Date }): boolean => {
    return date >= interval.start && date <= interval.end
  }

 // Get week number
 const getWeekNumber = (date: Date): number => {
    const target = new Date(date)
    const dayNr = (date.getDay() + 6) % 7
    target.setDate(target.getDate() - dayNr + 3)
    const firstThursday = target.valueOf()
    target.setMonth(0, 1)
    if (target.getDay() !== 4) {
      target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7))
    }
    return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000)
 }

 // Get current week range
 const currentWeekRange = getWeekRange(currentDate)

 // Handle week navigation

 const handleNextWeek = () => {
  const newDate = getNextWeek(currentDate)
  setCurrentDate(newDate)
  if (onWeekChange) onWeekChange(newDate)
}

 const handlePreviousWeek = () => {
    const newDate = getPreviousWeek(currentDate)
    setCurrentDate(newDate)
    if (onWeekChange) onWeekChange(newDate)
  }

  const handleSelectDate = (date: Date) => {
    const weekStart = getStartOfWeek(date)
    setIsCalendarOpen(false)
    if (onWeekChange) onWeekChange(weekStart)
  }

  const handleNextMonth = () => {
    const newMonth = new Date(calendarMonth)
    newMonth.setMonth(newMonth.getMonth() + 1)
    setCalendarMonth(newMonth)
  }

  const handlePreviousMonth = () => {
    const newMonth = new Date(calendarMonth)
    newMonth.setMonth(newMonth.getMonth() - 1)
    setCalendarMonth(newMonth)
  }

  // Calendar days
  const calendarDaysComplete = getCalendarDays(calendarMonth)

  // Current selected week range
  const selectedWeekStart = getStartOfWeek(currentDate)
  const selectedWeekEnd = getEndOfWeek(currentDate)
  const selectedWeekRange = { start: selectedWeekStart, end: selectedWeekEnd }

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const daysOfWeekShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  return (
    <div className="schedule-container">
      <div className="bg-white rounded-lg shadow-md">
        {/* Week Navigation Controls */}
        <div className="flex items-center justify-center mb-4 pt-4">
          <div className="flex items-center space-x-2">
            {/* Previous Week Button */}
            <button
              type="button"
              onClick={handlePreviousWeek}
              aria-label="Previous Week"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 w-9 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 min-w-[180px] border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                aria-label="Select Week"
                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              >
                {currentWeekRange.formatted}
                <Calendar className="h-4 w-4 ml-2 opacity-50" />
              </button>

              {isCalendarOpen && (
                <div className="absolute top-full left-0 mt-1 w-[300px] bg-white rounded-md shadow-lg z-10 border">
                  <div className="p-3">
                    {/* Month Navigation */}
                    <div className="flex items-center justify-between mb-2">
                      <button
                        type="button"
                        onClick={handlePreviousMonth}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 w-9 hover:bg-accent hover:text-accent-foreground"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <div className="font-medium">{formatDate(calendarMonth, "MMMM yyyy")}
                        <button
                          type="button"
                          onClick={handleNextMonth}
                          className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 w-9 hover:bg-accent hover:text-accent-foreground"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Calendar grid */}
                      <div className="grid grid-cols-8 gap-1 mt-2">
                        {/* Week number header */}
                        <div className="text-center text-xs text-gray-500 h-8 flex items-center justify-center">Wk</div>

                        {/* Days of week headers */}
                        {daysOfWeekShort.map((day) => (
                          <div
                            key={day}
                            className="text-center text-xs text-gray-500 h-8 flex items-center justify-center"
                          >
                            {day}
                          </div>
                        ))}

                        {/* Calendar days with week numbers*/}
                        {Array.from({ length: Math.ceil(calendarDaysComplete.length / 7) }).map((_, weekIndex) => {
                          const weekDays = calendarDaysComplete.slice(weekIndex * 7, weekIndex * 7 + 7)
                          const weekNumber = getWeekNumber(weekDays[0])

                          return (
                            <React.Fragment key={`week-${weekIndex}`}>
                              {/* Week number */}
                              <div className="text-center text-xs text-gray-500 h-8 flex items-center justify-center">
                                {weekNumber}
                              </div>

                              {/* Days */}
                              {weekDays.map((day) => {
                                const isCurrentMonth = isSameMonth(day, calendarMonth)
                                const isSelected = isWithinInterval(day, selectedWeekRange)

                                return (
                                  <button
                                    key={day.toString()}
                                    type="button"
                                    onClick={() => handleSelectDate(day)}
                                    className={`
                                      h-8 w-8 rounded-md flex items-center justify-center text-sm
                                      ${!isCurrentMonth ? "text-gray-300" : "text-gray-900"}
                                      ${isSelected ? "bg-blue-500 text-white" : ""}
                                      hover:bg-gray-100
                                    `}
                                  >
                                    {day.getDate()}
                                  </button>
                                )
                              })}
                            </React.Fragment>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Next week button */}
            <button
              type="button"
              onClick={handleNextWeek}
              aria-label="Next Week"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 w-9 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 p-4">
          {daysOfWeek.map((day, index) => (
            <div key={day} className="bg-gray-50 rounded-lg overflow-hidden">
              <div className="bg-gray-100 px-4 py-2 border-b">
                <h3 className="font-semibold text-lg text-black">{day}</h3>
              </div>
              <div className="p-4">
                {schedule.days[index]?.shifts.map((shift) => (
                  <div key={shift.id} className="mb-2 p-2 bg-white rounded border">
                    <p className="font-semibold text-black">{shift.employeeName}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(shift.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -
                      {new Date(shift.end).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
