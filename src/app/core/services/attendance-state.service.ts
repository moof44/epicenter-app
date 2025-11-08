import { Injectable, inject } from '@angular/core';
import { AttendanceService } from './attendance.service';
import { Attendance } from '../models/attendance.model';

@Injectable({
  providedIn: 'root'
})
export class AttendanceStateService {
  private attendanceService = inject(AttendanceService);

  public attendance = this.attendanceService.getAttendance();

  addAttendance(attendance: Attendance) {
    this.attendance.update(attendances => [...attendances, attendance]);
  }
}
