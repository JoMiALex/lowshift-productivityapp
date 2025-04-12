

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

  // Date formatting
export function formatDate(date: Date, format: string): string {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const fullMonthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
  
    return format
      .replace("MMM", monthNames[month])
      .replace("MMMM", fullMonthNames[month])
      .replace("yyyy", year.toString())
      .replace("d", day.toString())
  }

// Week functions

// Get start of week (Monday)
export function getStartOfWeek(date: Date): Date {
    const result = new Date(date)
    const day = result.getDay()
    const diff = day === 0 ? 6 : day - 1 // Adjust for Monday start
    result.setDate(result.getDate() - diff)
    result.setHours(0, 0, 0, 0)
    return result
  }

  // Get end of week (Sunday)
export function getEndOfWeek(date: Date): Date {
    const result = new Date(date)
    const day = result.getDay()
    const diff = day === 0 ? 0 : 7 - day // Adjust for Sunday end (0 = Sunday)
    result.setDate(result.getDate() + diff)
    result.setHours(23, 59, 59, 999)
    return result
  }

export function getWeekRange(date: Date) {
    const start = getStartOfWeek(date)
    const end = getEndOfWeek(date)
    return {
        start,
        end,
        formatted: `${formatDate(start, "MMM d")} - ${formatDate(end, "MMM d, yyyy")}`,
  }
}

export function getNextWeek(currentDate: Date): Date {
    const result = new Date(currentDate)
    result.setDate(result.getDate() + 7)
    return result
}
  

export function getPreviousWeek(currentDate: Date): Date {
    const result = new Date(currentDate)
    result.setDate(result.getDate() - 7)
    return result
}

export function getWeeksInRange(startDate: Date, weeksCount: number) {
    const weeks = []
    // Add
}