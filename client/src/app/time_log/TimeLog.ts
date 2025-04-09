export interface TimeLogEntry {
  id: string;
  employ_id: number; 
  start: Date;
  end: Date;
  hours: number;
  pay_code: string;
  comments?: string;
}
