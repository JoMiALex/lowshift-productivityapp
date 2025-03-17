export interface TimeLogEntry {
  id?: string;
  start: Date;
  end: Date;
  hours: number;
  pay_code: string;
  comments?: string;
}
