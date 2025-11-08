import { Injectable, signal } from '@angular/core';
import { Attendance } from '../models/attendance.model';
import { ATTENDANCE_MOCK } from '../models/attendance.mock';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private attendance = signal<Attendance[]>(ATTENDANCE_MOCK);

  getAttendance() {
    return this.attendance;
  }
}
