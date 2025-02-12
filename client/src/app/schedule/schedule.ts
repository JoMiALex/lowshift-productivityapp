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