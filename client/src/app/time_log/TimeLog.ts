export interface TimeLogEntry {
  id: string;
  employee_id: string; 
  start: Date;
  end: Date;
  hours: number;
  pay_code: string;
  comments?: string;
}
