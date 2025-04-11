//import { addWeeks, subWeeks, startOfWeek, endOfWeek, format } from "date-fns"

// Type definitions
export interface Shift {
    id: string
    employeeName: string
    start: Date
    end: Date
}

export interface ScheduleDay {
    date: Date
    shifts: Shift[]
}

export interface WeekSchedule {
    startDate: Date
    days: ScheduleDay[]
}

// Week functions
export function getWeekRange(date: Date) {
    const start = startOfWeek(date, { weekStartsOn: 1 }) // Week starts on Monday
    const end = endOfWeek(date, { weekStartsOn: 1 })
    return {
        start,
        end,
        formatted: `${format(start, "MMM d")} - ${format(end, "MMM d, yyyy")}`,
    }
}

export function getNextWeek(currentDate: Date): Date {
    return addWeeks(currentDate, 1)
}

export function getPreviousWeek(currentDate: Date): Date {
    return subWeeks(currentDate, 1)
}

export function getWeeksInRange(startDate: Date, weeksCount: number) {
    const weeks = []

    // Past weeks
    for (let i = weeksCount; i > 0; i--) {
        const weekDate = subWeeks(startDate, i)
        weeks.push({
            date: weekDate,
            label: getWeekRange(weekDate).formatted,
        })
    }

    // Current week
    weeks.push({
        date: startDate,
        label: getWeekRange(startDate).formatted,
    })

    // Future weeks
    for (let i = 1; i <= weeksCount; i++) {
        const weekDate = addWeeks(startDate, i)
        weeks.push ({
            date: weekDate,
            label: getWeekRange(weekDate).formatted,
        })
    }
}